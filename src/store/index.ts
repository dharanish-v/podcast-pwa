import {configureStore} from "@reduxjs/toolkit";
import playerReducer from "./slices/playerSlice";
import podcastSlice from "./slices/podcastSlice";

export const store = configureStore({
        reducer:{
            player:playerReducer,
            podcast:podcastSlice
        }
})

export type RootState = ReturnType<typeof store.getState>