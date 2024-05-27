// detailsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const BookingSlice = createSlice({
    name: 'booking',
    initialState: {
        Bookings: {
            AllBookings: [], // array to hold hotels
        }
    },
    reducers: {
        setAllBookings: (state, action) => {
            state.Bookings.AllBookings = action.payload;
        },
    },
});

export const { setAllBookings } = BookingSlice.actions;
export default BookingSlice.reducer;
