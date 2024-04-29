import { useAppSelector } from "@/hooks/redux";
import { List } from "@/types/list";
import { Action } from "@/types/store";
import {  createSlice, PayloadAction } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import { addListAsync, deleteListAsync, getListsAsync, updateListAsync } from "./thunk";



interface ListState {
    data: List[],
    loading: boolean,
    action: Action,
}

const initialState = {
    data: [],
    loading: false,
    action: null
} satisfies ListState as ListState

export const listSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {
        setListLoading: (state, action: PayloadAction<{loading: boolean, action: Action}>) => {
            state.loading = action.payload.loading
            state.action = action.payload.action
        },
        addList: (state, action: PayloadAction<List>) => {  
            state.data.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getListsAsync.fulfilled, (state, action) => {
            state.data = action.payload.lists;
        })
        .addCase(addListAsync.fulfilled, (state, action) => {
            state.data.push(action.payload);
            toast.success("List created");
        })
        .addCase(updateListAsync.fulfilled, (state, action) => {
            const {id, ...rest} = action.payload;
            const idx = state.data.findIndex(list => list.id === id)
            const list = state.data[idx];
            state.data[idx] = {...list, ...rest}
            toast.success("List updated");
        })
        .addCase(deleteListAsync.fulfilled, (state, action) => {
            toast.success("List deleted");
            state.data = state.data.filter(list => list.id !== action.payload.id);
        })
        .addCase(deleteListAsync.rejected, () => {
            toast.error("Something went wrong!");
        })
        .addMatcher((action) =>
            (action.type.includes("/fulfilled") || action.type.includes("/rejected")) && action.type.includes("lists"),
          (state) => {
            state.loading = false;
            state.action = null;
          },)
          .addMatcher((action) =>
            action.type.includes("/fulfilled") && action.type.includes("logout"),
          (state) => {
            state.data = [];
            state.loading = false;
            state.action = null;
          },)
    }
});

// selectors
export const getListById = (id: string) => {
    const lists = useAppSelector(state => state.lists.data);
    return lists.find(list => list.id === id)
}
export const getListBySlug = (slug: string | undefined) => {
    if (slug) {
        const lists = useAppSelector(state => state.lists.data);
        return lists.find(list => list.slug === slug)
    }
}

export const getTaskCount = (listId: string | undefined) => {
    const todos = useAppSelector(state => state.todos.data)
    let filteredTodos = todos
    if (listId) {
        filteredTodos = todos.filter(todo => todo.list === listId)
    }
    return filteredTodos.length;
}

export const {setListLoading} = listSlice.actions;

export default listSlice.reducer;