import React, { Component } from "react";
import { View } from "react-native";
import { Container, Text, Button, Body, Icon, Spinner } from "native-base";
import { Grid, Row } from "react-native-easy-grid";
import styles from "../config/styles";
import { consoleLog } from "./AppLog";

export default class AppComponent extends Component {
  renderLoading = header =>
    <Container>
      {header}
      <View style={styles.viewMiddle}>
        <Grid style={styles.gridCenter}>
          <Row />
          <Row>
            <View>
              <Body>
                <Spinner />
                <Text />
                <Text>Đang tải dữ liệu...</Text>
              </Body>
            </View>
          </Row>
          <Row />
        </Grid>
      </View>
    </Container>;

  renderNoData = header => {
    consoleLog("noDATA", this);
    return (
      <Container>
        {header}
        <View style={styles.viewMiddle}>
          <Grid style={styles.gridCenter}>
            <Row />
            <Row>
              <View>
                <Body>
                  <Icon primary name="cart" />
                  <Text />
                  <Text>Chưa có đơn hàng</Text>
                  <Text />
                  <Button
                    small
                    transparent
                    onPress={() => this.handleRefresh()}
                  >
                    {/*<Icon name="refresh" style={styles.tryAgain} />*/}
                    <Text style={styles.textTryAgain}>Nhấn để thử lại</Text>
                  </Button>
                </Body>
              </View>
            </Row>
            <Row />
          </Grid>
        </View>
      </Container>
    );
  };

  renderNetworkError = header => {
    consoleLog("network error");
    return (
      <Container>
        {header}
        <View style={styles.viewMiddle}>
          <Grid style={styles.gridCenter}>
            <Row />
            <Row>
              <View>
                <Body>
                  <Icon primary name="sad" />
                  <Text />
                  <Text>Lỗi khi tải dữ liệu</Text>
                  <Button transparent onPress={() => this.handleRefresh()}>
                    <Icon name="refresh" style={{ fontSize: 12 }} />
                    <Text primary style={styles.textTryAgain}>
                      Nhấn để thử lại
                    </Text>
                  </Button>
                </Body>
              </View>
            </Row>
            <Row />
          </Grid>
        </View>
      </Container>
    );
  };
}
