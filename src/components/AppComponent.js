import React, { Component } from "react";
import { View, Alert } from "react-native";
import { Container, Text, Button, Body, Spinner, Thumbnail } from "native-base";
import { Grid, Row } from "react-native-easy-grid";
// import { NavigationActions } from "react-navigation";
import config from "../config";
import { consoleLog } from "./AppLog";

export default class AppComponent extends Component {
  logThis = (str1, str2) => {
    consoleLog(str1, str2);
  };

  screenIsReady = propsData => {
    return (
      propsData &&
      (propsData.status !== undefined ||
        propsData.error ||
        propsData.networkError)
    );
  };

  handleRender = (isLoading, propsData, callback, header, page = 1) => {
    // console.log(propsData, "AppComponent");
    let view = null;
    if (isLoading) {
      view = this.renderLoading(header);
    } else if (propsData.empty && page === 1) {
      view = this.renderNoData(
        propsData.message,
        callback,
        header,
        config.images.emptyCart
      );
    } else if (propsData.error) {
      view = this.renderApiError(propsData.message, callback, header);
    } else if (propsData.networkError) {
      view = this.renderNetworkError(callback, header);
    }
    return view;
  };
  renderLoading = header =>
    <Container>
      {header}
      <View style={config.styles.view.middleContent}>
        <Grid style={config.styles.grid.center}>
          <Row />
          <Row>
            <View>
              <Body>
                <Spinner />
                <Text />
                <Text>
                  {config.message.loading}
                </Text>
              </Body>
            </View>
          </Row>
          <Row />
        </Grid>
      </View>
    </Container>;

  renderNoData = (message, callback, header, image = config.images.noData) => {
    // consoleLog("noDATA", this);
    const callbackBtn = callback
      ? <Button block transparent onPress={callback}>
          <Text primary style={config.styles.text.tryAgain}>
            {config.message.try_again}
          </Text>
        </Button>
      : null;
    return (
      <Container>
        {header}
        <View style={config.styles.view.middleContent}>
          <Grid style={config.styles.grid.center}>
            <Row />
            <Row>
              <View>
                <Body>
                  <Thumbnail square source={image} />
                  <Text />
                  <Text>
                    {message}
                  </Text>
                  <Text />
                  {callbackBtn}
                </Body>
              </View>
            </Row>
            <Row />
          </Grid>
        </View>
      </Container>
    );
  };

  /**
   * header
   * refreshCallback: call back while click tryAgain
   * 
   * @memberof AppComponent
   */
  renderNetworkError = (
    callback,
    header,
    image = config.images.noConnection
  ) => {
    // consoleLog("network error", callback);
    const callbackBtn = callback
      ? <Button block transparent onPress={callback}>
          {/* <Icon name="refresh" style={{ fontSize: 12 }} /> */}
          <Text primary style={config.styles.text.tryAgain}>
            {config.message.try_again}
          </Text>
        </Button>
      : null;

    return (
      <Container>
        {header}
        <View style={config.styles.view.middleContent}>
          <Grid style={config.styles.grid.center}>
            <Row />
            <Row>
              <View>
                <Body>
                  <Thumbnail source={image} />
                  <Text />
                  <Text style={config.styles.text.center}>
                    {config.message.network_error}
                  </Text>
                  {callbackBtn}
                </Body>
              </View>
            </Row>
            <Row />
          </Grid>
        </View>
      </Container>
    );
  };

  renderApiError = (message, callback, header, image = config.images.error) => {
    // consoleLog("network error", callback);
    const callbackBtn = callback
      ? <Button block transparent onPress={callback}>
          <Text primary style={config.styles.text.tryAgain}>
            {config.message.try_again}
          </Text>
        </Button>
      : null;

    return (
      <Container>
        {header}
        <View style={config.styles.view.middleContent}>
          <Grid style={config.styles.grid.center}>
            <Row />
            <Row>
              <View>
                <Body>
                  <Thumbnail square source={image} />
                  {/* <Icon primary name="sad" /> */}
                  <Text />
                  <Text style={config.styles.text.center}>
                    {message !== null ? message : config.message.network_error}
                  </Text>
                  {callbackBtn}
                </Body>
              </View>
            </Row>
            <Row />
          </Grid>
        </View>
      </Container>
    );
  };

  renderApiResultAlert = (title, message, callback) =>
    Alert.alert(title, message, [{ text: "Đồng ý", onPress: callback }], {
      cancelable: false
    });

  renderApiErrorAlert = (message, callback) => {
    this.renderApiResultAlert("Lỗi", message, callback);
  };
}
