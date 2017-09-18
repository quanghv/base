import { connect } from "react-redux";
import OrderScreen from "./index";
import { dispatchDataFromApiGet, dispatchParams } from "../../actions";

class OrderShipping extends OrderScreen {}

function mapStateToProps(state) {
  return {
    realoadScreen: state.orderReloadReducer,
    orderList: state.orderShippingReducer
  };
}

export default connect(mapStateToProps, {
  dispatchDataFromApiGet,
  dispatchParams
})(OrderShipping);
