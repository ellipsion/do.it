import { Emoji } from "@/types/emoji";
import { List } from "@/types/list";
import { Task } from "@/types/task";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TaskItem = {
    item: Task | null,
    emoji: Emoji | null,
    isEditMode: boolean,
    open: boolean
}

type ListItem = {
    item: List | null,
    open: boolean
}

type InitialState = {
    task: TaskItem,
    list: ListItem
}

const initialState: InitialState = {
    task: {item: null, open: false, emoji: null, isEditMode: false},
    list: {item: null, open: false}
}

export const editSlice = createSlice({
    name: "edit",
    initialState,
    reducers: {
        editTask: (state, action: PayloadAction<TaskItem>) => {
            state.task = action.payload;
        },
        clearTask: (state) => {
            state.task = initialState.task;
        },
        setTaskModal: (state, action) => {
            state.task = { item: null, emoji: null, isEditMode: false, open: action.payload.open}
        },
        editList: (state, action: PayloadAction<ListItem>) => {
            state.list = action.payload
        },
        setListModal: (state, action) => {
            state.list = { item: null, open: action.payload.open}
        }
    }
});

export const {editTask, clearTask, setTaskModal, editList, setListModal} = editSlice.actions;

export default editSlice.reducer;