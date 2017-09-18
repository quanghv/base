import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import { accountReducer } from "./accountReducer";
import {
  orderReloadReducer,
  orderBadgeReducer,
  orderConfirmReducer,
  orderConfirmShippingReducer,
  orderShippingReducer,
  orderDoneReducer,
  orderCancelReducer,
  orderDetailReducer
} from "./orderReducer";

const allReducers = combineReducers({
  orderReloadReducer,
  orderBadgeReducer,
  form: formReducer,
  accountReducer,
  orderConfirmReducer,
  orderConfirmShippingReducer,
  orderShippingReducer,
  orderDoneReducer,
  orderCancelReducer,
  orderDetailReducer
});
export default allReducers;
