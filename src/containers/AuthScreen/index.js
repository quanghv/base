import React, { Component } from "react";
import { Container } from "native-base";
import {
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager
} from "react-native";
import { Image, View } from "react-native-animatable";

import images from "../../config/images";
import metrics from "../../config/metrics";

import LoginForm from "./LoginForm";

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.4;

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class AuthScreen extends Component {
  state = {
    visibleForm: null // Can be: null | SIGNUP | LOGIN
  };

  simulateLogin = (username, password) => {
    this.setState({ isLoading: true });
    setTimeout(
      () => this.setState({ isLoggedIn: true, isLoading: false }),
      1000
    );
  };

  _hideAuthScreen = async () => {
    // 2. Fade out the logo
    await this.logoImgRef.fadeOut(800);
    // 3. Tell the container (app.js) that the animation has completed
    // this.props.onLoginAnimationCompleted();
  };

  render() {
    // The following style is responsible of the "bounce-up from bottom" animation of the form
    const formStyle = { marginTop: 40 };
    return (
      <Container>
        <Image
          animation={"bounceIn"}
          ref={ref => (this.logoImgRef = ref)}
          style={styles.logoImg}
          source={images.logo}
        />
        <KeyboardAvoidingView
          keyboardVerticalOffset={-100}
          behavior={"padding"}
          style={[formStyle, styles.bottom]}
        >
          <LoginForm
            ref={ref => (this.formRef = ref)}
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    paddingTop: 24,
    backgroundColor: "white"
  },
  logoImg: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH,
    alignSelf: "center",
    resizeMode: "contain",
    marginVertical: 30
  },
  bottom: {
    backgroundColor: "#1976D2"
  }
});
