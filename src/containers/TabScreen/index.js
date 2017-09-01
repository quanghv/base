import React from "react";
import {
  View,
  RefreshControl,
  FlatList,
  TouchableHighlight
} from "react-native";
import { Container, Card, CardItem, Body, Spinner, Text } from "native-base";

import AppComponent from "../../components/AppComponent";
import config from "../../config";
import { getStatusFromType } from "../../config/actionTypes";
import { consoleLog } from "../../components/AppLog";

export default class OrderScreen extends AppComponent {
  constructor(props) {
    super(props);

    let status;
    switch (this.props.navigation.state.key) {
      case "OrderConfirm":
        status = getStatusFromType(config.actionTypes.ORDER_CONFIRM);
        break;
      case "OrderShipping":
        status = getStatusFromType(config.actionTypes.ORDER_SHIPPING);
        break;
      case "OrderDone":
        status = getStatusFromType(config.actionTypes.ORDER_DONE);
        break;
      case "OrderCancel":
        status = getStatusFromType(config.actionTypes.ORDER_CANCEL);
        break;
      default:
        break;
    }

    this.state = {
      page: 1,
      data: undefined,
      orderStatus: status,
      refreshing: false,
      endLoadMore: false
    };
  }
  componentWillMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    this.logThis(nextProps, "props");
    //refresh (Action back while data changed)
    // let propsData;
    // switch (this.state.orderStatus) {
    //   case constant.STATUS.CONFIRM_SHIPPING:
    //   case constant.STATUS.SHIPPING:
    //     propsData = nextProps.listOrderShipping;
    //     break;
    //   case constant.STATUS.FINISH:
    //     propsData = nextProps.listOrderFinish;
    //     break;
    //   case constant.STATUS.CANCEL_USER:
    //   case constant.STATUS.CANCEL:
    //     propsData = nextProps.listOrderCancel;
    //     break;
    //   case constant.STATUS.CONFIRM:
    //     propsData = nextProps.listOrderConfirm;
    //     break;
    //   default:
    //     break;
    // }

    if (nextProps.value) {
      // Actions.refresh({ value: false });
      this.handleRefresh();
    }

    //consoleLog(nextProps.data, "data fetched");
    // this.setState({
    //   data: propsData,
    //   endLoadMore:
    //     propsData !== null &&
    //     propsData !== undefined &&
    //     propsData.length % constant.PAGE_SIZE
    // });
  }

  getData() {
    const data = { page: this.state.page, status: this.state.orderStatus };
    this.props.dispatchDataFromApiGet(config.actionTypes.ORDER_CONFIRM, data);
  }

  handleRefresh = () => {
    // consoleLog("refreshing...");
    this.setState(
      {
        page: 1,
        data: undefined
      },
      () => {
        this.getData();
      }
    );
    this.setState({
      refreshing: false
    });
  };

  handleEndReached = () => {
    // consoleLog(this.state.endLoadMore);
    if (!this.state.endLoadMore && !this.props.isLoading) {
      this.setState(
        {
          page: this.state.page + 1
        },
        () => this.getData()
      );
    } else {
      consoleLog("No loadmore");
    }
  };

  onOrderPress = item => {
    this.props.navigation.navigate("OrderDetail", {
      orderId: item.id,
      selected: item.status,
      refreshFunc: this.handleRefresh
    });
  };

  renderItem = ({ item }) =>
    <Card>
      <TouchableHighlight onPress={() => this.onOrderPress(item)}>
        <CardItem style={{ borderRadius: 0 }}>
          <Body>
            <Text style={{ fontWeight: "bold" }}>
              {item.code}
            </Text>
            <Text>
              {item.total_price}
            </Text>
            <Text style={{ fontStyle: "italic", marginBottom: 10 }}>
              {item.update_time}
            </Text>
            <Text style={{ fontStyle: "italic", color: "brown" }}>
              {item.note}
            </Text>
          </Body>
        </CardItem>
      </TouchableHighlight>
    </Card>;

  renderFooter = () => {
    if (this.state.data.length < 10) return null;
    if (!this.state.endLoadMore) {
      return (
        <View>
          <Body>
            <Spinner />
            <Text>Đang tải thêm dữ liệu...</Text>
          </Body>
        </View>
      );
    }
    return (
      <View>
        <Body style={{ paddingTop: 5, paddingBottom: 5 }}>
          <Text>Đã hết dữ liệu</Text>
        </Body>
      </View>
    );
  };

  render() {
    let view;

    if (this.props.getError) {
      view = this.renderNetworkError();
    } else if (this.props.isLoading) {
      view = this.renderLoading();
    } else if (
      this.state.data !== null &&
      this.state.data !== undefined &&
      this.state.data.length > 0
    ) {
      // const navigation = this.props.navigation;
      view = (
        <Container>
          {/*<AppHeader isHome="true" />*/}
          <View
            style={{
              flex: 1,
              paddingHorizontal: 10,
              paddingVertical: 2,
              backgroundColor: "#f0f0f0"
            }}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={this.state.data}
              renderItem={this.renderItem}
              ListFooterComponent={this.renderFooter}
              keyExtractor={item => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh}
                />
              }
              onEndReachedThreshold={0.3}
              onEndReached={this.handleEndReached}
              contentContainerStyle={{
                borderBottomWidth: 0,
                borderTopWidth: 0
              }}
            />
          </View>
        </Container>
      );
    } else {
      view = this.renderNoData();
    }
    return view;
  }
}
