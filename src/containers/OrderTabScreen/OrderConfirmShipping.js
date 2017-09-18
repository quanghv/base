import { connect } from "react-redux";
import OrderScreen from "./index";
import { dispatchDataFromApiGet, dispatchParams } from "../../actions";

class OrderConfirmShipping extends OrderScreen {}

function mapStateToProps(state) {
  return {
    realoadScreen: state.orderReloadReducer,
    orderList: state.orderConfirmShippingReducer
  };
}

export default connect(mapStateToProps, {
  dispatchDataFromApiGet,
  dispatchParams
})(OrderConfirmShipping);
