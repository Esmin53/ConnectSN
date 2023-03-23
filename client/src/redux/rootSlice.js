import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'light',
    user: null,
    token: null
};

export const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        login: (state, action) => {
            const {data, token} = action.payload;
            state.token = token;
            state.user = data;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            console.log(state.user);
        },
        updateFriends: (state, action) => {
            state.user.friends = action.payload;
        },
        updateRequsets: (state, action) => {
            console.log(action.payload)
            state.user.recievedRequests = action.payload;
            console.log(state.user.recievedRequests)
        },
        updateSentRequests: (state, action) => {
            state.user.sentRequests = action.payload;
        },
        updateBackground: (state, action) => {
            state.user.backgroundImage = action.payload
        },
        updateProfilePicture: (state, action) => {
            state.user.profilePicture = action.payload
        }
    }
});

export const { login, logout, updateFriends, updateRequsets, updateSentRequests, 
    updateBackground, updateProfilePicture }  = rootSlice.actions;

export default rootSlice.reducer;