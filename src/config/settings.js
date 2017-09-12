import { Platform } from "react-native";

module.exports = {
  eviroment: "PRO",
  timeoutTryAgain: 1000,
  iconSize: Platform.OS === "ios" ? 24 : 24
};
