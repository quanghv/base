import React from "react";
import { connect } from "react-redux";
import { Linking } from "react-native";

import AppComponent from "../../components/AppComponent";
import AppHeader from "../../components/AppHeader";
import actionTypes, { getUrlFromType } from "../../config/actionTypes";
import config from "../../config";

import OrderDetailContainer from "./container";

import {
  dispatchDataFromApiGet,
  dispatchDataFromApiPost,
  dispatchParams,
  postToServer
} from "../../actions";

class OrderDetail extends AppComponent {
  constructor(props) {
    super(props);
    //this.logThis(this.props.navigation.state.params);
    this.state = {
      accountId: this.props.accountInfo[config.storages.ACCOUNT_ID],
      isLoading: true,
      startStatus: this.props.navigation.state.params.status,
      selected: this.props.navigation.state.params.status,
      selectedTmp: this.props.navigation.state.params.status,
      needToRefresh: false,
      endStatus: null,
      showMessage: false,
      message: null,
      iconMsg: "error",
      reloadOnStatus: []
    };
  }

  componentWillMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    // this.logThis(nextProps, "OrderDetail");
    const propsData = nextProps.orderDetail;
    if (this.screenIsReady(propsData)) {
      this.setState({ isLoading: false });
    }

    if (nextProps.reloadScreen) {
      this.setState({ reloadOnStatus: nextProps.reloadScreen.reloadOnStatus });
    }
  }

  async componentWillUnmount() {
    if (
      this.state.endStatus !== null &&
      this.state.startStatus !== this.state.endStatus
    ) {
      //badge
      await this.props.dispatchDataFromApiGet(config.actionTypes.ORDER_BADGE, {
        account_id: this.state.accountId
      });

      //set reload on Tab Screen
      const reloadOnStatus = [
        ...this.state.reloadOnStatus,
        this.state.endStatus
      ];
      this.props.dispatchParams({ reloadOnStatus }, actionTypes.ORDER_RELOAD);
    }
  }

  getData(tryAgain = false) {
    setTimeout(() => {
      this.props.dispatchDataFromApiGet(actionTypes.ORDER_DETAIL, {
        id: this.props.navigation.state.params.orderId
      });
    }, tryAgain ? config.settings.timeoutTryAgain : 0);
  }

  onChangeStatus = async value => {
    this.setState({ selected: value });
    //send data to server
    await postToServer(getUrlFromType(actionTypes.ORDER_DETAIL_STATUS_CHANGE), {
      id: this.props.navigation.state.params.orderId,
      status: value
    }).then(response => {
      //this.logThis(response.data, "onChangeStatus");
      if (response.data) {
        let selected;
        let selectedTmp = this.state.selectedTmp;
        let iconType;
        if (response.data.status <= 0) {
          selected = this.state.selectedTmp;
          iconType = "error";
        } else {
          selectedTmp = value;
          selected = value;
          iconType = "success";
        }
        const endStatus =
          selected === actionTypes.ORDER_USER_CANCEL
            ? actionTypes.ORDER_CANCEL
            : selected;
        this.setState({
          selectedTmp,
          selected,
          endStatus,
          showMessage: true,
          needToRefresh: this.state.startStatus !== selected,
          message: response.data.data.userMessage,
          iconMsg: iconType
        });
      } else {
        this.setState({
          selected: this.state.selectedTmp,
          showMessage: true,
          message: config.message.network_error,
          iconMsg: "error"
        });
      }
    });
  };

  render() {
    // this.logThis(this.state, "state");
    const { title, subTitle } = this.props.navigation.state.params;
    const header = (
      <AppHeader
        title={title}
        subTitle={subTitle}
        needToRefresh={this.state.needToRefresh}
        callbackOnGoBack={
          this.state.needToRefresh ? (
            this.props.navigation.state.params.refreshFunc
          ) : null
        }
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
        currentStatus: this.state.selected,
        onChangeStatus: this.onChangeStatus,
        propsDataStatus: {
          visible: this.state.showMessage,
          message: this.state.message,
          icon: this.state.iconMsg
        }
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
  accountInfo: state.accountReducer.data,
  orderDetail: state.orderDetailReducer,
  reloadScreen: state.orderReloadReducer
});

export default connect(mapStateToProps, {
  dispatchDataFromApiGet,
  dispatchDataFromApiPost,
  dispatchParams
})(OrderDetail);
