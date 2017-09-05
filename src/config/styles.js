import { Platform } from "react-native";
import metrics from "./metrics";
import colors from "./colors";

export default {
  header: {
    title: {
      color: "white"
    }
  },
  view: {
    middleContent: {
      flex: 1,
      backgroundColor: colors.WINDOW_BACKGROUND
    },
    listContent: {
      flex: 1,
      backgroundColor: colors.WINDOW_BACKGROUND,
      padding: 15
    }
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    padding: 15
  },
  text: {
    time: {
      fontSize: Platform.OS === "ios" ? 10 : 12
    },
    center: {
      textAlign: "center"
    },
    tryAgain: {
      fontStyle: "italic"
    },
    error: {
      color: "red"
    }
  },
  grid: {
    center: { alignItems: "center" }
  },
  list: {
    marginLeft: 0
  },
  listItem: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    marginLeft: 0
  },
  icon: {
    read: {
      backgroundColor: "#888",
      height: 10,
      width: 10,
      borderRadius: 5
    },
    unRead: {
      backgroundColor: "#e21b0c",
      height: 10,
      width: 10,
      borderRadius: 5
    }
  },
  item: {
    isRead: {
      color: "#888",
      paddingLeft: 10
    },
    isNotRead: {
      paddingLeft: 10,
      color: "#333",
      fontWeight: "bold"
    }
  },
  logo: {
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
};
