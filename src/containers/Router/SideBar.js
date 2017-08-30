import React from "react";
import { Platform, Image, Alert, AsyncStorage, View } from "react-native";
import {
  Text,
  Container,
  List,
  ListItem,
  Content,
  Left,
  Body,
  Icon,
  Thumbnail
} from "native-base";
import { connect } from "react-redux";

import { dispatchDataFromApiPost, dispatchParams } from "../../actions";
import actionTypes from "../../config/actionTypes";
import storages from "../../config/storages";
import images from "../../config/images";

const routesPub = [
  {
    label: "lang.Profile",
    icon: "ios-information-circle-outline",
    screen: "Profile"
  },
  {
    label: "lang.ChangePassword",
    icon: "ios-lock-outline",
    screen: "ChangePassword"
  },
  {
    label: "lang.SignOut",
    icon: "ios-log-out-outline",
    screen: "Logout"
  }
];

class SideBar extends React.Component {
  state = {
    fullname: this.props.accountInfo[storages.ACCOUNT_FULLNAME],
    routes: routesPub
  };

  async removeStorage() {
    // console.log(this.props);
    try {
      await AsyncStorage.clear();
      //this.props.clearData();
      //   this.props.dispatchDataFromApiPost(constant.API.LOGOUT, {
      //     account_id: this.props.accountInfo[constant.STORAGE.ACCOUNT.ID],
      //     device_token: "device_token",
      //     platform: Platform.OS === "ios" ? 1 : 2
      //   });
      //clear accountReducer
      this.props.dispatchParams({ data: null }, actionTypes.LOGOUT);
      this.props.navigation.navigate("LoginScreen");
    } catch (error) {
      console.log("error", error);
    }
  }

  handleOnPress = screen => {
    if (screen === "Logout") {
      Alert.alert("", "Bạn muốn thoát tài khoản?", [
        { text: "Không" },
        {
          text: "Có",
          onPress: () => {
            this.removeStorage();
          }
        }
      ]);
    } else {
      setTimeout(() => this.props.navigation.navigate(screen), 0);
      this.props.navigation.navigate("DrawerClose");
    }
  };

  render() {
    return (
      <Container>
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
              <Thumbnail circular source={this.state.logo} />
              <Text style={[styles.titleText, styles.avtText]}>
                {this.state.fullname}
              </Text>
              <Text style={styles.titleText}>
                {this.state.schoolName}
              </Text>
            </View>
          </View>
          <ListItem itemDivider>
            <Text />
          </ListItem>
          <List
            dataArray={this.state.routes}
            renderRow={data =>
              <ListItem
                icon
                button
                onPress={() => this.handleOnPress(data.screen)}
              >
                <Left>
                  <Icon primary name={data.icon} />
                </Left>
                <Body>
                  <Text>
                    {data.label}
                  </Text>
                </Body>
              </ListItem>}
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
