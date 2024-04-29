import { listsCollection, tasksCollection, db } from "@/firebase/db.config";
import { addDoc, deleteDoc, doc,  getDocs, query, Timestamp, updateDoc, where, writeBatch } from "firebase/firestore";
import { auth } from "@/firebase/auth.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "@/types/task";

export const getTodosAsync = createAsyncThunk("todos/getTodosAsync", async () => {
    const uid = auth.currentUser?.uid;
    const q = query(tasksCollection, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const todos: Task[] = querySnapshot.docs.map((doc) => {
        const {createdAt, list, ...data} = doc.data();
        const todo = {id: doc.id, title: data.title, completed: data.completed}
        if (list) {
            return {list: list.id, ...todo}
        }
        return todo
    })
    return { todos };

});



export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async (payload: {title: string, listId?: string}) => {
const uid = auth.currentUser?.uid;
const todo: any = {
    title: payload.title,
    completed: false,
    createdAt: Timestamp.now(),
    uid
  }
if (payload.listId) {
    const listRef = doc(listsCollection, payload.listId)
    todo.list = listRef
    const newDoc = await addDoc(tasksCollection, todo);

    return {id: newDoc.id, title: payload.title, completed: false, list: listRef.id}
} else {
    const tasksRef = await addDoc(tasksCollection, todo);
    
    return {id: tasksRef.id, title: payload.title, completed: false}
}

});

export const updateTodoAsync = createAsyncThunk("todos/updateTodoAsync", async (payload: {id: string, title: string, listId: string}) => {
const {id, title, listId} = payload;
const taskRef = doc(tasksCollection, id)
const data: any = {title}
if (listId) {
    const listRef = doc(listsCollection, listId) 
    data.list = listRef
}
console.log(listId)
await updateDoc(taskRef, data);
return {id, title, listId}
});

export const toggleCompletedAsync = createAsyncThunk("todos/toggleCompleted", async (payload: {id: string, completed: boolean}) => {
const taskRef = doc(tasksCollection, payload.id);

await updateDoc(taskRef, {
    completed: payload.completed
});
return {id: payload.id, completed: payload.completed}

});

export const deleteTodoAsync = createAsyncThunk("todos/deleteTodosAsync", async (payload: {id: string}) => {
const taskRef = doc(tasksCollection, payload.id);
await deleteDoc(taskRef);
return payload;
});

export const clearTodosInListAsync = createAsyncThunk("todos/clearListAsync", async (payload: {listId: string}) => {
const {listId} = payload;
const listRef = doc(listsCollection, listId);
const q = query(tasksCollection, where("list", "==", listRef))
const batch = writeBatch(db);
const objectsToDelete = await getDocs(q);
objectsToDelete.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();

return {listId}
});
