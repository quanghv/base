import React from "react";
import { AsyncStorage, BackHandler } from "react-native";
import Expo from "expo";
import { Container, Content, Body, Button, Text, Spinner } from "native-base";
import { Image, View } from "react-native-animatable";
import { Field, reduxForm } from "redux-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Grid, Row } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";

import config from "../../config";
import {
  dispatchDataFromApiPost,
  dispatchDataFromApiGet,
  dispatchParams
} from "../../actions";

import AppComponent from "../../components/AppComponent";
import FieldInput from "../../components/FieldInput";
import ModalMessage from "../../components/ModalMessage";

class AuthScreen extends AppComponent {
  state = { isLoading: true, isSubmitPressed: false, hasError: false };

  handleBackPress = () => {
    BackHandler.exitApp();
  };

  goToMainPage = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "DrawerNav"
        })
      ]
    });
    this.props.navigation.dispatch(resetAction); //no callback LoginScreen
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: config.fonts.Roboto,
      Roboto_medium: config.fonts.Roboto_medium
    });
    // this.setState({ isLoading: false });

    //no goBack from loginScreen
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);

    AsyncStorage.getItem(config.storages.ACCOUNT_ID).then(accountId => {
      //get userinfo from server
      if (accountId) {
        this.setState({ hadSession: true });
        this.props.dispatchDataFromApiGet(config.actionTypes.USER_INFO, {
          account_id: accountId
        });
      } else {
        this.setState({ isLoading: false });
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
        if (loggedArr && loggedArr[config.storages.ACCOUNT_ID]) {
          //dispatch loginReducre from Storage
          this.props.dispatchParams(
            { data: loggedArr, status: 1 },
            config.actionTypes.USER_INFO
          );
        } else this.setState({ isLoading: false });
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    // this.logThis(nextProps, "props");
    if (nextProps.accountInfo) {
      if (nextProps.accountInfo.data) {
        this.setState({ isLoading: true });
        //login successfull
        this.setLoggedData(nextProps.accountInfo.data);
        this.goToMainPage();
      } else if (this.state.hadSession) this.getLoggedData();
      else this.setState({ isLoading: false });
    }
  }

  setLoggedData = account => {
    const multiSets = [
      [config.storages.ACCOUNT_ID, account.id.toString()],
      [config.storages.ACCOUNT_ID, account.id.toString()],
      [config.storages.ACCOUNT_ID, account.id.toString()]
    ];
    AsyncStorage.multiSet(multiSets);
  };

  submit = values => {
    // this.logThis("onsubmit");
    this.setState({ isLoading: true, isSubmitPressed: true });
    const data = { phone: values.username, password: values.password };
    this.props.dispatchDataFromApiPost(config.actionTypes.LOGIN, data, null);
  };

  render() {
    let content;
    let btnSubmit = null;
    let modalMessage = null;
    let hasError = false;
    let errorMessage;
    let iconMessage;
    if (this.state.isLoading) {
      content = <Spinner />;
    } else {
      // this.logThis(this.state, "auth");
      if (
        this.state.isSubmitPressed &&
        this.props.accountInfo &&
        (this.props.accountInfo.error || this.props.accountInfo.networkError)
      ) {
        hasError = true;
        const message = this.props.accountInfo.error
          ? this.props.accountInfo.message
          : config.message.network_error;
        iconMessage = "error";
        errorMessage = message;
        modalMessage = (
          <ModalMessage
            visible={hasError}
            message={errorMessage}
            icon={iconMessage}
            action={[
              {
                text: "Đồng ý",
                onPress: () => this.setState({ isSubmitPressed: false })
              }
            ]}
          />
        );
      }
      content = (
        <Body>
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
      );
      btnSubmit = (
        <View animation={"bounceIn"} style={{ marginTop: 20 }}>
          <Button
            block
            onPress={this.props.handleSubmit(this.submit.bind(this))}
          >
            <Text>Đăng nhập</Text>
          </Button>
        </View>
      );
    }
    return (
      <Container>
        {modalMessage}
        <Content style={config.styles.view.middleContent}>
          <Grid style={[config.styles.grid.center, { marginTop: 30 }]}>
            <Row>
              <View style={{ width: "90%" }}>
                <Body>
                  <Image
                    animation={"bounceIn"}
                    ref={ref => (this.logoImgRef = ref)}
                    style={config.styles.logo}
                    source={config.images.logo}
                  />
                  {content}
                </Body>
                {btnSubmit}
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
      dispatchDataFromApiPost,
      dispatchDataFromApiGet,
      dispatchParams
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
