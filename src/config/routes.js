import { StackNavigator } from "react-navigation";

import AuthScreen from "../containers/AuthScreen";
import OrderConfirm from "../containers/TabScreen/OrderConfirm";

const MainStack = StackNavigator({
  AuthScreen: {
    screen: AuthScreen,
    navigationOptions: {
      header: null
    }
  },
  OrderConfirm: { screen: OrderConfirm }
});

export default MainStack;
