import { connect } from "react-redux";
import OrderScreen from "./index";
import { dispatchDataFromApiGet } from "../../actions";

class OrderConfirm extends OrderScreen {}

function mapStateToProps(state) {
  return {
    orderList: state.orderConfirmReducer
  };
}

export default connect(mapStateToProps, { dispatchDataFromApiGet })(
  OrderConfirm
);
