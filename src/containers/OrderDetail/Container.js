import React from "react";
import { Platform, StyleSheet, Clipboard } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Picker,
  List,
  ListItem,
  Text,
  Thumbnail,
  Item,
  Toast
} from "native-base";
import Moment from "moment";
import {
  MaterialIcons,
  FontAwesome,
  SimpleLineIcons,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import AppComponent from "../../components/AppComponent";
import ModalMessage from "../../components/ModalMessage";
import actionTypes, { getStatusFromType } from "../../config/actionTypes";
import config from "../../config";
import { moneyFormat } from "../../helpers/numberHelper";

export default class OrderDetailContainer extends AppComponent {
  handleTime = dateTime => Moment(dateTime).format("HH:mm ngày DD/MM/YYYY");
  copyContent(text) {
    Clipboard.setString(text);
    Toast.show({
      text: "Đã copy vào text clipboard",
      position: "bottom",
      duration: 1000
    });
  }

  getStatusColor = status => {
    switch (status) {
      case getStatusFromType(actionTypes.ORDER_CONFIRM):
        return config.colors.status.CONFIRM;
      case getStatusFromType(actionTypes.ORDER_CONFIRM_SHIPPING):
        return config.colors.status.CONFIRM_SHIPPING;
      case getStatusFromType(actionTypes.ORDER_USER_CANCEL):
        return config.colors.status.CANCEL_USER;
      case getStatusFromType(actionTypes.ORDER_CANCEL):
        return config.colors.status.CANCEL;
      case getStatusFromType(actionTypes.ORDER_SHIPPING):
        return config.colors.status.SHIPPING;
      case getStatusFromType(actionTypes.ORDER_DONE):
        return config.colors.status.DONE;
      default:
        return config.colors.status.CANCEL;
    }
  };

  render() {
    const {
      header,
      propsData,
      currentStatus,
      onChangeStatus,
      propsDataStatus
    } = this.props;
    const iconSize = Platform.OS === "ios" ? 24 : 20;
    const orderObj = propsData.data.info;
    let textNote = null;
    if (orderObj.note) {
      textNote = (
        <ListItem avatar style={[config.styles.listItem, styles.lastItem]}>
          <Left>
            <SimpleLineIcons name="note" size={iconSize} />
          </Left>
          <Body>
            <Text style={styles.note} selectable>
              {orderObj.note}
            </Text>
          </Body>
        </ListItem>
      );
    }

    let modalMessage = null;
    if (propsDataStatus) {
      // this.logThis(propsDataStatus, "propsDataStatus");
      const iconMessage = propsDataStatus.status === 1 ? "success" : "error";
      const userMessage = propsDataStatus.networkError
        ? config.message.network_error
        : propsDataStatus.message;
      modalMessage = (
        <ModalMessage
          visible
          message={userMessage}
          icon={iconMessage}
          viewAnimation={"pulse"}
        />
      );
    }
    const pickerColor =
      Platform.OS === "ios"
        ? null
        : {
            color: this.getStatusColor(currentStatus),
            marginHorizontal: 10
          };
    return (
      <Container>
        {header}
        {modalMessage}
        <Content padder>
          <Card>
            <CardItem header>
              <Text>Tình trạng đơn hàng</Text>
            </CardItem>
            <Picker
              supportedOrientations={["portrait", "landscape"]}
              iosHeader="Select one"
              mode="dropdown"
              onValueChange={value => onChangeStatus(value)}
              selectedValue={currentStatus}
              style={pickerColor}
            >
              <Item
                label="CHỜ XÁC NHẬN"
                value={getStatusFromType(actionTypes.ORDER_CONFIRM)}
              />
              <Item
                label="CHỜ GIAO HÀNG"
                value={getStatusFromType(actionTypes.ORDER_CONFIRM_SHIPPING)}
              />
              <Item
                label="ĐANG GIAO HÀNG"
                value={getStatusFromType(actionTypes.ORDER_SHIPPING)}
              />
              <Item
                label="HOÀN THÀNH"
                value={getStatusFromType(actionTypes.ORDER_DONE)}
              />
              <Item
                label="TRẢ HÀNG/HOÀN TIỀN"
                value={getStatusFromType(actionTypes.ORDER_CANCEL)}
              />
              <Item
                label="ĐÃ HỦY"
                value={getStatusFromType(actionTypes.ORDER_USER_CANCEL)}
              />
            </Picker>
          </Card>
          <List style={config.styles.list}>
            <ListItem itemDivider style={styles.itemDivider}>
              <Text>Thông tin khách hàng</Text>
            </ListItem>
            <ListItem avatar style={config.styles.listItem}>
              <Left>
                <SimpleLineIcons name="user" size={iconSize} />
              </Left>
              <Body>
                <Text bold selectable>
                  {orderObj.name}
                </Text>
              </Body>
              <Right>
                <MaterialIcons
                  name="content-copy"
                  color={"#999"}
                  size={iconSize}
                  button
                  onPress={() => this.copyContent(orderObj.name)}
                />
              </Right>
            </ListItem>
            <ListItem avatar style={config.styles.listItem}>
              <Left>
                <SimpleLineIcons name="phone" size={iconSize} />
              </Left>
              <Body>
                <Text bold selectable>
                  {orderObj.phone}
                </Text>
              </Body>
              <Right>
                <MaterialIcons
                  name="content-copy"
                  color={"#999"}
                  size={iconSize}
                  button
                  onPress={() => this.copyContent(orderObj.phone)}
                />
              </Right>
            </ListItem>
            <ListItem avatar style={config.styles.listItem}>
              <Left>
                <SimpleLineIcons
                  name="location-pin"
                  size={iconSize}
                  color={config.colors.PRIMARY}
                  button
                  onPress={() =>
                    this.props.navigation.navigate("OrderMapView", {
                      name: orderObj.name,
                      address: orderObj.address,
                      addressFull: orderObj.address_full,
                      note: orderObj.note,
                    })}
                />
              </Left>
              <Body>
                <Text bold selectable>
                  {orderObj.address_full}
                </Text>
              </Body>
              <Right>
                <MaterialIcons
                  name="content-copy"
                  color={"#999"}
                  size={iconSize}
                  button
                  onPress={() => this.copyContent(orderObj.address_full)}
                />
              </Right>
            </ListItem>

            {textNote}
            <ListItem itemDivider style={styles.itemDivider}>
              <Text>Thông tin thanh toán</Text>
            </ListItem>
            <ListItem icon style={config.styles.listItem}>
              <Left>
                <MaterialIcons name="attach-money" size={iconSize} />
              </Left>
              <Body>
                <Text>{moneyFormat(orderObj.total_price)}</Text>
              </Body>
            </ListItem>
            <ListItem icon style={[config.styles.listItem, styles.lastItem]}>
              <Left>
                <SimpleLineIcons name="credit-card" size={iconSize} />
              </Left>
              <Body>
                <Text>
                  {orderObj.order_type === "chuyenkhoan" ? (
                    "Thanh toán chuyển khoản"
                  ) : (
                    "Thanh toán khi nhận hàng"
                  )}
                </Text>
              </Body>
            </ListItem>
          </List>
          <ListItem itemDivider style={styles.itemDivider}>
            <Text>Thông tin đơn hàng, sản phẩm</Text>
          </ListItem>
          <ListItem icon style={config.styles.listItem}>
            <Left>
              <MaterialCommunityIcons name="calendar-clock" size={iconSize} />
            </Left>
            <Body>
              <Text>{this.handleTime(orderObj.update_time)}</Text>
            </Body>
          </ListItem>
          <ListItem icon style={config.styles.listItem}>
            <Left>
              <FontAwesome name="barcode" size={iconSize} />
            </Left>
            <Body>
              <Text>{orderObj.code}</Text>
            </Body>
          </ListItem>
          <List
            dataArray={propsData.data.list}
            renderRow={item => (
              <ListItem avatar style={config.styles.listItem}>
                <Left>
                  <Thumbnail square source={{ uri: item.img }} />
                </Left>
                <Body>
                  <Text>{item.name}</Text>
                  <Text>Số lượng: {item.number}</Text>
                  <Text>Giá: {item.price_2}</Text>
                </Body>
              </ListItem>
            )}
            keyExtractor={item => item.id}
          />
          <List>
            <ListItem itemDivider style={styles.itemDivider}>
              <Text>Phí vận chuyển, COD</Text>
            </ListItem>
            <ListItem icon style={config.styles.listItem}>
              <Body>
                <Text>Đơn giá</Text>
              </Body>
              <Right>
                <Text note>{moneyFormat(orderObj.order_price, "")}</Text>
              </Right>
            </ListItem>
            <ListItem icon style={config.styles.listItem}>
              <Body>
                <Text>Phí vận chuyển</Text>
              </Body>
              <Right>
                <Text note>{moneyFormat(orderObj.pvc_price, "")}</Text>
              </Right>
            </ListItem>
            <ListItem icon style={config.styles.listItem}>
              <Body>
                <Text>Phí thu hộ</Text>
              </Body>
              <Right>
                <Text note>{moneyFormat(orderObj.cod_price, "")}</Text>
              </Right>
            </ListItem>
            <ListItem icon style={config.styles.listItem}>
              <Body>
                <Text>Sử dụng Mcoin</Text>
              </Body>
              <Right>
                <Text note>{moneyFormat(orderObj.account_point_use, "")}</Text>
              </Right>
            </ListItem>
          </List>
          <Card />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: "400",
    marginTop: 10,
    fontSize: 18
  },
  bold: {
    fontWeight: "bold"
  },
  note: {
    fontStyle: "italic",
    color: "brown"
  },
  textRight: {
    textAlign: "right",
    alignSelf: "stretch"
  },
  textLeft: {
    textAlign: "left",
    alignSelf: "stretch"
  },
  textFocus: {
    color: "#59348a",
    fontWeight: "bold"
  },
  itemDivider: {
    marginTop: 10
  },
  lastItem: {
    top: 1
  }
});
