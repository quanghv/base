const actionTypes = {
  LOGIN: "SignIn",
  LOGOUT: "SignOut",
  USER_INFO: "UserInfo",
  PARAMS: "Params"
};

export const getUrlFromType = type => {
  const HOST = "http://m-shop.vn/";
  switch (type) {
    case actionTypes.LOGIN:
      return `${HOST}api-login`;
    case actionTypes.USER_INFO:
      return `${HOST}api-user-info`;
    default:
      break;
  }
};

export default actionTypes;
