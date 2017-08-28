const actionTypes = {
  LOGIN: "SignIn",
  PARAMS: "Params"
};

export const getUrlFromType = type => {
  const HOST = "http://m-shop.vn/";
  switch (type) {
    case actionTypes.LOGIN:
      return `${HOST}api-login`;
    default:
      break;
  }
};

export default actionTypes;
