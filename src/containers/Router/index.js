import React from "react";
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator
} from "react-navigation";

import SideBar from "./SideBar";

import AuthScreen from "../AuthScreen";
import OrderConfirm from "../TabScreen/OrderConfirm";

const TabNav = TabNavigator({
  OrderConfirm: { screen: OrderConfirm }
});

const TabNavStack = StackNavigator({
  TabNav: { screen: TabNav }
});

const DrawerNav = DrawerNavigator(
  {
    TabNavStack: { screen: TabNavStack }
  },
  {
    contentComponent: () => <SideBar />
  }
);

export default StackNavigator(
  {
    AuthScreen: {
      screen: AuthScreen,
      navigationOptions: {
        header: null
      }
    },
    DrawerNav: { screen: DrawerNav }
  },
  { headerMode: "none" }
);
