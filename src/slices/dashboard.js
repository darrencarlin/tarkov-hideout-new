import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

var initialVersion = {};

if (localStorage.getItem("version")) {
  console.log("Theres a cached version");
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
      localStorage.setItem("version", JSON.stringify(state.version));
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
      localStorage.setItem("version", JSON.stringify(state.version));
    },

    removeModuleRequirement: (
      state,
      { payload: { category, moduleIndex, itemIndex } }
    ) => {
      state.version.modules[moduleIndex][category].splice(itemIndex, 1);
      localStorage.setItem("version", JSON.stringify(state.version));
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
      localStorage.setItem("version", JSON.stringify(state.version));
    },

    removeModuleItem: (
      state,
      { payload: { category, moduleIndex, itemIndex } }
    ) => {
      state.version.modules[moduleIndex][category].splice(itemIndex, 1);
      localStorage.setItem("version", JSON.stringify(state.version));
    },

    setComplete: (state, { payload: { moduleIndex } }) => {
      state.version.modules[moduleIndex].complete =
        !state.version.modules[moduleIndex].complete;
      localStorage.setItem("version", JSON.stringify(state.version));
    },

    // Items

    updateItem: (state, { payload: { category, index, remaining, total } }) => {
      state.version[category][index].remaining = remaining;
      state.version[category][index].total = total;
      localStorage.setItem("version", JSON.stringify(state.version));
    },

    addNewItem: (state, { payload: { category, item, remaining, total } }) => {
      // push the item into the category array and sort alphabetically
      state.version[category].push({
        item: item,
        priority: false,
        remaining: remaining,
        total: total,
      });

      sortArr(state.version[category]);

      // state.version[category].sort((a, b) => {
      //   let itemA = a.item.toLowerCase();
      //   let itemB = b.item.toLowerCase();
      //   return itemA < itemB ? -1 : itemA > itemB ? 1 : 0;
      // });
      localStorage.setItem("version", JSON.stringify(state.version));
    },

    removeItem: (state, { payload: { category, index } }) => {
      state.version[category].splice(index, 1);
      localStorage.setItem("version", JSON.stringify(state.version));
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
  setComplete,
} = dashboardSlice.actions;

export const versionSelector = (state) => state.dashboard;

export const getInitalVersion = () => async (dispatch, getState) => {
  if (localStorage.getItem("version")) {
    console.log("Theres a cached version");
    dispatch(setVersion(JSON.parse(localStorage.getItem("version"))));
    return;
  }
  const res = await axios.get(
    "https://us-central1-tarkov-hideout-d2603.cloudfunctions.net/api/version"
  );
  localStorage.setItem("version", JSON.stringify(res.data.data));
  dispatch(setVersion(res.data.data));
};

export const changeVersion = (version) => async (dispatch, getState) => {
  const res = await axios.get(
    `https://us-central1-tarkov-hideout-d2603.cloudfunctions.net/api/version/${version}`
  );

  localStorage.removeItem("version");
  localStorage.setItem("version", JSON.stringify(res.data.version));
  dispatch(setVersion(res.data.version));
};

export const updateHideoutVersion = (version) => async (dispatch, getState) => {
  let newVersion;
  switch (version) {
    case "Standard Edition":
      newVersion = "se";
      break;
    case "Left Behind Edition":
      newVersion = "lb";
      break;
    case "Prepare for Escape Edition":
      newVersion = "pe";
      break;
    case "Edge of Darkness Edition":
      newVersion = "eod";
      break;
  }
  const localStorageUser = localStorage.getItem("user");
  const localUser = JSON.parse(localStorageUser);
  const body = {
    userId: localUser.userId,
    version: JSON.parse(localStorage.getItem("version")),
  };
  const options = {
    headers: { Authorization: `Bearer ${localUser.token}` },
  };

  const res = await axios.post(
    `https://us-central1-tarkov-hideout-d2603.cloudfunctions.net/api/version/${newVersion}`,
    body,
    options
  );

  console.log(res);
};

export default dashboardSlice.reducer;
