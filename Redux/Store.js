import { configureStore } from "@reduxjs/toolkit";
import roomReducer from './Rooms'
import guestReducer from './Guests'
import userReducer from './User'
import HotelReducer from './Hotels'
export const store = configureStore({
    reducer: {
        room: roomReducer,
        guest: guestReducer,
        user : userReducer,
        hotel: HotelReducer,
    }
})