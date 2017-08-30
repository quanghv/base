import actionTypes from "../config/actionTypes";
import { getResponseFromApi } from "../helpers/reducerHelper";

export const accountReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
    case actionTypes.USER_INFO:
      return getResponseFromApi(action);
    default:
      return state;
  }
};
