import { Platform } from "react-native";

module.exports = {
  timeoutTryAgain: 1000,
  iconSize: Platform.OS === "ios" ? 24 : 16
};
