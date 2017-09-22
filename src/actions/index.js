import axios from "axios";
import actionTypes, { getUrlFromType } from "../config/actionTypes";
import { consoleLog } from "../components/AppLog";
/**
 * response from api
 * @param {*} data 
 * @param {*} type 
 */
export const responseFromApi = (data, type) => ({ type, payload: data });

/**
 * error network
 * @param {*} type 
 */
export const responseNetworkError = type => ({
  type,
  payload: null,
  networkError: true
});

/**
 * dispatch response from api GET
 * @param {*} url 
 * @param {*} data 
 * @param {*} type 
 */
export const dispatchDataFromApiGet = (type, data, url) => dispatch => {
  const tempUrl = url ? `${url}` : getUrlFromType(type);
  consoleLog(tempUrl, type);
  axios
    .get(tempUrl, { params: data })
    .then(response => {
      consoleLog(response.data, type);
      if (type) dispatch(responseFromApi(response.data, type));
    })
    .catch(error => {
      consoleLog("networkError", error);
      if (type) dispatch(responseNetworkError(type));
    });
};

/**
 * dispatch response from api POST
 * @param {*} url 
 * @param {*} data 
 * @param {*} type 
 */
export const dispatchDataFromApiPost = (type, data, url) => dispatch => {
  const actionUrl = url ? `${url}` : getUrlFromType(type);
  consoleLog(actionUrl, type);
  consoleLog(data, type);
  axios
    .post(actionUrl, data)
    .then(response => {
      consoleLog(response.data, type);
      if (type) dispatch(responseFromApi(response.data, type));
    })
    .catch(error => {
      consoleLog("networkError", error);
      if (type) dispatch(responseNetworkError(type));
    });
};

export const dispatchParams = (data, type) => dispatch => {
  dispatch(responseFromApi(data, type !== null ? type : actionTypes.PARAMS));
};

export const postToServer = (actionUrl, data) => {
  consoleLog(data, actionUrl);
  return axios.post(actionUrl, data);
};

export const getFromServer = (actionUrl, data) => {
  consoleLog(data, actionUrl);
  let getParams; // = { pakage: "xyz.doctruyenonline" };
  if (data) {
    getParams = { ...getParams, ...data };
  }
  // console.log(getParams, "getParams");
  return axios
    .get(actionUrl, { params: getParams })
    .then(response => response.data)
    .catch(error => {
      consoleLog(error);
      return { networkError: true };
    });
};
