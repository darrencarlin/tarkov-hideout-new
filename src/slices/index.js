import { combineReducers } from "redux";

import countReducer from "./count";
import hideoutReducer from "./hideout";
import userReducer from "./user";
import tabsReducer from "./tabs";

const rootReducer = combineReducers({
  count: countReducer,
  hideout: hideoutReducer,
  user: userReducer,
  tabs: tabsReducer,
});

export default rootReducer;
