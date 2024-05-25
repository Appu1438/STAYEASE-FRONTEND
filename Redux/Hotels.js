// detailsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const HotelSlice = createSlice({
    name: 'hotel',
    initialState: {
        AllHotelsData: {
            hotels: [], // array to hold hotels
        }
    },
    reducers: {
        setAllHotels: (state, action) => {
            state.AllHotelsData.hotels = action.payload;
        },
    },
});

export const { setAllHotels } = HotelSlice.actions;
export default HotelSlice.reducer;
