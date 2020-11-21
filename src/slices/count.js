import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

var initialCount = 0;

if (localStorage.getItem("count")) {
  initialCount = JSON.parse(localStorage.getItem("count"));
}

export const countSlice = createSlice({
  name: "count",
  initialState: {
    count: initialCount,
  },
  reducers: {
    setCount: (state, { payload }) => {
      state.count = payload;
    },
  },
});

export const { setCount } = countSlice.actions;

export const selectCount = (state) => state.count;

export const getCount = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://us-central1-tarkov-hideout-d2603.cloudfunctions.net/api/count"
    );
    dispatch(setCount(res.data.count));
    localStorage.setItem("count", JSON.stringify(res.data.count));
  } catch (err) {}

  if (!localStorage.getItem("count"))
    try {
      const res = await axios.get(
        "https://us-central1-tarkov-hideout-d2603.cloudfunctions.net/api/count"
      );
      dispatch(setCount(res.data.count));
      localStorage.setItem("count", JSON.stringify(res.data.count));
    } catch (err) {
      console.error(err.errorMessage);
    }
};

export default countSlice.reducer;
