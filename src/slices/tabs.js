import { createSlice } from "@reduxjs/toolkit";

export const tabsSlice = createSlice({
  name: "tabs",
  initialState: { tabs: ["all", "all"] },
  reducers: {
    updateTabs: (state, { payload: { click, tab } }) => {
      state.tabs[tab] = click;
    },
  },
});

export const { updateTabs } = tabsSlice.actions;

export const tabsSelector = (state) => state.tabs;

export default tabsSlice.reducer;
