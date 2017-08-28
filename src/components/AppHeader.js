import React from "react";
// import { Actions } from "react-native-router-flux";
import { Image, Platform } from "react-native";
import { Header, Body, Left, Button, Icon } from "native-base";

export default class AppHeader extends React.Component {
  render() {
    console.log(this.props, "test app");

    let view = null;

    if (this.props.isHome === "true") {
      view = (
        <Header>
          {Platform.OS === "android" ? <Left /> : ""}
          <Body>
            <Image source={require("../assets/logo.png")} />
          </Body>
        </Header>
      );
    } else {
      let left = null;
      if (Platform.OS === "android") {
        left = (
          <Left>
            <Button
              transparent
              onPress={() => {
                if (this.props.needToRefresh) {
                  this.props.nav.state.params.refreshFunc();
                  this.props.nav.goBack();
                } else {
                  this.props.nav.goBack();
                }
              }}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
        );
      } else {
        left = (
          <Button
            transparent
            onPress={() => {
              if (this.props.needToRefresh) {
                this.props.nav.state.params.refreshFunc();
                this.props.nav.goBack();
              } else {
                this.props.nav.goBack();
              }
            }}
          >
            <Icon name="arrow-back" />
          </Button>
        );
      }
      view = (
        <Header>
          {left}
          <Body>
            <Image source={require("../assets/logo.png")} />
          </Body>
        </Header>
      );
    }

    return view;
  }
}
