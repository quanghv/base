const actionTypes = {
  LOGIN: "SignIn",
  LOGOUT: "SignOut",
  USER_INFO: "UserInfo",
  ORDER_CONFIRM: "OrderConfirm",
  ORDER_CONFIRM_SHIPPING: "OrderConfirmShipping",
  ORDER_SHIPPING: "OrderShipping",
  ORDER_DONE: "OrdeDone",
  ORDER_USER_CANCEL: "OrderUserCancel",
  ORDER_CANCEL: "OrderCancel",
  PARAMS: "Params"
};

export const getUrlFromType = type => {
  const HOST = "http://m-shop.vn/";
  switch (type) {
    case actionTypes.LOGIN:
      return `${HOST}api-login`;
    case actionTypes.USER_INFO:
      return `${HOST}api-user-info`;
    case actionTypes.ORDER_CONFIRM:
    case actionTypes.ORDER_SHIPPING:
    case actionTypes.ORDER_DONE:
    case actionTypes.ORDER_CANCEL:
      return `${HOST}api-list-order?`;
    default:
      break;
  }
};

export const getStatusFromType = type => {
  switch (type) {
    case actionTypes.ORDER_CONFIRM:
      return -1;
    case actionTypes.ORDER_CONFIRM_SHIPPING:
      return -11;
    case actionTypes.ORDER_SHIPPING:
      return 0;
    case actionTypes.ORDER_USER_CANCEL:
      return -12;
    case actionTypes.ORDER_CANCEL:
      return -2;
    case actionTypes.ORDER_DONE:
      return 1;
    default:
      return 1;
  }
};

export default actionTypes;
