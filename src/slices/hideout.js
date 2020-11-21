import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

var initialHideout = {};

if (localStorage.getItem("hideout")) {
  initialHideout = JSON.parse(localStorage.getItem("hideout"));
}

export const hideoutSlice = createSlice({
  name: "hideout",
  initialState: {
    hideout: initialHideout,
    prevHideout: initialHideout,
  },
  reducers: {
    setPercentage: (state) => {
      const modules = state.hideout.modules;
      const total = state.hideout.modules.length;
      let count = 0;

      modules.forEach((module) => {
        if (module.complete) {
          count++;
        }
      });

      state.hideout.percentage = parseInt(((count / total) * 100).toFixed());
    },
    getCurrentHideout: (state) => state.hideout,

    setPrevHideout: (state, { payload }) => {
      state.prevHideout = payload;
    },

    setHideout: (state, { payload }) => {
      state.hideout = payload;
    },

    updateHideout: (
      state,
      { payload: { moduleIndex, item, checked, index, level, module } }
    ) => {
      // updating the module item to complete based on checked value
      state.hideout.modules[moduleIndex].item_requirments[
        index
      ].complete = checked;
      // updating the individual item remaining number based on checked value
      state.hideout[item.category].forEach((i) => {
        if (i.item === item.item) {
          checked ? (i.remaining -= item.need) : (i.remaining += item.need);
        }
      });

      // check if all item requirments are complete
      let count = 0;
      let amount = 0;

      state.hideout.modules.forEach((m) => {
        if (m.module === module && m.level === level) {
          amount = m.item_requirments.length;
          m.item_requirments.forEach((i) => {
            if (i.complete) {
              count++;
            }
          });
        }
      });

      let complete = count === amount;

      if (complete) {
        state.hideout.modules.forEach((m) => {
          if (m.module === module && m.level === level) {
            m.complete = true;
          }
        });
      } else {
        state.hideout.modules.forEach((m) => {
          if (m.module === module && m.level === level) {
            m.complete = false;
          }
        });
      }
    },
    updatePriority: (state, { payload: { string, index, item, checked } }) => {
      // upating the individual item priority based on the checked value
      state.hideout[string][index] = {
        ...item,
        priority: checked,
      };
    },
  },
});

export const {
  setPrevHideout,
  setHideout,
  setErrors,
  updateHideout,
  updatePriority,
  getCurrentHideout,
  setPercentage,
} = hideoutSlice.actions;

export const hideoutSelector = (state) => state.hideout;

export const getInitialHideout = () => async (dispatch, getState) => {
  const localStorageUser = localStorage.getItem("user");
  const localStorageHideout = localStorage.getItem("hideout");

  // if there is a currently logged in user (in local storage)
  if (localStorageUser !== null) {
    const localUser = JSON.parse(localStorageUser);
    const options = {
      headers: { Authorization: `Bearer ${localUser.token}` },
    };
    const res = await axios.get(
      `https://us-central1-tarkov-hideout-d2603.cloudfunctions.net/api/hideout/${localUser.userId}`,
      options
    );
    localStorage.setItem("hideout", JSON.stringify(res.data));
  }
  // if there is a currently a hideout (in local storage)
  if (localStorageHideout === null) {
    const res = await axios.get(
      "https://us-central1-tarkov-hideout-d2603.cloudfunctions.net/api/hideout"
    );
    localStorage.setItem("hideout", JSON.stringify(res.data.hideout));
    dispatch(setHideout(res.data.hideout));
  }
};

export const getUserHideout = (userId) => async (dispatch) => {
  const res = await axios.get(
    `https://us-central1-tarkov-hideout-d2603.cloudfunctions.net/api/hideout/${userId}`
  );
  localStorage.setItem("hideout", JSON.stringify(res.data.hideout));
  dispatch(setHideout(res.data.hideout));
};

export const setStorgage = ({ authenticated }) => async (
  dispatch,
  getState
) => {
  const isRoot = location.pathname == "/";
  const { hideout, user } = getState();
  const prevHideout = hideout.prevHideout;
  const updatedHideout = hideout.hideout;

  const hasChanged = !_.isEqual(prevHideout, updatedHideout);

  if (hasChanged) {
    dispatch(setPrevHideout(updatedHideout));
    console.log("%cSetting local storage!", "color: #7FFF00");
    localStorage.setItem("hideout", JSON.stringify(updatedHideout));
  }

  if (isRoot && authenticated && hasChanged) {
    console.log("%cSetting firebase storage!", "color: #7FFF00");
    const { token, userId } = user.user;
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios.post(
      `https://us-central1-tarkov-hideout-d2603.cloudfunctions.net/api/hideout/${userId}`,
      updatedHideout,
      options
    );
  }
};

export default hideoutSlice.reducer;
