import { connect } from "react-redux";
import { Notifications } from "expo";
import OrderScreen from "./index";
import { dispatchDataFromApiGet, dispatchParams } from "../../actions";

class OrderConfirm extends OrderScreen {
  constructor(props) {
    super(props);
    // console.log(this.state, "OrderConfirm State");
    Notifications.setBadgeNumberAsync(0);
  }
}

function mapStateToProps(state) {
  return {
    realoadScreen: state.orderReloadReducer,
    orderList: state.orderConfirmReducer
  };
}

export default connect(mapStateToProps, {
  dispatchDataFromApiGet,
  dispatchParams
})(OrderConfirm);
