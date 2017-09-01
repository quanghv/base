import actionTypes from "../config/actionTypes";
import { getResponseFromApi, getEmptyResponse } from "../helpers/reducerHelper";

export const accountReducer = (state = null, action) => {
  // console.log(action, "action");
  switch (action.type) {
    case actionTypes.LOGIN:
    case actionTypes.USER_INFO:
      return getResponseFromApi(action);
    case actionTypes.LOGOUT:
      return getEmptyResponse();
    default:
      return state;
  }
};
