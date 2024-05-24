import { configureStore } from "@reduxjs/toolkit";
import roomReducer from './Rooms'
import guestReducer from './Guests'
import userReducer from './User'

export const store = configureStore({
    reducer: {
        room: roomReducer,
        guest: guestReducer,
        user : userReducer
    }
})