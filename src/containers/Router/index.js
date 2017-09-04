import React from "react";
import { Platform } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator
} from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";
import { Footer, FooterTab, Button, Text } from "native-base";

import SideBar from "./SideBar";

import AuthScreen from "../AuthScreen";
import OrderConfirm from "../OrderTabScreen/OrderConfirm";
import OrderShipping from "../OrderTabScreen/OrderShipping";
import OrderDone from "../OrderTabScreen/OrderDone";
import OrderCancel from "../OrderTabScreen/OrderCancel";
import OrderDetail from "../OrderDetail";

const footers = [
  {
    label: "Đơn hàng mới",
    screen: "OrderConfirm",
    icon: "add-shopping-cart",
    image: null
  },
  {
    label: "Giao hàng",
    screen: "OrderShipping",
    icon: "local-shipping"
  },
  {
    label: "Thành công",
    screen: "OrderDone",
    icon: "playlist-add-check"
  },
  {
    label: "Đã hủy",
    screen: "OrderCancel",
    icon: "delete-forever"
  }
];

const TabNav = TabNavigator(
  {
    OrderConfirm: { screen: OrderConfirm },
    OrderShipping: { screen: OrderShipping },
    OrderDone: { screen: OrderDone },
    OrderCancel: { screen: OrderCancel }
  },
  {
    tabBarPosition: "bottom",
    lazy: true,
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            {footers.map((item, index) => {
              const activeTab = props.navigationState.index === index;
              const flex = activeTab ? 3 : 1;
              const tabText = !activeTab
                ? null
                : <Text numberOfLines={1}>
                    {item.label}
                  </Text>;
              const color = activeTab ? "white" : "#7857a6";
              return (
                <Button
                  style={{ flex }}
                  key={index}
                  full
                  active={activeTab}
                  onPress={() =>
                    activeTab ? null : props.navigation.navigate(item.screen)}
                >
                  <MaterialIcons
                    name={item.icon}
                    size={Platform.OS === "ios" ? 26 : 24}
                    color={color}
                    style={{ marginBottom: 5 }}
                  />
                  {tabText}
                </Button>
              );
            })}
          </FooterTab>
        </Footer>
      );
    }
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
    OrderDetail: { screen: OrderDetail }
  },
  { headerMode: "none" }
);
