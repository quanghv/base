import actionTypes from "../config/actionTypes";
import { getResponseFromApi } from "../helpers/reducerHelper";

export const orderConfirmReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.ORDER_CONFIRM:
      return getResponseFromApi(action);
    default:
      return state;
  }
};
export const orderShippingReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.ORDER_SHIPPING:
      return getResponseFromApi(action);
    default:
      return state;
  }
};
export const orderDoneReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.ORDER_DONE:
      return getResponseFromApi(action);
    default:
      return state;
  }
};
export const orderCancelReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.ORDER_CANCEL:
      return getResponseFromApi(action);
    default:
      return state;
  }
};
