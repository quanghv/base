import React from "react";
import { connect } from "react-redux";
import { Linking } from "react-native";

import AppComponent from "../../components/AppComponent";
import AppHeader from "../../components/AppHeader";
import actionTypes from "../../config/actionTypes";
import config from "../../config";

import OrderDetailContainer from "./container";

import {
  dispatchDataFromApiGet,
  dispatchDataFromApiPost,
  dispatchParams
} from "../../actions";

class OrderDetail extends AppComponent {
  constructor(props) {
    super(props);
    //this.logThis(this.props.navigation.state.params);
    this.state = {
      isLoading: true,
      selected1: this.props.navigation.state.params.status,
      needToRefresh: false
    };
  }

  componentWillMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    this.logThis(nextProps, "OrderDetail");
    const propsData = nextProps.orderDetail;
    if (this.screenIsReady(propsData)) {
      this.setState({ isLoading: false });
    }
  }

  componentWillUnmount() {
    // this.logThis("componentWillUnmount");
    if (this.props.orderDetailStatus && this.props.orderDetailStatus.status) {
      this.props.dispatchParams(null, actionTypes.ORDER_DETAIL_STATUS_CHANGE);
    }
  }

  getData(tryAgain = false) {
    setTimeout(() => {
      this.props.dispatchDataFromApiGet(actionTypes.ORDER_DETAIL, {
        id: this.props.navigation.state.params.orderId
      });
    }, tryAgain ? config.settings.timeoutTryAgain : 0);
  }

  onChangeStatus = value => {
    this.logThis("changeStatus");
    //send data to server
    this.props.dispatchDataFromApiPost(actionTypes.ORDER_DETAIL_STATUS_CHANGE, {
      id: this.props.navigation.state.params.orderId,
      status: value
    });
    this.setState({ selected1: value, needToRefresh: true });
  };

  render() {
    const { title, subTitle } = this.props.navigation.state.params;
    const header = (
      <AppHeader
        title={title}
        subTitle={subTitle}
        needToRefresh={this.state.needToRefresh}
        rightIcons={[
          { name: "call", callback: () => Linking.openURL(`tel:${subTitle}`) }
        ]}
        {...this.props}
      />
    );
    const propsData = this.props.orderDetail;
    let view = this.handleRender(this.state.isLoading, propsData, null, header);

    if (view === null) {
      const propsContainer = {
        header,
        propsData,
        currentStatus: this.state.selected1,
        onChangeStatus: this.onChangeStatus,
        propsDataStatus: this.props.orderDetailStatus
      };

      view = (
        <OrderDetailContainer
          {...propsContainer}
          navigation={this.props.navigation}
        />
      );
    }
    return view;
  }
}

const mapStateToProps = state => ({
  orderDetail: state.orderDetailReducer,
  orderDetailStatus: state.orderDetailStatusReducer
});

export default connect(mapStateToProps, {
  dispatchDataFromApiGet,
  dispatchDataFromApiPost,
  dispatchParams
})(OrderDetail);
