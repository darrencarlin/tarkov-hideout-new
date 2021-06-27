import { combineReducers } from "redux";

import countReducer from "./count";
import dashboardReducer from "./dashboard";
import hideoutReducer from "./hideout";
import userReducer from "./user";
import tabsReducer from "./tabs";

const rootReducer = combineReducers({
  count: countReducer,
  dashboard: dashboardReducer,
  hideout: hideoutReducer,
  user: userReducer,
  tabs: tabsReducer,
});

export default rootReducer;
