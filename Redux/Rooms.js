import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    roomCount: 1
}
const roomSlice = createSlice({
    name: 'room',
    initialState: INITIAL_STATE,
    reducers: {
        incrementRooms: (state) => {
            state.roomCount += 1
        },
        decrementRooms: (state) => {
            state.roomCount -= 1

        },
    }
})

export const { incrementRooms, decrementRooms } = roomSlice.actions

export default roomSlice.reducer