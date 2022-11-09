import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { podcast } from "../../types";

const INITIAL_STATE : Array<podcast> = [];

export const podcastSlice = createSlice({
    name:"podcast",
    initialState:INITIAL_STATE,
    reducers:{
        addManyPodcast : (state, action: PayloadAction<Array<podcast>> )=>{
            state.push(...action.payload)
        },
        addPodcast: (state, action: PayloadAction<podcast>)=>{
            state.push(action.payload)
            
        }
    }
})

export default podcastSlice.reducer;

export const {addPodcast, addManyPodcast} = podcastSlice.actions;