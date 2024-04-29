import { auth } from "@/firebase/auth.config";
import { listsCollection, tasksCollection, db } from "@/firebase/db.config";
import { Emoji } from "@/types/emoji";
import { List } from "@/types/list";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, deleteDoc, doc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import slugify from "slugify";


export const getListsAsync = createAsyncThunk("lists/getListsAsync", async () => {
    const uid = auth.currentUser?.uid;
    const q = query(listsCollection, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const lists: List[] = querySnapshot.docs.map((doc) => ({
        emoji: doc.data().emoji,
    name: doc.data().name,
    slug: doc.data().slug,
    id: doc.id,
    uid
    }));
    return { lists };
});

export const addListAsync = createAsyncThunk("lists/addListAsync", async (payload: {name: string, emoji: Emoji}) => {
    const uid = auth.currentUser?.uid
    const {name, emoji} = payload;
    const slug = slugify(name, {lower: true})
    const listRef = await addDoc(listsCollection, {
        ...payload,
        slug,
        uid
    });
    return { id: listRef.id, name, emoji, slug, uid};
});

export const updateListAsync = createAsyncThunk("lists/updateListAsync", async (payload: {id: string, name: string, emoji: Emoji}) => {
    const {name, emoji, id} = payload;
    const slug = slugify(name, {lower: true});
    const listRef = doc(listsCollection, id)
    await updateDoc(listRef, {
        name, emoji, slug
    });
    return { id: listRef.id, name, emoji, slug};
});

export const deleteListAsync = createAsyncThunk("lists/deleteListAsync", async (payload: {id : string}) => {
    const {id} = payload
    const listRef = doc(listsCollection, id)
    const q = query(tasksCollection, where("list", "==", listRef))
    const batch = writeBatch(db);
    const objectsToDelete = await getDocs(q);
    objectsToDelete.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    await deleteDoc(listRef);
    return { id }
});