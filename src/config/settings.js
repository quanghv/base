import { Platform } from "react-native";

module.exports = {
  eviroment: "PRO",
  isDebug: false,
  timeoutTryAgain: 1000,
  iconSize: Platform.OS === "ios" ? 24 : 24
};
