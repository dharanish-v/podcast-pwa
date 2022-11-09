import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { episode } from "../../types";

interface playerState {

    episodes: Array<episode>,
    currentIndex: number;
    currentPlay: episode,
}

export const playerSlice = createSlice({
    name: "player",
    initialState: {} as playerState,
    reducers:{
        addEpisodes:(state, action:PayloadAction<{episodes: Array<episode>}>) =>{
            state.episodes = action.payload.episodes
        },
        play: (state, action: PayloadAction<{index:number}>)=>{
            state.currentIndex = action.payload.index;
            state.currentPlay = state.episodes[action.payload.index];
        }
    }

})

export const {play, addEpisodes} = playerSlice.actions;

export default playerSlice.reducer;