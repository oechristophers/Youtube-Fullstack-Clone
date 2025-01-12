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
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state, action) => {
      const subscribedUsers =
        state.currentUser.subscribedUsers ||
        state.currentUser.user?.subscribedUsers;

      if (subscribedUsers.includes(action.payload)) {
        const index = subscribedUsers.findIndex(
          (channelId) => channelId === action.payload
        );
        subscribedUsers.splice(index, 1);
      } else {
        subscribedUsers.push(action.payload);
      }
    },
    updateUser: (state, action) => {
      if (state.currentUser) {
        // Merge updated fields with the existing user object
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
  },
});

export const {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  subscription,
  updateUser,
} = userSlice.actions;

export default userSlice.reducer;
