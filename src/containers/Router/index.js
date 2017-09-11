import React from "react";
import { Platform } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator
} from "react-navigation";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { Footer, FooterTab, Button, Text } from "native-base";

import config from "../../config";
import SideBar from "./SideBar";

import AuthScreen from "../AuthScreen";
import OrderConfirm from "../OrderTabScreen/OrderConfirm";
import OrderConfirmShipping from "../OrderTabScreen/OrderConfirmShipping";
import OrderShipping from "../OrderTabScreen/OrderShipping";
import OrderDone from "../OrderTabScreen/OrderDone";
import OrderCancel from "../OrderTabScreen/OrderCancel";
import OrderDetail from "../OrderDetail";
import OrderMapView from "../MapView";

const footers = [
  {
    label: "Đơn hàng mới",
    screen: "OrderConfirm",
    icon: "notifications-active",
    image: null
  },
  {
    label: "Chuẩn bị hàng",
    screen: "OrderConfirmShipping",
    icon: "package"
  },
  {
    label: "Vận chuyển",
    screen: "OrderShipping",
    icon: "local-shipping"
  },
  {
    label: "Hoàn thành",
    screen: "OrderDone",
    icon: "playlist-add-check"
  },
  {
    label: "Đã hủy",
    screen: "OrderCancel",
    icon: "delete-sweep"
  }
];

const renderFooterTab = props => {
  const view = footers.map((item, index) => {
    const activeTab = props.navigationState.index === index;
    const flex = activeTab ? 3 : 1;
    const tabText = !activeTab ? null : (
      <Text numberOfLines={1}>{item.label}</Text>
    );
    const color = activeTab ? "white" : "#7857a6";
    let icon;
    if (item.icon === "package") {
      icon = (
        <Octicons
          name={item.icon}
          size={config.settings.iconSize}
          color={color}
          style={{ marginBottom: 5 }}
        />
      );
    } else {
      icon = (
        <MaterialIcons
          name={item.icon}
          size={config.settings.iconSize}
          color={color}
          style={{ marginBottom: 5 }}
        />
      );
    }
    return (
      <Button
        style={{ flex }}
        key={index}
        full
        active={activeTab}
        onPress={() =>
          activeTab ? null : props.navigation.navigate(item.screen)}
      >
        {icon}
        {tabText}
      </Button>
    );
  });
  return (
    <Footer>
      <FooterTab>{view}</FooterTab>
    </Footer>
  );
};

const TabNav = TabNavigator(
  {
    OrderConfirm: { screen: OrderConfirm },
    OrderConfirmShipping: { screen: OrderConfirmShipping },
    OrderShipping: { screen: OrderShipping },
    OrderDone: { screen: OrderDone },
    OrderCancel: { screen: OrderCancel }
  },
  {
    tabBarPosition: "bottom",
    lazy: true,
    tabBarComponent: props => renderFooterTab(props)
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

export default StackNavigator(
  {
    AuthScreen: {
      screen: AuthScreen,
      navigationOptions: {
        header: null
      }
    },
    DrawerNav: { screen: DrawerNav },
    OrderDetail: { screen: OrderDetail },
    OrderMapView: { screen: OrderMapView }
  },
  { headerMode: "none" }
);
