import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import listReducer from "./list/slice";
import todoReducer from "./todo/slice";
import editReducer from "./edit/slice";


const store = configureStore({
    reducer: {
        edit: editReducer,
        todos: todoReducer,
        lists: listReducer,
        auth: authReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;