import { configureStore } from "@reduxjs/toolkit";
import { type } from "@testing-library/user-event/dist/type";
import { useDispatch } from "react-redux";
import blogReducer from'./componentredux/reducer'
export const store=configureStore({
    reducer:{
        blog:blogReducer
    }
})

export type RootState= ReturnType<typeof store.getState>
export type AppDispacth=typeof store.dispatch
export const useAppDisPacth=()=>useDispatch<AppDispacth>()