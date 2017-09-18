import { connect } from "react-redux";
import OrderScreen from "./index";
import { dispatchDataFromApiGet, dispatchParams } from "../../actions";

class OrderConfirm extends OrderScreen {}

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
