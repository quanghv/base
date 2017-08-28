import React from "react";
import { AsyncStorage, BackHandler } from "react-native";
import Expo from "expo";
import { Container, Content, Body, Button, Text } from "native-base";
import { Image, View } from "react-native-animatable";
import { Field, reduxForm } from "redux-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Grid, Row } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";

import fonts from "../../config/fonts";
import images from "../../config/images";
import styles from "../../config/styles";
import storages from "../../config/storages";
import actionTypes from "../../config/actionTypes";
import { dispatchDataFromApiPost } from "../../actions";

import AppComponent from "../../components/AppComponent";
import FieldInput from "../../components/FieldInput";

class AuthScreen extends AppComponent {
  state = { isReady: false };

  handleBackPress = () => {
    BackHandler.exitApp();
  };

  goToMainPage = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Main"
        })
      ]
    });
    this.props.navigation.dispatch(resetAction); //no callback LoginScreen
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: fonts.Roboto,
      Roboto_medium: fonts.Roboto_medium
    });
    this.setState({ isReady: true });

    //no goBack from loginScreen
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);

    AsyncStorage.getItem(storages.ACCOUNT_ID).then(accountId => {
      //get userinfo from server
      if (accountId) {
        // consoleLog(accountId);
        this.setState({ hadSession: true });
        this.props.dispatchDataFromApiGet(
          constant.API.USER_INFO,
          { account_id: accountId },
          constant.TYPES.API_USER_INFO
        );
      } else {
        this.setState({ loading: false });
      }
    });
  }

  async getLoggedData() {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        const loggedArr = [];
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          const key = store[i][0];
          const value = store[i][1];
          loggedArr[key] = value;
        });
        // consoleLog(loggedArr);
        if (loggedArr && loggedArr[storages.ACCOUNT_ID]) {
          //dispatch loginReducre from Storage
          this.props.dispatchParams(
            { data: loggedArr, status: 1 },
            constant.TYPES.API_USER_INFO
          );
        } else this.setState({ loading: false });
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.accountInfo) {
      if (nextProps.accountInfo.data) {
        this.setState({ loading: true });
        //login successfull
        this.setLoggedData(nextProps.accountInfo.data);
        this.goToMainPage();
      } else if (this.state.hadSession) this.getLoggedData();
      else this.setState({ loading: false });
    }
  }

  setLoggedData = account => {
    this.logThis(account, "account");
    const multiSets = [
      [storages.ACCOUNT_ID, account.id.toString()],
      [storages.ACCOUNT_ID, account.id.toString()],
      [storages.ACCOUNT_ID, account.id.toString()]
    ];
    AsyncStorage.multiSet(multiSets);
  };

  submit = values => {
    // console.log(values);
    const data = { phone: values.phone, password: values.password };
    this.props.dispatchDataFromApiPost(actionTypes.LOGIN, data, null);
  };

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        <Content style={styles.view.middleContent}>
          <Grid style={[styles.grid.center, { marginTop: 30 }]}>
            <Row>
              <View style={{ width: "90%" }}>
                <Body>
                  <Image
                    animation={"bounceIn"}
                    ref={ref => (this.logoImgRef = ref)}
                    style={styles.logo}
                    source={images.logo}
                  />
                  <Field
                    withRef
                    name="username"
                    ref={c => (this.usernameInputRef = c)}
                    keyboardType="numeric"
                    returnKeyType="next"
                    returnKeyLabel="TIẾP"
                    refF={"usernameInputRef"}
                    component={FieldInput}
                    onEnter={() =>
                      this.passwordInputRef
                        .getRenderedComponent()
                        .refs.passwordInputRef._root.focus()}
                    style={{ width: "80%" }}
                    label="Tài khoản"
                  />
                  <Field
                    withRef
                    ref={ref => (this.passwordInputRef = ref)}
                    refF={"passwordInputRef"}
                    name="password"
                    component={FieldInput}
                    label="Mật khẩu"
                    returnKeyLabel="ĐĂNG NHẬP"
                    returnKeyType="done"
                    keyboardType="numeric"
                    onEnter={this.props.handleSubmit(this.submit.bind(this))}
                    secureTextEntry
                  />
                </Body>
                <View animation={"bounceIn"} style={{ marginTop: 20 }}>
                  <Button
                    block
                    onPress={this.props.handleSubmit(this.submit.bind(this))}
                  >
                    <Text>Đăng nhập</Text>
                  </Button>
                </View>
              </View>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { accountInfo: state.accountReducer };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      dispatchDataFromApiPost
    },
    dispatch
  );

const validate = values => {
  const error = {};
  error.username = "";
  error.password = "";
  if (!values.username) {
    error.username = "Chưa nhập";
  }
  if (!values.password) {
    error.password = "Chưa nhập";
  }
  return error;
};

export default reduxForm({
  form: "loginForm",
  validate: values => validate(values)
})(connect(mapStateToProps, mapDispatchToProps)(AuthScreen));
