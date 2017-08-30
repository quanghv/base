import React from "react";
import { Modal, View, PixelRatio } from "react-native";
import { Button, Text } from "native-base";
import { Grid, Row } from "react-native-easy-grid";

import config from "../config";

const boxWidth =
  config.metrics.DEVICE_WIDTH > 480 ? 480 : config.metrics.DEVICE_WIDTH - 50;

export default class ModalMessage extends React.Component {
  render() {
    console.log(boxWidth, "props");
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
                  paddingTop: 10,
                  paddingHorizontal: 15,
                  width: boxWidth
                }}
              >
                <Text style={styles.title}>
                  {this.props.title}
                </Text>
                <Text style={{ marginVertical: 30 }}>
                  {this.props.message}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "flex-end",
                    marginTop: 15
                  }}
                >
                  <Button transparent>
                    <Text>
                      {this.props.cancel}
                    </Text>
                  </Button>
                  <Button transparent>
                    <Text>
                      {this.props.ok}
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
  }
};
