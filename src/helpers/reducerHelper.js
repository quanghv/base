/**
 * 
 * @param {*} action 
 */
export const getResponseFromApi = action => {
  const response = {
    data: null,
    status: undefined,
    empty: false,
    error: false,
    networkError: false,
    message: null
  };
  if (
    action.networkError ||
    action.payload.status === undefined ||
    action.payload.status === null
  ) {
    //network error: not connected||no wifi||
    response.networkError = true;
  } else if (action.payload.status === 0) {
    //empty data
    response.empty = true;
    response.status = 0;
    response.message = action.payload.data.userMessage;
  } else if (action.payload.status < 0) {
    //error response
    response.status = action.payload.status;
    response.error = true;
    response.message = action.payload.data.userMessage;
  } else {
    //success||had data
    response.status = action.payload.status;
    response.data = action.payload.data;
    if (action.payload.data.userMessage) {
      response.message = action.payload.data.userMessage;
    }
  }

  return response;
};

export const getEmptyResponse = () => ({
  data: null,
  error: false,
  networkError: false,
  message: null
});
