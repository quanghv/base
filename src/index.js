import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { StyleProvider } from "native-base";

import getTheme from "../native-base-theme/components";
import theme from "../native-base-theme/variables/commonColor";

import allReducers from "./reducers";
import MainStack from "./config/routes";

const store = createStore(allReducers, applyMiddleware(thunk));

export default class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(theme)}>
          <MainStack />
        </StyleProvider>
      </Provider>
    );
  }
}
