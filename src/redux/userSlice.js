import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      // { return initialState}
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state, action) => {
      if ((state.currentUser.subscribedUsers || state.currentUser.user?.subscribedUsers).includes(action.payload)) {
        (state.currentUser.subscribedUsers || state.currentUser.user?.subscribedUsers).splice(
          (state.currentUser.subscribedUsers || state.currentUser.user?.subscribedUsers).findIndex((channelId) => channelId === action.payload), 
          1
        );
      } else {
        (state.currentUser.subscribedUsers || state.currentUser.user?.subscribedUsers).push(action.payload);
      }
    }
  },
});

export const { loginFailure, loginStart, loginSuccess, logout, subscription } =
  userSlice.actions;

export default userSlice.reducer;
