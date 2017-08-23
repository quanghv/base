import React, { Component } from "react";
import { Container, Content, Form } from "native-base";
import {
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  UIManager
} from "react-native";
import { Image, View } from "react-native-animatable";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import images from "../../config/images";
import styles from "../../config/styles";

import FieldInput from "../../components/FieldInput";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class AuthScreen extends Component {
  state = {
    visibleForm: null // Can be: null | SIGNUP | LOGIN
  };

  onSubmitPressed = () => {
    console.log(this.passwordInputRef.getRenderedComponent().refs.passwordInputRef);
    this.passwordInputRef.getRenderedComponent().refs.passwordInputRef._root.focus();
    // this.passwordInputRef.getRenderedComponent().focus();
  };

  render() {
    return (
      <Container>
        <View style={styles.content}>
          <Image
            animation={"bounceIn"}
            ref={ref => (this.logoImgRef = ref)}
            style={styles.logo}
            source={images.logo}
          />
          <KeyboardAvoidingView
            keyboardVerticalOffset={-100}
            behavior={"height"}
          >
            <Field
              withRef
              name="username"
              ref={c => (this.usernameInputRef = c)}
              keyboardType="phone-pad"
              returnKeyType="next"
              refF={"usernameInputRef"}
              component={FieldInput}
              onEnter={this.onSubmitPressed}
              label="Tài khoản"
            />
            <Field
              withRef
              ref={ref => (this.passwordInputRef = ref)}
              refF={"passwordInputRef"}
              name="password"
              component={FieldInput}
              label="Mật khẩu"
              returnKeyType="done"
              keyboardType="numeric"
              isSecureText={true}
            />
          </KeyboardAvoidingView>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { accountInfo: state.accountReducer };
};

export default reduxForm({
  form: "loginForm",
  validate: values => {
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
  }
})(connect(mapStateToProps)(AuthScreen));
