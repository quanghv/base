import React from "react";
import { Modal, View, PixelRatio, Image } from "react-native";
import { Button, Text } from "native-base";
import { Grid, Row } from "react-native-easy-grid";

import config from "../config";

const boxWidth =
  config.metrics.DEVICE_WIDTH > 480 ? 480 : config.metrics.DEVICE_WIDTH - 50;

export default class ModalMessage extends React.Component {
  render() {
    console.log(boxWidth, "props");

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
      ? <Image source={icMessage} style={styles.icon} />
      : null;

    return (
      <Modal
        animationType={"fade"}
        transparent
        visible={this.props.visible}
        onRequestClose={() => {}}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <Grid style={[config.styles.grid.center]}>
            <Row />
            <Row>
              <View
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
                <Text style={{ marginVertical: 30 }}>
                  {this.props.message}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    marginTop: 15
                  }}
                >
                  {/* <Button
                    transparent
                    style={[styles.button, styles.buttonCancel]}
                  >
                    <Text style={[styles.buttonText]}>
                      {"Hủy"}
                    </Text>
                  </Button> */}
                  <Button transparent style={[styles.button, styles.buttonOk]}>
                    <Text style={styles.buttonText}>
                      {this.props.ok ? this.props.ok : "Đồng ý"}
                    </Text>
                  </Button>
                </View>
              </View>
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
  icon: {
    marginTop: 15,
    width: boxWidth / 4,
    height: boxWidth / 4
  },
  button: {
    width: 100,
    borderRadius: 3,
    marginHorizontal: 5
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
    color: "white"
  },
  buttonCancel: {
    backgroundColor: config.colors.CANCEL_BACKGROUND
  },
  buttonOk: {
    backgroundColor: config.colors.OK_BACKGROUND
  }
};
