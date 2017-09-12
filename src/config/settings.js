import { Platform } from "react-native";

module.exports = {
  eviroment: "DEV",
  timeoutTryAgain: 1000,
  iconSize: Platform.OS === "ios" ? 24 : 20
};
