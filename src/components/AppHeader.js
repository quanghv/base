import React from "react";
import { Header, Body, Button, Icon, Title, Text, Right } from "native-base";
import Moment from "moment";
// import AppDatePicker from "../components/AppDatePicker";
import config from "../config";

export default class AppHeader extends React.Component {
  state = {
    date: Moment().format("YYYY-MM-DD")
  };
  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.dateXinNghi && nextProps.dateXinNghi.date) ||
      (nextProps.nhanXetNgayDateReducer &&
        nextProps.nhanXetNgayDateReducer.date)
    ) {
      this.setState({
        date: nextProps.dateXinNghi
          ? nextProps.dateXinNghi.date
          : nextProps.nhanXetNgayDateReducer.date
      });
    }
  }

  goBack = () => {
    let action = () => this.props.navigation.goBack();
    if (this.props.callbackOnGoBack) {
      action = () => {
        this.props.callbackOnGoBack();
        this.props.navigation.goBack();
      };
    }
    // consol
    return (
      <Button transparent onPress={action}>
        <Icon name={this.props.icon ? this.props.icon : "arrow-back"} />
      </Button>
    );
  };

  // renderCalendar = (maxDate, dispatchType, index) => {
  //   return (
  //     <Button transparent key={index}>
  //       <AppDatePicker
  //         style={{ width: 26 }}
  //         date={Moment(this.state.date).format("YYYY-MM-DD")}
  //         mode="date"
  //         format="YYYY-MM-DD"
  //         minDate="2016-09-01"
  //         maxDate={maxDate}
  //         confirmBtnText={getLang(lang.label_ok, this.state.language)}
  //         cancelBtnText={getLang(lang.label_cancel, this.state.language)}
  //         hideText={true}
  //         timeZoneOffsetInMinutes={7 * 60}
  //         language={this.props.navigation.state.params.language}
  //         customStyles={{
  //           dateIcon: { position: "absolute", left: 0, top: 4, marginLeft: 0 },
  //           dateInput: { marginLeft: 0 }
  //         }}
  //         onDateChange={date =>
  //           this.props.dispatchParams
  //             ? this.props.dispatchParams({ date }, dispatchType)
  //             : {}}
  //       />
  //     </Button>
  //   );
  // };

  render() {
    let view = null;

    let rightButton = null;
    if (this.props.rightIcons) {
      rightButton = (
        <Right>
          {this.props.rightIcons.map((value, index) => {
            switch (value.name) {
              case "funnel":
                return this.renderFilter(value.name, value.dispatchType, index);
              case "calendar":
                return this.renderCalendar(
                  value.maxDate,
                  value.dispatchType,
                  index
                );
              case "call":
                return (
                  <Button transparent key={index} onPress={value.callback}>
                    <Text>GỌI</Text>
                  </Button>
                );
              default:
                return (
                  <Button transparent key={index}>
                    <Icon name={value.name} statusBar />
                  </Button>
                );
            }
          })}
        </Right>
      );
    }

    if (this.props.isHome === "true") {
      view = (
        <Header>
          <Button
            transparent
            onPress={() =>
              this.props.navigation.navigate("DrawerOpen", {
                openDrawer: true
              })}
          >
            <Icon name="menu" statusBar />
          </Button>
          <Body>
            <Title>
              {this.props.title
                ? this.props.title
                : Moment(this.state.date).format("DD/MM/YYYY")}
            </Title>
          </Body>
          {rightButton}
        </Header>
      );
    } else {
      let title = null;
      if (this.props.subTitle) {
        title = (
          <Body>
            <Text note style={config.styles.header.title}>
              {this.props.title}
            </Text>
            <Title>
              {this.props.subTitle}
            </Title>
          </Body>
        );
      } else if (this.props.title) {
        title = (
          <Body>
            <Title>
              {this.props.title}
            </Title>
          </Body>
        );
      } else {
        title = <Body />;
      }
      view = (
        <Header>
          {this.goBack()}
          {title}
          {rightButton}
        </Header>
      );
    }

    return view;
  }
}
