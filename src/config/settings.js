import { Platform } from "react-native";

module.exports = {
  eviroment: "PRO",
  isDebug: false,
  timeoutTryAgain: 1000,
  iconSize: Platform.OS === "ios" ? 24 : 24,
  hostImgUrl: "http://m-shop.vn/",
  hostUrl: "http://m-shop.vn/1~1/",
  tabBarComponent: {
    confirm: "OrderConfirm",
    packing: "OrderPacking",
    shipping: "OrderShipping",
    done: "OrderDone",
    cancel: "OrderCancel"
  }
};
