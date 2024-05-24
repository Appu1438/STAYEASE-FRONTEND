// detailsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const HotelSlice = createSlice({
    name: 'user',
    initialState: {
        AllHotelsData:{} // initial state for fetched details
    },
    reducers: {
        setAllHotels: (state, action) => {
            state.AllHotelsData = action.payload;
        },
       
    },
});

export const { setAllHotels } = HotelSlice.actions;
export default HotelSlice.reducer;
