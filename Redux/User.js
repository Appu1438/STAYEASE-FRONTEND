// detailsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        userData: {}, // initial state for fetched details
    },
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload;
        },
    },
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;
