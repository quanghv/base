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
    height: metrics.DEVICE_WIDTH * 0.3,
    width: metrics.DEVICE_WIDTH * 0.3,
    alignSelf: "center",
    resizeMode: "contain",
    marginVertical: 30
  },
  viewCenter: {
    flex: 1,
    justifyContent: "center"
  },
  textError: {
    color: "red",
    fontSize: 12
  }
});
export default styles;
