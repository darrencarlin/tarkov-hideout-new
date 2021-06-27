import { createSlice } from "@reduxjs/toolkit";

var initialHideout = {};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    version: initialHideout,
  },
  reducers: {
    updateVersion: (
      state,
      { payload: { category, index, item, updatedItem, updatedAmount } }
    ) => {
      console.log(payload);
      // version.hideout[category][index].total = updatedAmount;
      // version.hideout[category][index].remaining = updatedAmount;
      // version.hideout[category][index].item = updatedItem;
    },

    addNewItem: (state, { payload: { newItem, category } }) => {
      state.version[category].push(newItem);
    },
    addNewModule: (state, { payload }) => {},
    removeItem: (state, { payload }) => {
      console.log(payload);
    },
  },
});

export const { updateVersion, addNewItem, addNewModule, removeItem } =
  dashboardSlice.actions;

export const versionSelector = (state) => state.version;

export const updateHideoutVersion = () => async (dispatch, getState) => {
  const {
    hideout: { version },
  } = getState();
  console.log(version);
};

export default dashboardSlice.reducer;
