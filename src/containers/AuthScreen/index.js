import React, { Component } from "react";
import Expo from "expo";
import { Container, Content, Body, Button, Text } from "native-base";
import { Image, View } from "react-native-animatable";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Grid, Row } from "react-native-easy-grid";

import fonts from "../../config/fonts";
import images from "../../config/images";
import styles from "../../config/styles";

import FieldInput from "../../components/FieldInput";

class AuthScreen extends Component {
  state = { isReady: false };
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: fonts.Roboto,
      Roboto_medium: fonts.Roboto_medium
    });
    this.setState({ isReady: true });
  }

  submit = values => {
    console.log(values);
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
})(connect(mapStateToProps)(AuthScreen));
