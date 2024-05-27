import { configureStore } from "@reduxjs/toolkit";
import roomReducer from './Rooms'
import guestReducer from './Guests'
import userReducer from './User'
import HotelReducer from './Hotels'
import BookingReducer from './Bookings'
import ChatReducer from './Chat'
export const store = configureStore({
    reducer: {
        room: roomReducer,
        guest: guestReducer,
        user: userReducer,
        hotel: HotelReducer,
        booking: BookingReducer,
        chat: ChatReducer
    }
})