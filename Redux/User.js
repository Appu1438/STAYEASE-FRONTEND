// detailsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        userData: {},
        AllUsersData:{} // initial state for fetched details
    },
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload;
        },
        setAllUsers: (state, action) => {
            state.AllUsersData = action.payload;
        },
    },
});

export const { setUser ,setAllUsers} = UserSlice.actions;
export default UserSlice.reducer;
