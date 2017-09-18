import React from "react";
import { Location, Permissions } from "expo";
import axios from "axios";
import { Container, Spinner } from "native-base";
import Polyline from "@mapbox/polyline";

import AppComponent from "../../components/AppComponent";
import AppHeader from "../../components/AppHeader";
import ModalMessage from "../../components/ModalMessage";
import config from "../../config";

import MapViewContainer from "./container";

export default class OrderMapView extends AppComponent {
  constructor(props) {
    super(props);

    this.state = {
      locationStart: config.mapview.COORDINATE_HOME,
      iconStart: "home",
      titleStart: "Nhà riêng",
      coordinateEnd: {}, //lat,long diem cuoi
      direction: null,
      distance: null,
      duration: null,
      walkFromStart: [], //di bo tu diem dau
      walkToEnd: [], //di bo tu toi diem cuoi
      hasError: false,
      errorMessage: null,
      goBack: false
    };
  }
  componentWillMount() {
    this.getLocation(encodeURI(this.props.navigation.state.params.addressFull));
    // const address = this.props.navigation.params;
  }

  getLocation = async address => {
    const googleApi = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&language=vi&key=${config
      .mapview.KEY.WEB_SERVICE}`;
    await axios
      .get(googleApi)
      .then(response => {
        let errorMessage = null;
        switch (response.data.status) {
          case "ZERO_RESULTS":
            errorMessage = "Không tìm thấy địa chỉ này trên bản đồ";
            break;
          case "REQUEST_DENIED":
            errorMessage = response.data.error_message;
            break;
          default:
            break;
        }
        if (errorMessage !== null) {
          this.setState({
            hasError: true,
            errorMessage,
            goBack: false
          });
        } else {
          const location = response.data.results
            ? response.data.results[0].geometry.location
            : null;
          const coordinateEnd = {
            longitude: location.lng,
            latitude: location.lat
          };
          if (location) {
            this.setState({ coordinateEnd });
            this.getDirections(this.state.locationStart, coordinateEnd);
          }
        }
      })
      .catch(e => {
        this.logThis(e);
      });
  };

  async getDirections(locationStart, coordinateEnd) {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${locationStart.latitude},${locationStart.longitude}&language=vi&destination=${coordinateEnd.latitude},${coordinateEnd.longitude}&key=${config
      .mapview.KEY.WEB_SERVICE}`;
    try {
      await axios
        .get(url)
        .then(resp => {
          const routes = resp.data.routes[0];
          if (routes) {
            const points = Polyline.decode(routes.overview_polyline.points);

            if (points.length > 0) {
              const fp = { latitude: points[0][0], longitude: points[0][1] };
              const walkFromStart = [];
              walkFromStart.push(this.state.locationStart);
              walkFromStart.push(fp);
              this.setState({ walkFromStart });
              if (points.length > 1) {
                const walkToEnd = [];
                const last = {
                  latitude: points[points.length - 1][0],
                  longitude: points[points.length - 1][1]
                };
                walkToEnd.push(coordinateEnd);
                walkToEnd.push(last);
                this.setState({ walkToEnd });
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
      this.logThis(error);
    }
  }

  onCurrentLocation = () => {
    this._getLocationAsync();
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
      this.changeStartLocation(currentCoordinate);
    }
  };

  changeStartLocation = locationStart => {
    if (locationStart !== this.state.locationStart) {
      let iconStart = "home";
      let titleStart = this.state.titleStart;
      if (locationStart === config.mapview.COORDINATE_COMPANY) {
        iconStart = "briefcase";
        titleStart = "Go Solutions Jsc";
      } else if (locationStart !== config.mapview.COORDINATE_HOME) {
        iconStart = "location-pin";
        titleStart = "Địa điểm hiện tại";
      }
      this.setState({ locationStart, iconStart, titleStart }, () =>
        this.getDirections(locationStart, this.state.coordinateEnd)
      );
    }
  };

  preSearchLocation = location => {
    this.setState({ hasError: false });
    this.getLocation(location);
  };

  render() {
    const {
      address,
      name,
      note,
      addressFull
    } = this.props.navigation.state.params;
    let view;
    if (
      !this.state.coordinateEnd.latitude ||
      !this.state.coordinateEnd.longitude
    ) {
      view = <Spinner />;
    } else {
      //props to mapview
      const propsMapView = {
        initRegion: {
          latitude: this.state.locationStart.latitude,
          longitude: this.state.locationStart.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.05
        },
        markerStart: {
          coordinate: this.state.locationStart,
          title: this.state.titleStart,
          desc: "Điểm giao hàng",
          icon: this.state.iconStart
        },
        markerEnd: {
          coordinate: this.state.coordinateEnd,
          title: "Điểm nhận hàng",
          desc: note,
          icon: "location"
        },
        legs: {
          direction: this.state.direction,
          distance: this.state.distance,
          duration: this.state.duration
        },
        address,
        walkFromStart: this.state.walkFromStart,
        walkToEnd: this.state.walkToEnd,
        changeStartLocation: this.changeStartLocation
      };
      view = <MapViewContainer {...propsMapView} />;
    }

    return (
      <Container>
        <ModalMessage
          visible={this.state.hasError}
          message={this.state.errorMessage}
          icon={"error"}
          action={[
            {
              text: "Quay lại",
              type: "cancel",
              onPress: () => this.props.navigation.goBack()
            }
          ]}
          editable={
            this.state.goBack ? null : (
              {
                text: "Tìm lại",
                inputValue: addressFull,
                onPress: this.preSearchLocation
              }
            )
          }
        />
        <AppHeader title={name} subTitle={address} {...this.props} />
        {view}
      </Container>
    );
  }
}
