import { connect } from "react-redux";
import OrderScreen from "./index";
import { dispatchDataFromApiGet, dispatchParams } from "../../actions";

class OrderDone extends OrderScreen {}

function mapStateToProps(state) {
  return {
    realoadScreen: state.orderReloadReducer,
    orderList: state.orderDoneReducer
  };
}

export default connect(mapStateToProps, {
  dispatchDataFromApiGet,
  dispatchParams
})(OrderDone);
