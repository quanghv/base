import { connect } from "react-redux";
import OrderScreen from "./index";
import { dispatchDataFromApiGet, dispatchParams } from "../../actions";

class OrderCancel extends OrderScreen {}

function mapStateToProps(state) {
  return {
    realoadScreen: state.orderReloadReducer,
    orderList: state.orderCancelReducer
  };
}

export default connect(mapStateToProps, {
  dispatchDataFromApiGet,
  dispatchParams
})(OrderCancel);
