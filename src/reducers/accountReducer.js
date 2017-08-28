import actionTypes from "../config/actionTypes";

export const accountReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return action.payload;
    default:
      return state;
  }
};
