import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import { accountReducer } from "./accountReducer";
import {
  orderConfirmReducer,
  orderShippingReducer,
  orderDoneReducer,
  orderCancelReducer,
  orderDetailReducer,
  orderDetailStatusReducer
} from "./orderReducer";

const allReducers = combineReducers({
  form: formReducer,
  accountReducer,
  orderConfirmReducer,
  orderShippingReducer,
  orderDoneReducer,
  orderCancelReducer,
  orderDetailReducer,
  orderDetailStatusReducer
});
export default allReducers;
