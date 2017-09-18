import React from "react";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { Footer, FooterTab, Button, Badge, Text } from "native-base";
import { connect } from "react-redux";

import config from "../../config";

const footers = [
  {
    label: "Đơn mới",
    screen: "OrderConfirm",
    icon: "notifications-active",
    image: null
  },
  {
    label: "Gói hàng",
    screen: "OrderConfirmShipping",
    icon: "package"
  },
  {
    label: "Giao hàng",
    screen: "OrderShipping",
    icon: "local-shipping"
  },
  {
    label: "Đã xong",
    screen: "OrderDone",
    icon: "playlist-add-check"
  },
  {
    label: "Đã hủy",
    screen: "OrderCancel",
    icon: "delete-sweep"
  }
];

class TabBarComponent extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps, "testProps");
  }
  render() {
    const view = footers.map((item, index) => {
      const activeTab = this.props.navigationState.index === index;
      const flex = activeTab ? 3 : 1;
      const tabText = !activeTab ? null : (
        <Text numberOfLines={1}>{item.label}</Text>
      );
      const color = activeTab ? "white" : "#7857a6";
      let icon;
      if (item.icon === "package") {
        icon = (
          <Octicons
            name={item.icon}
            size={config.settings.iconSize}
            color={color}
            style={{ marginBottom: 5 }}
          />
        );
      } else {
        icon = (
          <MaterialIcons
            name={item.icon}
            size={config.settings.iconSize}
            color={color}
            style={{ marginBottom: 5 }}
          />
        );
      }
      return (
        <Button
          style={{ flex }}
          key={index}
          full
          active={activeTab}
          onPress={
            activeTab ? null : () => this.props.navigation.navigate(item.screen)
          }
        >
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
  return { orderBadge: state.orderBadeReducer };
}
export default connect(mapStateToProps)(TabBarComponent);
