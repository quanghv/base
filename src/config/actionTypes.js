const actionTypes = {
  LOGIN: "SignIn",
  LOGOUT: "SignOut",
  TOKEN_REG: "TokenReg",
  USER_INFO: "UserInfo",
  CHANGE_PASS: "ChangePass",
  ORDER_RELOAD: "OrderReload", //tab reload
  ORDER_BADGE: "OrderBadge",
  ORDER_CONFIRM: "OrderConfirm",
  ORDER_PACKING: "OrderConfirmShipping",
  ORDER_SHIPPING: "OrderShipping",
  ORDER_DONE: "OrdeDone",
  ORDER_USER_CANCEL: "OrderUserCancel",
  ORDER_CANCEL: "OrderCancel",
  ORDER_DETAIL: "OrderDetail",
  ORDER_DETAIL_STATUS_CHANGE: "OrderDetailStatusChange",
  PARAMS: "Params"
};

export const getUrlFromType = type => {
  const HOST = "http://m-shop.vn/1~1/";
  switch (type) {
    case actionTypes.TOKEN_REG:
      return `${HOST}api-token-reg`;
    case actionTypes.LOGIN:
      return `${HOST}api-login`;
    case actionTypes.ORDER_BADGE:
      return `${HOST}api-order-badge?`;
    case actionTypes.USER_INFO:
      return `${HOST}api-user-info?`;
    case actionTypes.CHANGE_PASS:
      return `${HOST}change-pass`;
    case actionTypes.ORDER_CONFIRM:
    case actionTypes.ORDER_PACKING:
    case actionTypes.ORDER_SHIPPING:
    case actionTypes.ORDER_DONE:
    case actionTypes.ORDER_CANCEL:
      return `${HOST}api-list-order?`;
    case actionTypes.ORDER_DETAIL:
      return `${HOST}api-order?`;
    case actionTypes.ORDER_DETAIL_STATUS_CHANGE:
      return `${HOST}api-order-status`;
    default:
      break;
  }
};

export const getStatusFromType = type => {
  switch (type) {
    case actionTypes.ORDER_CONFIRM:
      return "-1";
    case actionTypes.ORDER_PACKING:
      return "-11";
    case actionTypes.ORDER_SHIPPING:
      return "0";
    case actionTypes.ORDER_USER_CANCEL:
      return "-12";
    case actionTypes.ORDER_CANCEL:
      return "-2";
    case actionTypes.ORDER_DONE:
      return "1";
    default:
      return "1";
  }
};

export const getTypeFromStatus = status => {
  switch (status) {
    case "-1":
      return actionTypes.ORDER_CONFIRM;
    case "-11":
      return actionTypes.ORDER_PACKING;
    case "0":
      return actionTypes.ORDER_SHIPPING;
    case "-12":
      return actionTypes.ORDER_USER_CANCEL;
    case "-2":
      return actionTypes.ORDER_CANCEL;
    case "1":
      return actionTypes.ORDER_DONE;
    default:
      return null;
  }
};

export default actionTypes;
