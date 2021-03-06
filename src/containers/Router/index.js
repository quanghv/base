import React from "react";
// import { Platform } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator
} from "react-navigation";
import SideBar from "./SideBar";
import TabBarComponent from "./TabBarComponent";

import AuthScreen from "../AuthScreen";
import ChangePass from "../Account/ChangePass";
import OrderConfirm from "../OrderTabScreen/OrderConfirm";
import OrderPacking from "../OrderTabScreen/OrderPacking";
import OrderShipping from "../OrderTabScreen/OrderShipping";
import OrderDone from "../OrderTabScreen/OrderDone";
import OrderCancel from "../OrderTabScreen/OrderCancel";
import OrderDetail from "../OrderDetail";
import OrderMapView from "../MapView";
import Chart from "../Chart";
import OrderAdd from "../OrderAdd";

const TabNav = TabNavigator(
  {
    OrderConfirm: { screen: OrderConfirm },
    OrderPacking: { screen: OrderPacking },
    OrderShipping: { screen: OrderShipping },
    OrderDone: { screen: OrderDone },
    OrderCancel: { screen: OrderCancel }
  },
  {
    tabBarPosition: "bottom",
    lazy: true,
    tabBarComponent: TabBarComponent
  }
);

const TabNavStack = StackNavigator({
  TabNav: { screen: TabNav }
});

const DrawerNav = DrawerNavigator(
  {
    TabNavStack: { screen: TabNavStack }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

const MainStack = StackNavigator(
  {
    AuthScreen: { screen: AuthScreen },
    ChangePass: { screen: ChangePass },
    DrawerNav: { screen: DrawerNav },
    OrderDetail: { screen: OrderDetail },
    OrderMapView: { screen: OrderMapView },
    Chart: { screen: Chart },
    OrderAdd: { screen: OrderAdd }
  },
  { headerMode: "none", mode: "card" }
);

export default MainStack;
