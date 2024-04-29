import { Task } from "@/types/task";
import { List } from "@/types/list";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "@/hooks/redux";
import {toast}from "react-hot-toast";
import { Action } from "@/types/store";
import { addTodoAsync, clearTodosInListAsync, deleteTodoAsync, getTodosAsync, toggleCompletedAsync, updateTodoAsync } from "./thunk";

// Assync logic can be found in thunk.ts

interface TodoState {
    data: Task[],
    loading: boolean,
    action: Action,
    currentList: List | null
}

const initialState = {
    data: [],
    loading: false,
    action: null,
    currentList: null,
} satisfies TodoState as TodoState;


export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setTodoLoading: (state, action: PayloadAction<{loading: boolean, action: Action}>) => {
            state.loading = action.payload.loading
            state.action = action.payload.action
        },
        toggleComplete: (state, action) => {
            const index = state.data.findIndex((todo) => todo.id === action.payload.id)
            const todo = state.data[index]
            state.data[index] = {...todo, completed: action.payload.completed}
        },
        setFilter: (state, action: PayloadAction<List>) => {
            state.currentList = action.payload
        },
        removeFilter: (state) => {
            state.currentList = null
        },
    },
    extraReducers: (builder) => {
        
        builder
        .addCase(getTodosAsync.fulfilled, (state, action ) => {
            state.data = action.payload.todos
        })
        
        .addCase(addTodoAsync.fulfilled, (state, action) => {
            toast.success("Task added");
            state.data.push(action.payload);
        })
        .addCase(addTodoAsync.rejected, () => {
            toast.error("There was an unknown error while processing the request");
        })

        .addCase(updateTodoAsync.fulfilled, (state, action) => {
            toast.success("Task updated");
            const index = state.data.findIndex((todo) => todo.id === action.payload.id)
            const todo = state.data[index]
            state.data[index] = { ...todo, title: action.payload.title, list: action.payload.listId }
        })
        
        .addCase(updateTodoAsync.rejected, (state) => {
            toast.error("Something went wrong");
            state.loading = false
            state.action = null
        })
        
        .addCase(toggleCompletedAsync.fulfilled, (state, action) => {
            if (action.payload?.id) {
                const index = state.data.findIndex((todo) => todo.id === action.payload.id)
                const todo = state.data[index]
                state.data[index] = {...todo, completed: action.payload.completed}
            }
        })
        
        .addCase(deleteTodoAsync.fulfilled, (state, action) => {
            toast.success("Task deleted");
            state.data = state.data.filter(todo => todo.id !== action.payload.id)
        })
        
        .addCase(clearTodosInListAsync.pending, () => {
            toast.loading("clearing list");
        })
        .addCase(clearTodosInListAsync.fulfilled, (state, action) => {
            const {listId} = action.payload
            state.data = state.data.filter(todo => todo.list !== listId);
            toast.remove();
            toast.success("List cleared");
        })
        .addCase(clearTodosInListAsync.rejected, () => {
            toast.remove();
            toast.error("Unable to clear list");
        })
        
        .addMatcher((action) =>
          (action.type.includes("/fulfilled") || action.type.includes("/rejected")) && action.type.includes("todos"),
        (state) => {
          state.loading = false;
          state.action = null;
        })
        .addMatcher((action) =>
          action.type.includes("/fulfilled") && action.type.includes("logout"),
        (state) => {
            state.data = [];
          state.loading = false;
          state.action = null;
        },
      );
    }
})

// selectors
export const getTodos = () => {
    const list = useAppSelector(state => state.todos.currentList);
    const todos = useAppSelector(state => state.todos.data);
    if (list) {
        return todos.filter(todo => todo.list === list.id)
    }

    return todos;
}

export const {toggleComplete, setFilter, removeFilter, setTodoLoading} = todoSlice.actions;

export default todoSlice.reducer;