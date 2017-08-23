import { StyleSheet } from "react-native";
import metrics from "./metrics";

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "white",
    padding: 15
  },
  logo: {
    flex: 1,
    height: null,
    width: metrics.DEVICE_WIDTH * 0.6,
    alignSelf: "center",
    resizeMode: "contain",
    marginVertical: 30
  }
});
export default styles;
