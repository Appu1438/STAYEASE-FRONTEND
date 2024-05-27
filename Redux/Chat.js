// src/redux/slices/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chatHistory: [],
        waitingForId: false,
    },
    reducers: {
        addMessage: (state, action) => {
            state.chatHistory.push(action.payload);
        },
        clearChat: (state) => {
            state.chatHistory = [];
        },
        setWaitingTrue: (state) => {
            state.waitingForId = true
        },
        setWaitingFalse: (state) => {
            state.waitingForId = false
        }
    }
});

export const { addMessage, clearChat,setWaitingFalse,setWaitingTrue } = chatSlice.actions;
export default chatSlice.reducer;
