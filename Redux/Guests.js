import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE={
    guestCount:1
}

const guestSlice=createSlice({
    name :'guest',
    initialState:INITIAL_STATE,
    reducers:{
        incrementGuest:(state)=>{
            state.guestCount+=1
        },
        decrementGuest:(state)=>{
            state.guestCount-=1
        }
    }
})

export const {incrementGuest,decrementGuest}=guestSlice.actions

export  default guestSlice.reducer