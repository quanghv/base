import React from "react";
import { KeyboardAvoidingView, Modal, PixelRatio, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Button, Text, Input, Item } from "native-base";
import { Grid, Row } from "react-native-easy-grid";
import { Ionicons } from "@expo/vector-icons";

import config from "../config";

const boxWidth =
  config.metrics.DEVICE_WIDTH > 480 ? 480 : config.metrics.DEVICE_WIDTH - 50;

export default class ModalMessage extends React.Component {
  state = {
    visible: this.props.visible,
    inputValue: null
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible });
    // console.log(nextProps);
  }

  closeThis = () => {
    this.setState({ visible: false });
  };

  renderButtonAction() {
    const btnActions = [
      { text: "Đồng ý", onPress: this.closeThis, type: "default" }
    ];
    const actions = this.props.action ? this.props.action : btnActions;
    return (
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          marginTop: 20
        }}
      >
        {actions.map((value, index) => {
          let propsBtn;
          let propsBtnText;
          switch (value.type) {
            case "cancel":
              propsBtn = {
                transparent: true,
                style: [styles.button, styles.buttonCancel]
              };
              propsBtnText = {
                style: [styles.buttonText, styles.buttonTextDefault]
              };
              break;
            case "danger":
              propsBtn = {
                transparent: true,
                style: [styles.button, styles.buttonDanger]
              };
              propsBtnText = {
                style: [styles.buttonText, styles.buttonTextDefault]
              };
              break;
            default:
              propsBtn = { primary: true, style: styles.button };
              propsBtnText = { style: styles.buttonText };
          }
          return (
            <Button
              onPress={value.onPress ? value.onPress : this.closeThis}
              key={index}
              {...propsBtn}
            >
              <Text {...propsBtnText}>{value.text ? value.text : "OK"}</Text>
            </Button>
          );
        })}
        {this.props.editable && (
          <Button
            key={"keyX"}
            style={[styles.button, styles.buttonDanger]}
            onPress={() => {
              this.closeThis();
              this.props.editable.onPress(this.state.inputValue);
            }}
          >
            <Text style={styles.buttonText}>{this.props.editable.text}</Text>
          </Button>
        )}
      </View>
    );
  }

  render() {
    let icMessage;
    const iconSize = 74;
    switch (this.props.icon) {
      case "info":
        // icMessage = config.images.icWarningGray;
        icMessage = (
          <Ionicons
            name={"ios-alert-outline"}
            size={iconSize}
            color={config.colors.INFO}
          />
        );
        break;
      case "warning":
        // icMessage = config.images.icWarning;
        icMessage = (
          <Ionicons
            name={"ios-alert-outline"}
            size={iconSize}
            color={config.colors.WARNING}
          />
        );
        break;
      case "success":
        // icMessage = config.images.icSuccess;
        icMessage = (
          <Ionicons
            name={"ios-checkmark-circle-outline"}
            size={iconSize}
            color={config.colors.SUCCESS}
          />
        );
        break;
      case "error":
        // icMessage = config.images.icError;
        icMessage = (
          <Ionicons
            name={"ios-close-circle-outline"}
            size={iconSize}
            color={config.colors.DANGER}
          />
        );
        break;
      default:
        icMessage = null;
    }

    let { modalAnimation, viewAnimation, duration } = this.props;

    modalAnimation = modalAnimation !== null ? modalAnimation : "fade";
    viewAnimation = viewAnimation !== null ? viewAnimation : "bounce";
    duration = duration !== null ? duration : 800;

    return (
      <Modal
        animationType={modalAnimation}
        duration={300}
        transparent
        visible={this.state.visible}
        onRequestClose={() => {}}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <Grid style={[config.styles.grid.center]}>
            <Row />
            <Row>
              <Animatable.View
                animation={viewAnimation}
                duration={duration}
                style={{
                  backgroundColor: "white",
                  alignItems: "center",
                  alignSelf: "baseline",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 1.5,
                  elevation: 3,
                  borderRadius: 4,
                  borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  width: boxWidth
                }}
              >
                <Animatable.View animation={"zoomIn"} duration={800}>
                  {icMessage}
                </Animatable.View>
                <KeyboardAvoidingView behavior="padding">
                  {/* {iconMessage} */}
                  <Text style={styles.title}>{this.props.title}</Text>
                  <Text style={{ marginVertical: 10 }}>
                    {this.props.message}
                  </Text>

                  {this.props.editable && (
                    <Item regular style={{ marginBottom: 5 }}>
                      <Input
                        onChangeText={inputValue =>
                          this.setState({ inputValue })}
                        style={{ minHeight: 50 }}
                        value={this.props.editable.inputValue}
                        placeholder="Input value"
                        multiline
                      />
                    </Item>
                  )}
                  {this.renderButtonAction()}
                </KeyboardAvoidingView>
              </Animatable.View>
            </Row>
            <Row />
          </Grid>
        </View>
      </Modal>
    );
  }
}

const styles = {
  title: {
    fontWeight: "bold",
    fontSize: 20
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1.5,
    elevation: 3
  },
  icon: {
    marginTop: 10,
    width: boxWidth / 4,
    height: boxWidth / 4
  },
  buttonTextDefault: {
    color: "white"
  },
  buttonText: {
    flex: 1,
    textAlign: "center"
  },

  button: {
    width: 100,
    borderRadius: 3,
    marginHorizontal: 5
  },
  buttonOk: {
    backgroundColor: config.colors.OK_BACKGROUND
  },
  buttonCancel: {
    backgroundColor: config.colors.CANCEL_BACKGROUND
  },
  buttonDanger: {
    backgroundColor: config.colors.DANGER_BACKGROUND
  },
  buttonDefault: {
    backgroundColor: config.colors.PRIMARY,
    borderWidth: 1,
    borderColor: "gray",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1.5,
    elevation: 3
  }
};
