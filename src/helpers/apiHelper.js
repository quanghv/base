/**
 * parse du lieu tu json
 * 
 * @param {*} response 
 */
export const parseJsonFromApi = responseJson => {
    const response = {
      data: null,
      status: undefined,
      empty: false,
      error: false,
      networkError: false,
      message: null
    };
  
    // console.log(responseJson);
  
    if (responseJson.networkError || !responseJson.status) {
      //network error: not connected||no wifi||
      response.networkError = true;
    } else if (responseJson.status === 0) {
      //empty data
      response.empty = true;
      response.status = 0;
      response.message = responseJson.data.userMessage;
    } else if (responseJson.status < 0) {
      //error response
      response.status = responseJson.status;
      response.error = true;
      response.message = responseJson.data.userMessage;
    } else {
      //success||had data
      response.status = responseJson.status;
      response.data = responseJson.data;
      if (responseJson.data.userMessage) {
        response.message = responseJson.data.userMessage;
      }
    }
  
    return response;
  };
  