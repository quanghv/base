import React from "react";
import { View, FlatList, TouchableHighlight } from "react-native";
import { Card, CardItem, Body, Spinner, Text } from "native-base";

import AppComponent from "../../components/AppComponent";
import AppHeader from "../../components/AppHeader";
import config from "../../config";
import { getStatusFromType } from "../../config/actionTypes";
import { consoleLog } from "../../components/AppLog";

export default class OrderScreen extends AppComponent {
  actionType = null;
  static navigationOptions = {
    header: props => <AppHeader isHome="true" navigation={props.navigation} />
  };
  constructor(props) {
    super(props);
    switch (this.props.navigation.state.key) {
      case "OrderConfirm":
        this.actionType = config.actionTypes.ORDER_CONFIRM;
        break;
      case "OrderShipping":
        this.actionType = config.actionTypes.ORDER_SHIPPING;
        break;
      case "OrderDone":
        this.actionType = config.actionTypes.ORDER_DONE;
        break;
      case "OrderCancel":
        this.actionType = config.actionTypes.ORDER_CANCEL;
        break;
      default:
        break;
    }
    this.state = {
      isLoading: true,
      page: 1,
      limit: 0,
      data: undefined,
      refreshing: false,
      endLoadMore: false
    };
  }
  componentWillMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    this.logThis(nextProps, "props");
    const propsData = nextProps.orderList;
    if (this.screenIsReady(propsData)) {
      this.setState({ isLoading: false });
    }
    if (propsData.data) {
      if (propsData.data.length > 0) {
        this.setState({
          limit: propsData.data.length,
          isLoading: false,
          data:
            this.state.page === 1
              ? propsData.data
              : [...this.state.data, ...propsData.data]
        });
      }
      if (
        (propsData.empty && this.state.page === 1) ||
        (this.state.page > 1 && this.state.limit !== propsData.data.length)
      ) {
        this.setState({ endLoadMore: true });
      }
    }

    if (nextProps.value) {
      // Actions.refresh({ value: false });
      this.handleRefresh();
    }
  }

  getData() {
    if (this.actionType) {
      const data = {
        page: this.state.page,
        status: getStatusFromType(this.actionType)
      };
      this.props.dispatchDataFromApiGet(this.actionType, data);
    }
  }

  handleRefresh = () => {
    // consoleLog("refreshing...");

    this.setState(
      {
        isLoading: true,
        page: 1,
        data: undefined
      },
      () => {
        setTimeout(() => {
          this.getData();
        }, config.settings.timeoutTryAgain);
      }
    );
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
    <Card key={item.id}>
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
    if (this.state.data === undefined) return null;
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
    const orderList = this.props.orderList;
    this.logThis(this.state, "data");
    let view = this.handleRender(
      this.state.isLoading,
      orderList,
      () => this.handleRefresh(),
      this.state.page
    );
    if (view === null) {
      view = (
        <View style={config.styles.view.listContent}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={this.state.data}
            renderItem={this.renderItem}
            ListFooterComponent={this.renderFooter}
            keyExtractor={item => item.id}
            refreshing={this.state.isLoading}
            onRefresh={this.handleRefresh}
            onEndReachedThreshold={0.3}
            onEndReached={this.handleEndReached}
            contentContainerStyle={{
              borderBottomWidth: 0,
              borderTopWidth: 0
            }}
          />
        </View>
      );
    }
    return view;
  }
}
