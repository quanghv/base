import { connect } from "react-redux";
import OrderScreen from "./index";
import { dispatchDataFromApiGet } from "../../actions";

class OrderConfirmShipping extends OrderScreen {}

function mapStateToProps(state) {
  return {
    orderList: state.orderConfirmShippingReducer
  };
}

export default connect(mapStateToProps, { dispatchDataFromApiGet })(
  OrderConfirmShipping
);
