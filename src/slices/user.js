import { createSlice } from "@reduxjs/toolkit";

var initialUser = null;

if (localStorage.getItem("user")) {
  initialUser = JSON.parse(localStorage.getItem("user"));
}

export const userSlice = createSlice({
  name: "user",
  initialState: { user: initialUser },
  reducers: {
    setErrors: (state, { payload }) => {
      state.errors = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    updateUser: (state, { payload }) => {},
  },
});

export const { setUser, setErrors } = userSlice.actions;

export const selectUser = (state) => state.user;

export const getUser = () => async (dispatch) => {
  if (localStorage.getItem("user")) {
    const data = JSON.parse(localStorage.getItem("user"));
    dispatch(setUser(data));
  }
};

export default userSlice.reducer;
