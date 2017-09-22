import React from "react";
import { Octicons, MaterialIcons } from "@expo/vector-icons";
import config from "../config";

export const getOrderInfo = orderScreen => {
  let type;
  let color;
  let emptyMessage;
  let emptyIcon;
  switch (orderScreen) {
    case config.settings.tabBarComponent.confirm: //cho xac nhan
      type = config.actionTypes.ORDER_CONFIRM;
      color = config.colors.status.CONFIRM;
      emptyMessage = config.strings.order.confirmMsgEmpty;
      break;
    case config.settings.tabBarComponent.packing: //chuan bi don hang
      type = config.actionTypes.ORDER_PACKING;
      color = config.colors.status.CONFIRM_SHIPPING;
      emptyMessage = config.strings.order.packingMsgEmpty;
      emptyIcon = (
        <Octicons name={"package"} color={config.colors.PRIMARY} size={64} />
      );
      break;
    case config.settings.tabBarComponent.shipping: //dang giao hang
      type = config.actionTypes.ORDER_SHIPPING;
      //   this.noteStyle = { color: "gray" };
      color = config.colors.status.SHIPPING;
      emptyMessage = config.strings.order.shippingMsgEmpty;
      emptyIcon = (
        <MaterialIcons
          name={"local-shipping"}
          color={config.colors.PRIMARY}
          size={64}
        />
      );
      break;
    case config.settings.tabBarComponent.done: //da hoan thanh
      type = config.actionTypes.ORDER_DONE;
      //   this.noteStyle = { color: "gray" };
      color = config.colors.status.DONE;
      emptyMessage = config.strings.order.doneMsgEmpty;
      emptyIcon = (
        <MaterialIcons
          name={"playlist-add-check"}
          color={config.colors.PRIMARY}
          size={64}
        />
      );
      break;
    case config.settings.tabBarComponent.cancel: //da huy
      type = config.actionTypes.ORDER_CANCEL;
      //   this.noteStyle = { color: "gray" };
      color = config.colors.status.CANCEL;
      emptyMessage = config.strings.order.cancelMsgEmpty;
      emptyIcon = (
        <MaterialIcons
          name={"delete-sweep"}
          color={config.colors.PRIMARY}
          size={64}
        />
      );
      break;
    default:
      break;
  }
  return { type, color, emptyMessage, emptyIcon };
};
