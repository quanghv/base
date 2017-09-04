import { connect } from "react-redux";
import OrderScreen from "./index";
import { dispatchDataFromApiGet } from "../../actions";

class OrderCancel extends OrderScreen {}

function mapStateToProps(state) {
  return {
    orderList: state.orderCancelReducer
  };
}

export default connect(mapStateToProps, { dispatchDataFromApiGet })(
  OrderCancel
);
