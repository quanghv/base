import React from "react";
import { View } from "react-native";
import {
  Container,
  Content,
  Text,
  Spinner,
  Button,
  Card,
  Body
} from "native-base";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { postToServer } from "../../actions";
import AppHeader from "../../components/AppHeader";
import AppComponent from "../../components/AppComponent";
import FieldInput from "../../components/FieldInput";
import ModalMessage from "../../components/ModalMessage";
import { getUrlFromType } from "../../config/actionTypes";
import config from "../../config";

class ChangePass extends AppComponent {
  state = {
    isLoading: false,
    showMessage: false,
    message: null,
    iconMsg: "error"
  };

  /**
   * submit form change password
   * 
   * @param {any} values 
   * @memberof ChangePass
   */
  async submit(values) {
    this.setState({ isLoading: true, showMessage: false });
    const data = {
      account_id: this.props.accountInfo[config.storages.ACCOUNT_ID],
      password_current: values.password,
      password: values.passwordnew
    };
    try {
      await postToServer(
        getUrlFromType(config.actionTypes.CHANGE_PASS),
        data
      ).then(response => {
        // this.logThis(response, "postToServer");
        if (response.data) {
          const iconType = response.data.status <= 0 ? "error" : "success";
          this.setState({
            showMessage: true,
            message: response.data.data.userMessage,
            iconMsg: iconType
          });
        } else {
          this.setState({
            showMessage: true,
            message: config.message.network_error,
            iconMsg: "error"
          });
        }
      });
    } catch (e) {
      this.logThis(e);
    }
  }

  render() {
    const header = <AppHeader title={"Đổi mật khẩu"} {...this.props} />;

    let renderView;
    if (this.state.isLoading) {
      renderView = (
        <View style={{ marginTop: 50 }}>
          <Spinner />
        </View>
      );
    } else {
      renderView = (
        <Content padder>
          <Card style={{ backgroundColor: "white", padding: 0 }}>
            <Body>
              <Field
                withRef
                name="password"
                ref={c => (this.cPassInputRef = c)}
                keyboardType="numeric"
                returnKeyType="next"
                returnKeyLabel="TIẾP"
                refF={"cPassInputRef"}
                component={FieldInput}
                onEnter={() =>
                  this.newPassInputRef
                    .getRenderedComponent()
                    .refs.newPassInputRef._root.focus()}
                style={{ paddingLeft: 15 }}
                label="Mật khẩu hiện tại"
                secureTextEntry
              />
              <Field
                withRef
                ref={ref => (this.newPassInputRef = ref)}
                refF={"newPassInputRef"}
                name="passwordnew"
                component={FieldInput}
                label="Mật khẩu mới"
                keyboardType="numeric"
                returnKeyType="done"
                returnKeyLabel="TIẾP"
                onEnter={() =>
                  this.reNewPassInputRef
                    .getRenderedComponent()
                    .refs.reNewPassInputRef._root.focus()}
                secureTextEntry
                style={{ paddingLeft: 15 }}
              />
              <Field
                withRef
                ref={ref => (this.reNewPassInputRef = ref)}
                refF={"reNewPassInputRef"}
                name="passwordnewrepeat"
                component={FieldInput}
                label="Nhập lại mật khẩu mới"
                keyboardType="numeric"
                returnKeyType="done"
                returnKeyLabel="XONG"
                style={{ paddingLeft: 15 }}
                onEnter={this.props.handleSubmit(this.submit.bind(this))}
                secureTextEntry
              />
            </Body>
          </Card>

          <Button
            block
            primary
            style={{ marginTop: 10 }}
            onPress={this.props.handleSubmit(this.submit.bind(this))}
          >
            <Text>Cập nhật</Text>
          </Button>
          <Button
            bordered
            block
            style={{
              marginTop: 10,
              backgroundColor: "#ffffff",
              borderColor: "#ccc"
            }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={{ color: "black" }}>Hủy</Text>
          </Button>
        </Content>
      );
    }

    return (
      <Container>
        {header}
        <ModalMessage
          visible={this.state.showMessage}
          message={this.state.message}
          icon={this.state.iconMsg}
          action={[
            {
              text: "Đồng ý",
              onPress: () => {
                this.setState({ showMessage: false, isLoading: false });
                this.props.navigation.goBack();
              }
            }
          ]}
        />
        <Content
          style={{ backgroundColor: "#f0f0f0" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={config.styles.loginView}>
            <View style={config.styles.viewLogo}>{renderView}</View>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  accountInfo: state.accountReducer.data
});

export default reduxForm({
  form: "changePassForm",
  validate: values => {
    const error = {};
    error.password = "";
    error.passwordnew = "";
    error.passwordnewrepeat = "";
    let passwordnew = values.passwordnew;
    if (values.passwordnew === undefined) {
      passwordnew = "";
    }
    if (!values.passwordnew) {
      error.passwordnew = "Chưa nhập";
    }
    if (values.passwordnew === values.password) {
      error.passwordnew = "Không thay đổi";
    }
    if (values.passwordnewrepeat !== values.passwordnew) {
      error.passwordnewrepeat = "Mật khẩu nhập lại không giống";
    }
    if (!values.password) {
      error.password = "Chưa nhập";
    }
    if (passwordnew.length < 6 && passwordnew !== "") {
      error.passwordnew = "Quá ngắn";
    }
    return error;
  }
})(connect(mapStateToProps)(ChangePass));
