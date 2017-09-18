import { Platform } from "react-native";

module.exports = {
  eviroment: "DEV",
  isDebug: true,
  timeoutTryAgain: 1000,
  iconSize: Platform.OS === "ios" ? 24 : 24
};
