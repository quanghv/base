import React from "react";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { Footer, FooterTab, Button, Badge, Text } from "native-base";
import { connect } from "react-redux";

import config from "../../config";
import actionTypes, { getStatusFromType } from "../../config/actionTypes";

const footers = [
  {
    label: "Đơn mới",
    screen: "OrderConfirm",
    icon: "notifications-active",
    image: null,
    status: getStatusFromType(actionTypes.ORDER_CONFIRM)
  },
  {
    label: "Gói hàng",
    screen: "OrderConfirmShipping",
    icon: "package",
    status: getStatusFromType(actionTypes.ORDER_CONFIRM_SHIPPING)
  },
  {
    label: "Giao hàng",
    screen: "OrderShipping",
    icon: "local-shipping",
    status: getStatusFromType(actionTypes.ORDER_SHIPPING)
  },
  {
    label: "Đã xong",
    screen: "OrderDone",
    status: getStatusFromType(actionTypes.ORDER_DONE),
    icon: "playlist-add-check"
  },
  {
    label: "Đã hủy",
    screen: "OrderCancel",
    status: getStatusFromType(actionTypes.ORDER_CANCEL),
    icon: "delete-sweep"
  }
];

class TabBarComponent extends React.Component {
  // onPressed = item => {
  //   // console.log(this.props.reloadScreen, "TabBarComponent");
  //   const propsScreen = this.props.reloadScreen;
  //   let params = null;
  //   if (propsScreen && propsScreen.reloadOnStatus) {
  //     params =
  //       propsScreen.reloadOnStatus.indexOf(item.status) !== -1
  //         ? { needToReload: true }
  //         : null;
  //     if (item.status === getStatusFromType(actionTypes.ORDER_CANCEL)) {
  //       params =
  //         propsScreen.reloadOnStatus.indexOf(
  //           getStatusFromType(actionTypes.ORDER_USER_CANCEL)
  //         ) !== -1
  //           ? { needToReload: true }
  //           : params;
  //     }
  //   }

  //   this.props.navigation.navigate(item.screen, params);
  // };

  render() {
    let badge;
    const badgeObj = this.props.orderBadge ? this.props.orderBadge.data : null;
    const view = footers.map((item, index) => {
      const activeTab = this.props.navigationState.index === index;
      const flex = activeTab ? 3 : 1;

      badge = null;
      if (badgeObj !== null && item.status) {
        Object.keys(badgeObj).map(key => {
          if (key === item.status) {
            const badgeCount = badgeObj[key];
            if (badgeCount > 0) {
              badge = (
                <Badge key={index} style={{ position: "relative", top: 10 }}>
                  <Text>{badgeCount}</Text>
                </Badge>
              );
            }
          }
          return null;
        });
      }

      // console.log(badge, "badge");

      let icon;
      const color = activeTab ? "white" : "#7857a6";
      const iconStyle = !activeTab && badge ? { marginBottom: 15 } : {};
      if (item.icon === "package") {
        icon = (
          <Octicons
            name={item.icon}
            size={config.settings.iconSize}
            color={color}
            style={iconStyle}
          />
        );
      } else {
        icon = (
          <MaterialIcons
            name={item.icon}
            size={config.settings.iconSize}
            color={color}
            style={iconStyle}
          />
        );
      }

      const textStyle = badge ? { marginBottom: 10 } : null;
      const tabText = !activeTab ? null : (
        <Text numberOfLines={1} style={textStyle}>
          {item.label}
        </Text>
      );

      return (
        <Button
          badge
          vertical
          style={{ flex }}
          key={index}
          full
          active={activeTab}
          onPress={() => this.props.navigation.navigate(item.screen)}
        >
          {badge}
          {icon}
          {tabText}
        </Button>
      );
    });
    return (
      <Footer>
        <FooterTab>{view}</FooterTab>
      </Footer>
    );
  }
}

function mapStateToProps(state) {
  return {
    // reloadScreen: state.orderReloadReducer,
    orderBadge: state.orderBadgeReducer
  };
}
export default connect(mapStateToProps)(TabBarComponent);
