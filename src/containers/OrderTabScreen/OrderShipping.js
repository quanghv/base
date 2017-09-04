import { connect } from "react-redux";
import OrderScreen from "./index";
import { dispatchDataFromApiGet } from "../../actions";

class OrderShipping extends OrderScreen {}

function mapStateToProps(state) {
  return {
    orderList: state.orderShippingReducer
  };
}

export default connect(mapStateToProps, { dispatchDataFromApiGet })(
  OrderShipping
);
