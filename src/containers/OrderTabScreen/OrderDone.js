import { connect } from "react-redux";
import OrderScreen from "./index";
import { dispatchDataFromApiGet } from "../../actions";

class OrderDone extends OrderScreen {}

function mapStateToProps(state) {
  return {
    orderList: state.orderDoneReducer
  };
}

export default connect(mapStateToProps, { dispatchDataFromApiGet })(OrderDone);
