import React from "react";
import { View, FlatList } from "react-native";
import { Body, Spinner, Text, ListItem, Left, Right } from "native-base";
import { SimpleLineIcons } from "@expo/vector-icons";

import AppComponent from "../../components/AppComponent";
import AppHeader from "../../components/AppHeader";
import config from "../../config";
import { getStatusFromType } from "../../config/actionTypes";
import { consoleLog } from "../../components/AppLog";
import { handleDate } from "../../helpers/timeHelper";
import { moneyFormat } from "../../helpers/numberHelper";
import { getOrderInfo } from "../../helpers/appHelper";

export default class OrderScreen extends AppComponent {
  noteStyle = { color: "brown" };
  static navigationOptions = {
    header: props => <AppHeader isHome="true" navigation={props.navigation} />
  };
  constructor(props) {
    super(props);
    this.orderInfo = getOrderInfo(this.props.navigation.state.key);
    // console.log(this.orderInfo);
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
    const propsReload = this.props.realoadScreen;
    if (this.isOnReloadScreen(propsReload)) {
      this.resetReloadOnScreen(propsReload);
    }
    this.getData();
  }

  async componentWillReceiveProps(nextProps) {
    const propsData = nextProps.orderList;
    if (this.screenIsReady(propsData)) {
      this.setState({ isLoading: false });
    }
    if (propsData) {
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
      }
      if (
        propsData.empty ||
        (this.state.page > 1 && this.state.limit !== propsData.data.length)
      ) {
        this.setState({ endLoadMore: true });
      }
    }

    if (nextProps.realoadScreen) {
      if (this.isOnReloadScreen(nextProps.realoadScreen)) {
        await this.resetReloadOnScreen(nextProps.realoadScreen);
        await this.handleRefresh();
      }
    }
  }

  isOnReloadScreen = reloadProps =>
    reloadProps &&
    reloadProps.reloadOnStatus.indexOf(
      getStatusFromType(this.orderInfo.type)
    ) >= 0;

  resetReloadOnScreen = reloadProps => {
    const newReloadOnStatus = [];
    reloadProps.reloadOnStatus.map(value => {
      if (value !== getStatusFromType(this.orderInfo.type)) {
        newReloadOnStatus.push(value);
      }
    });
    this.props.dispatchParams(
      { reloadOnStatus: newReloadOnStatus, reloadBadge: true },
      config.actionTypes.ORDER_RELOAD
    );
  };

  async getData() {
    this.getOrderBadge();
    if (this.orderInfo.type) {
      const data = {
        page: this.state.page,
        status: getStatusFromType(this.orderInfo.type)
      };
      await this.props.dispatchDataFromApiGet(this.orderInfo.type, data);
    }
  }

  getOrderBadge = async accountId => {
    this.setState({ isTested: true });
    await this.props.dispatchDataFromApiGet(config.actionTypes.ORDER_BADGE, {
      account_id: accountId
    });
  };

  handleRefresh = () => {
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
      status: item.status,
      title: item.name,
      subTitle: item.phone,
      refreshFunc: this.handleRefresh
    });
  };

  renderListItem = ({ item }) => (
    <ListItem
      avatar
      style={{ marginLeft: 0 }}
      button
      onPress={() => this.onOrderPress(item)}
    >
      <Left>
        <View
          style={[
            config.styles.view.circle,
            { borderColor: this.orderInfo.color }
          ]}
        >
          <SimpleLineIcons
            name={"handbag"}
            size={config.settings.iconSize}
            color={this.orderInfo.color}
          />
        </View>
      </Left>
      <Body>
        <Text
          selectable
          style={
            item.name ? (
              item.account_id && { fontWeight: "bold" }
            ) : (
              { color: "gray" }
            )
          }
        >
          {item.name ? item.name : "no_name"}
        </Text>
        <Text
          selectable
          style={
            item.phone ? (
              item.account_id && { fontWeight: "bold" }
            ) : (
              { color: "gray" }
            )
          }
        >
          {item.phone ? item.phone : "no_phone"}
        </Text>
        <Text note selectable>
          {item.address_full}
        </Text>
        {this.orderInfo.type !== config.actionTypes.ORDER_CANCEL &&
        this.orderInfo.type !== config.actionTypes.ORDER_DONE && (
          <Text
            note
            style={[{ fontStyle: "italic", marginTop: 5 }, this.noteStyle]}
          >
            {item.note}
          </Text>
        )}
      </Body>
      <Right style={{ paddingRight: 0 }}>
        <Text note>{handleDate(item.update_time, "vi")}</Text>
        <Text style={{ color: config.colors.PRIMARY }}>
          {moneyFormat(item.total_price)}
        </Text>
        <View style={{ flexDirection: "row", paddingTop: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SimpleLineIcons
              size={12}
              name={"like"}
              color={config.colors.status.DONE}
            />
            <Text
              style={{
                fontSize: 12,
                color: config.colors.status.DONE
              }}
            >
              {" "}
              {item.account_order_status.finished}
            </Text>
          </View>
          <View
            style={{
              marginLeft: 15,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <SimpleLineIcons
              size={12}
              name={"dislike"}
              color={config.colors.status.CANCEL}
            />
            <Text
              style={{
                fontSize: 12,
                color: config.colors.status.CANCEL
              }}
            >
              {" "}
              {item.account_order_status.cancel}
            </Text>
          </View>
        </View>
      </Right>
    </ListItem>
  );
  renderFooter = () => {
    if (this.state.data && this.state.data.length < 10) return null;
    if (!this.state.endLoadMore) {
      return (
        <View>
          <Body>
            <Spinner />
            <Text>Tải thêm đơn hàng...</Text>
          </Body>
        </View>
      );
    }
    return (
      <View>
        <Body style={{ paddingTop: 5, paddingBottom: 5 }}>
          <Text>Đã tới đơn hàng cuối</Text>
        </Body>
      </View>
    );
  };

  render() {
    const orderList = this.props.orderList;
    console.log(orderList, "render");
    let view = this.handleRender(
      this.state.isLoading,
      orderList,
      () => this.handleRefresh(),
      null,
      this.state.page,
      this.orderInfo.emptyMessage,
      this.orderInfo.emptyIcon
    );
    if (view === null) {
      view = (
        <View style={config.styles.view.listContent}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={this.state.data}
            renderItem={this.renderListItem}
            ListFooterComponent={this.renderFooter}
            keyExtractor={item => item.id}
            refreshing={this.state.isLoading}
            onRefresh={this.handleRefresh}
            onEndReachedThreshold={0.3}
            onEndReached={this.handleEndReached}
            contentContainerStyle={{ borderBottomWidth: 0, borderTopWidth: 0 }}
          />
        </View>
      );
    }
    return view;
  }
}
