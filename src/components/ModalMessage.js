import React from "react";
import { Modal, PixelRatio, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Button, Text } from "native-base";
import { Grid, Row } from "react-native-easy-grid";

import config from "../config";

const boxWidth =
  config.metrics.DEVICE_WIDTH > 480 ? 480 : config.metrics.DEVICE_WIDTH - 50;

export default class ModalMessage extends React.Component {
  state = {
    visible: this.props.visible
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
          marginTop: 10
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
              <Text {...propsBtnText}>
                {value.text ? value.text : "OK"}
              </Text>
            </Button>
          );
        })}
      </View>
    );
  }

  render() {
    let icMessage;
    switch (this.props.icon) {
      case "info":
        icMessage = config.images.icWarningGray;
        break;
      case "warning":
        icMessage = config.images.icWarning;
        break;
      case "success":
        icMessage = config.images.icSuccess;
        break;
      case "error":
        icMessage = config.images.icError;
        break;
      default:
        icMessage = null;
    }
    const iconMessage = icMessage
      ? <Animatable.Image
          animation={"zoomIn"}
          delay={1}
          source={icMessage}
          style={styles.icon}
        />
      : null;

    console.log(this.state.visible, "state modal");

    return (
      <Modal
        animationType={"fade"}
        transparent
        visible={this.state.visible}
        onRequestClose={() => {}}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <Grid style={[config.styles.grid.center]}>
            <Row />
            <Row>
              <Animatable.View
                animation={"bounce"}
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
                {iconMessage}
                <Text style={styles.title}>
                  {this.props.title}
                </Text>
                <Text style={{ marginVertical: 20 }}>
                  {this.props.message}
                </Text>
                {this.renderButtonAction()}
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
