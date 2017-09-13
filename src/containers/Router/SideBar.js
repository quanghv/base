import React from "react";
import { Platform, Image, AsyncStorage, View } from "react-native";
import {
  Text,
  Container,
  List,
  ListItem,
  Content,
  Left,
  Body,
  Thumbnail
} from "native-base";
import { connect } from "react-redux";
import { SimpleLineIcons } from "@expo/vector-icons";

import { dispatchDataFromApiPost, dispatchParams } from "../../actions";
import actionTypes from "../../config/actionTypes";
import storages from "../../config/storages";
import images from "../../config/images";
import ModalMessage from "../../components/ModalMessage";
import config from "../../config";

const routesPub = [
  {
    label: "Doanh thu",
    icon: "chart",
    screen: "Chart"
  },
  {
    label: "Tài khoản",
    icon: "user",
    screen: "Profile"
  },
  {
    label: "Đổi mật khẩu",
    icon: "lock",
    screen: "ChangePass"
  },
  {
    label: "Đăng xuất",
    icon: "logout",
    screen: "Logout"
  }
];

class SideBar extends React.Component {
  state = {
    msgVisible: false,
    fullname: this.props.accountInfo[storages.ACCOUNT_FULLNAME],
    accountImg: this.props.accountInfo[storages.ACCOUNT_IMAGE],
    nickname: this.props.accountInfo[storages.ACCOUNT_NICKNAME],
    routes: routesPub
  };

  signOutPressed = async () => {
    await AsyncStorage.clear();

    this.props.dispatchParams({ data: null }, actionTypes.LOGOUT);
    this.setState({ msgVisible: false });
    this.props.navigation.navigate("AuthScreen");
  };

  handleOnPress = screen => {
    if (screen === "Logout") {
      this.props.navigation.navigate("DrawerClose");
      this.setState({ msgVisible: true });
    } else {
      setTimeout(() => this.props.navigation.navigate(screen), 0);
      this.props.navigation.navigate("DrawerClose");
    }
  };

  render() {
    return (
      <Container>
        <ModalMessage
          visible={this.state.msgVisible}
          message={"Bạn muốn thoát tài khoản?"}
          icon={"warning"}
          action={[
            {
              text: "Không",
              type: "cancel",
              onPress: () => this.setState({ msgVisible: false })
            },
            { text: "Có", onPress: () => this.signOutPressed(), type: "danger" }
          ]}
        />
        <Content>
          <View style={{ height: Platform.OS === "ios" ? 140 : 120 }}>
            <Image
              source={images.navigation}
              resizeMode={"cover"}
              style={{
                width: "100%",
                height: Platform.OS === "ios" ? 140 : 120
              }}
            />
            <View style={styles.fade} />
            <View style={styles.schoolView}>
              <Thumbnail
                circular
                source={
                  this.state.accountImg ? { uri: this.state.accountImg } : null
                }
              />
              <Text style={[styles.titleText, styles.avtText]}>
                {this.state.fullname}
              </Text>
              <Text style={styles.subTitleText}>@{this.state.nickname}</Text>
            </View>
          </View>
          <ListItem itemDivider>
            <Text />
          </ListItem>
          <List
            dataArray={this.state.routes}
            renderRow={data => (
              <ListItem
                icon
                button
                onPress={() => this.handleOnPress(data.screen)}
              >
                <Left>
                  <SimpleLineIcons
                    name={data.icon}
                    size={18}
                    color={config.colors.PRIMARY}
                  />
                </Left>
                <Body>
                  <Text>{data.label}</Text>
                </Body>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  accountInfo: state.accountReducer.data
});

export default connect(mapStateToProps, {
  dispatchDataFromApiPost,
  dispatchParams
})(SideBar);

const styles = {
  avtText: {
    marginTop: 5
  },
  titleText: {
    color: "white",
    backgroundColor: "transparent"
  },
  subTitleText: {
    color: "#f0f0f0",
    backgroundColor: "transparent",
    fontStyle: "italic"
  },
  avatar: {
    width: 50,
    height: 50
  },
  fade: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,.4)"
  },
  schoolView: {
    top: Platform.OS === "ios" ? 20 : 0,
    position: "absolute",
    left: 10,
    right: 10,
    flexDirection: "column",
    padding: 10
  }
};
