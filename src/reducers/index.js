import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import { accountReducer } from "./accountReducer";

const allReducers = combineReducers({ form: formReducer, accountReducer });
export default allReducers;
