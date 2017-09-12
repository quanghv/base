import React from "react";
import { Provider } from "react-redux";
import { Notifications, Asset } from "expo";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Root, StyleProvider } from "native-base";

import getTheme from "../native-base-theme/components";
import theme from "../native-base-theme/variables/commonColor";

import config from "./config";
import allReducers from "./reducers";
import MainStack from "./containers/Router";

const store = createStore(allReducers, applyMiddleware(thunk));

export default class Main extends React.Component {
  componentWillMount() {
    this._cacheResourcesAsync();
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    if (config.settings.eviroment === "PRO") {
      this._notificationSubscription = Notifications.addListener(
        this._handleNotification
      );
    }
  }

  _handleNotification = notification => {
    console.log(notification, "notification");
    // this.setState({ notification });
  };

  async _cacheResourcesAsync() {
    const images = [config.images.logo];

    for (const image of images) {
      await Asset.fromModule(image).downloadAsync();
    }

    this.setState({ isReady: true });
  }

  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(theme)}>
          <Root>
            <MainStack />
          </Root>
        </StyleProvider>
      </Provider>
    );
  }
}
