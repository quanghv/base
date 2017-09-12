import React from "react";
import { View } from "react-native";
import { MapView, Location, Permissions } from "expo";
import axios from "axios";
import { Container, Spinner, Text, Fab, Button } from "native-base";
import Polyline from "@mapbox/polyline";
import { Entypo } from "@expo/vector-icons";

import AppComponent from "../../components/AppComponent";
import AppHeader from "../../components/AppHeader";
import ModalMessage from "../../components/ModalMessage";
import config from "../../config";

const apiKey = "AIzaSyBHB4mBHbrepYAOXTbI68WfA1P2jwX5btg";
const coordinateHome = {
  latitude: 20.964586,
  longitude: 105.795023
};
const coordinateCompany = {
  latitude: 21.046806,
  longitude: 105.76529
};

export default class OrderMapView extends AppComponent {
  constructor(props) {
    super(props);

    this.state = {
      locationStart: coordinateHome,
      iconStart: "home",
      titleStart: "Nhà riêng",
      fabActived: false,
      marker: {},
      direction: null,
      distance: null,
      duration: null,
      firstPoint: [],
      lastPoint: [],
      hasError: false,
      errorMessage: null,
      goBack: false
    };
  }
  componentWillMount() {
    const googleApi = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
      this.props.navigation.state.params.addressFull
    )}&language=vi&key=${apiKey}`;
    axios
      .get(googleApi)
      .then(response => {
        if (response.data.status === "ZERO_RESULTS") {
          this.setState({
            hasError: true,
            errorMessage: "Không tìm thấy địa chỉ này trên bản đồ",
            goBack: false
          });
        } else {
          const location = response.data.results
            ? response.data.results[0].geometry.location
            : null;
          const marker = { longitude: location.lng, latitude: location.lat };
          if (location) {
            this.setState({ marker });
            this.getDirections(coordinateHome, marker);
          }
        }
      })
      .catch(e => {
        this.logThis(e);
      });
    // const address = this.props.navigation.params;
  }

  async getDirections(locationStart, marker) {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${locationStart.latitude},${locationStart.longitude}&language=vi&destination=${marker.latitude},${marker.longitude}&key=${apiKey}`;
    // this.logThis(url, "urlDirection");
    try {
      await axios
        .get(url)
        .then(resp => {
          //   this.logThis(resp, "googleDirection");
          const routes = resp.data.routes[0];
          if (routes) {
            const points = Polyline.decode(routes.overview_polyline.points);

            if (points.length > 0) {
              const fp = { latitude: points[0][0], longitude: points[0][1] };
              const firstPoint = [];
              firstPoint.push(this.state.locationStart);
              firstPoint.push(fp);
              this.setState({ firstPoint });
              if (points.length > 1) {
                const lastPoint = [];
                const last = {
                  latitude: points[points.length - 1][0],
                  longitude: points[points.length - 1][1]
                };
                lastPoint.push(marker);
                lastPoint.push(last);
                this.setState({ lastPoint });
              }
            }

            const legs = routes.legs[0];
            if (legs) {
              this.setState({
                distance: legs.distance.text,
                duration: legs.duration.text
              });
            }

            const coords = points.map(point => ({
              latitude: point[0],
              longitude: point[1]
            }));
            this.setState({ direction: coords });
          }
        })
        .catch(e => {
          this.logThis(e);
        });
    } catch (error) {
      return error;
    }
  }

  onCurrentLocation = () => {
    // if (Platform.OS === "android" && !Constants.isDevice) {
    //   this.setState({
    //     errorMessage:
    //       "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
    //   });
    // } else {
    this._getLocationAsync();
    // }
  };

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        hasError: true,
        errorMessage: "Ứng dụng chưa có quyền truy cập Location",
        goBack: true
      });
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    if (currentLocation) {
      const currentCoordinate = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude
      };
      this.changeStart(currentCoordinate);
      //   console.log(currentLocation, "currentLocation");
      // this.setState({ location });
    }
  };

  changeStart = locationStart => {
    if (locationStart !== this.state.locationStart) {
      let iconStart = "home";
      let titleStart = this.state.titleStart;
      if (locationStart === coordinateCompany) {
        iconStart = "briefcase";
        titleStart = "Go Solutions Jsc";
      } else if (locationStart !== coordinateHome) {
        iconStart = "location-pin";
        titleStart = "Địa điểm hiện tại";
      }
      this.setState(
        { locationStart, fabActived: false, iconStart, titleStart },
        () => this.getDirections(locationStart, this.state.marker)
      );
    }
  };

  render() {
    const { address, name, note } = this.props.navigation.state.params;
    let view;
    if (!this.state.marker.latitude || !this.state.marker.longitude) {
      view = <Spinner />;
    } else {
      //   this.logThis(this.state);
      const coordinateMarker = new MapView.AnimatedRegion(this.state.marker);
      const home = new MapView.AnimatedRegion(this.state.locationStart);
      view = (
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: this.state.locationStart.latitude,
            longitude: this.state.locationStart.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.05
          }}
        >
          <MapView.Marker.Animated
            coordinate={home}
            title={this.state.titleStart}
            pinColor={config.colors.PRIMARY}
            description={"Điểm giao hàng"}
          />
          <MapView.Marker.Animated
            coordinate={coordinateMarker}
            title={address}
            description={note}
          />
          {this.state.direction && (
            <MapView.Polyline
              coordinates={this.state.direction}
              strokeWidth={5}
              strokeColor={config.colors.PRIMARY}
            />
          )}
          {this.state.firstPoint && (
            <MapView.Polyline
              coordinates={this.state.firstPoint}
              strokeWidth={5}
              strokeColor="rgba(0,0,0,0.1)"
            />
          )}
          {this.state.lastPoint && (
            <MapView.Polyline
              coordinates={this.state.lastPoint}
              strokeWidth={5}
              strokeColor="rgba(0,0,0,0.1)"
            />
          )}
        </MapView>
      );
    }

    return (
      <Container>
        <ModalMessage
          visible={this.state.hasError}
          message={this.state.errorMessage}
          icon={"error"}
          action={[
            {
              text: "Đồng ý",
              onPress: () => this.props.navigation.goBack()
            },
            this.state.goBack
              ? null
              : { text: "Sửa địa chỉ", onPress: () => {}, type: "danger" }
          ]}
        />
        <AppHeader title={name} subTitle={address} {...this.props} />
        {view}
        {this.state.marker.latitude &&
        this.state.marker.longitude && (
          <View>
            <Fab
              active={this.state.fabActived}
              direction="up"
              containerStyle={{
                bottom: 110
              }}
              position="bottomRight"
              onPress={() =>
                this.setState({ fabActived: !this.state.fabActived })}
            >
              <Entypo name="direction" size={24} color={"white"} />
              <Button
                style={{ backgroundColor: config.colors.PRIMARY }}
                onPress={() => this.changeStart(coordinateHome)}
              >
                <Entypo name={"home"} size={18} color={"white"} />
              </Button>
              <Button
                style={{ backgroundColor: "#DD5144" }}
                onPress={() => this.changeStart(coordinateCompany)}
              >
                <Entypo name="briefcase" size={18} color={"white"} />
              </Button>
              <Button
                style={{ backgroundColor: config.colors.PLACEHOLDER }}
                onPress={this.onCurrentLocation}
              >
                <Entypo name="location-pin" size={24} color={"white"} />
              </Button>
            </Fab>
            <View
              style={{
                position: "absolute",
                bottom: 10,
                left: 5,
                right: 5,
                backgroundColor: config.colors.PRIMARY,
                paddingLeft: 10,
                paddingVertical: 10,
                paddingRight: 40
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  <Entypo name={this.state.iconStart} size={20} color="white" />
                  <Text style={{ color: "white" }}>
                    {" "}
                    {this.state.titleStart}
                  </Text>
                </View>
                <View style={{ marginLeft: 3, marginVertical: 5 }}>
                  <Entypo name="dots-three-vertical" size={14} color="white" />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Entypo name="location" size={20} color="white" />
                  <Text style={{ color: "white" }}> {address}</Text>
                </View>
              </View>
              <View
                style={{
                  position: "absolute",
                  right: 20,
                  top: 25,
                  bottom: 5
                }}
              >
                <Text note style={{ color: "white" }}>
                  {this.state.distance}
                </Text>
                <Text note style={{ color: "white" }}>
                  {this.state.duration}
                </Text>
              </View>
            </View>
          </View>
        )}
      </Container>
    );
  }
}
