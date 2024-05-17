import { configureStore } from "@reduxjs/toolkit";
import roomReducer from './Rooms'
import guestReducer from './Guests'
export const store = configureStore({
    reducer: {
        room: roomReducer,
        guest:guestReducer
    }
})