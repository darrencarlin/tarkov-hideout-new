import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

var initialVersion = {};

if (localStorage.getItem("version")) {
  initialVersion = JSON.parse(localStorage.getItem("version"));
}

const sortArr = (arr) =>
  arr.sort((a, b) => {
    let itemA = a.item.toLowerCase();
    let itemB = b.item.toLowerCase();
    return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
  });

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    version: initialVersion,
  },
  reducers: {
    setVersion: (state, { payload }) => {
      state.version = payload;
    },

    updateVersion: (
      state,
      { payload: { category, index, item, updatedItem, updatedAmount } }
    ) => {
      // version.hideout[category][index].total = updatedAmount;
      // version.hideout[category][index].remaining = updatedAmount;
      // version.hideout[category][index].item = updatedItem;
    },

    // Modules

    updateModule: (
      state,
      { payload: { category, moduleIndex, itemIndex, total } }
    ) => {
      state.version.modules[moduleIndex][category][itemIndex].need = total;
    },

    addNewModuleRequirement: (
      state,
      { payload: { category, moduleIndex, item } }
    ) => {
      state.version.modules[moduleIndex][category].push({
        item: item,
      });

      sortArr(state.version.modules[moduleIndex][category]);

      // state.version.modules[moduleIndex][category].sort((a, b) => {
      //   let itemA = a.item.toLowerCase();
      //   let itemB = b.item.toLowerCase();
      //   return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
      // });
    },

    removeModuleRequirement: (
      state,
      { payload: { category, moduleIndex, itemIndex } }
    ) => {
      state.version.modules[moduleIndex][category].splice(itemIndex, 1);
    },

    addNewModuleItem: (
      state,
      { payload: { category, moduleIndex, item, total } }
    ) => {
      state.version.modules[moduleIndex][category].push({
        category: "",
        complete: false,
        have: 0,
        item: item,
        need: total,
      });
      sortArr(state.version.modules[moduleIndex][category]);
      // state.version.modules[moduleIndex][category].sort((a, b) => {
      //   let itemA = a.item.toLowerCase();
      //   let itemB = b.item.toLowerCase();
      //   return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
      // });
    },

    removeModuleItem: (
      state,
      { payload: { category, moduleIndex, itemIndex } }
    ) => {
      state.version.modules[moduleIndex][category].splice(itemIndex, 1);
    },

    // Items

    updateItem: (state, { payload: { category, index, total } }) => {
      state.version[category][index].remaining = total;
      state.version[category][index].total = total;
    },

    addNewItem: (state, { payload: { category, item, total } }) => {
      // push the item into the category array and sort alphabetically
      state.version[category].push({
        item: item,
        priority: false,
        remaining: total,
        total: total,
      });

      sortArr(state.version[category]);

      // state.version[category].sort((a, b) => {
      //   let itemA = a.item.toLowerCase();
      //   let itemB = b.item.toLowerCase();
      //   return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
      // });
    },

    removeItem: (state, { payload: { category, index } }) => {
      state.version[category].splice(index, 1);
    },
  },
});

export const {
  setVersion,
  updateVersion,
  addNewItem,
  addNewModuleItem,
  removeModuleItem,
  removeItem,
  updateItem,
  updateModule,
  addNewModuleRequirement,
  removeModuleRequirement,
} = dashboardSlice.actions;

export const versionSelector = (state) => state.dashboard;

export const getInitalVersion = () => async (dispatch, getState) => {
  const res = await axios.get(
    "https://us-central1-tarkov-hideout-d2603.cloudfunctions.net/api/version"
  );
  localStorage.setItem("version", JSON.stringify(res.data.data));
  dispatch(setVersion(res.data.data));
};

export const updateHideoutVersion = () => async (dispatch, getState) => {
  const {
    hideout: { version },
  } = getState();
  console.log(version);
};

export default dashboardSlice.reducer;
