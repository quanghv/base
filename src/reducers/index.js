import { combineReducers } from "redux";

import { accountReducer } from "./accountReducer";

const allReducers = combineReducers({ accountReducer });
export default allReducers;
