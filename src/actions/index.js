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
  let tempUrl = url ? `${url}?` : getUrlFromType(type);
  Object.keys(data).forEach(key => (tempUrl += `${key}=${data[key]}&`));
  consoleLog(tempUrl, type);
  axios
    .get(tempUrl)
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
