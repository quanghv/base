import React from "react";
import { MapView } from "expo";
import axios from "axios";
import { Container, Spinner } from "native-base";

import AppComponent from "../../components/AppComponent";
import AppHeader from "../../components/AppHeader";
import Polyline from "@mapbox/polyline";

const apiKey = "AIzaSyBHB4mBHbrepYAOXTbI68WfA1P2jwX5btg";

export default class OrderMapView extends AppComponent {
  constructor(props) {
    super(props);

    this.state = {
      long: null,
      lat: null,
      direction: null
    };
  }
  componentWillMount() {
    const googleApi = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
      this.props.navigation.state.params.addressFull
    )}&key=${apiKey}`;
    axios
      .get(googleApi)
      .then(response => {
        const location = response.data.results
          ? response.data.results[0].geometry.location
          : null;
        if (location) {
          this.setState({
            long: location.lng,
            lat: location.lat
          });

          this.getDirections(
            "20.9643519,105.7954345",
            `${location.lat},${location.lng}`
          );
        }
      })
      .catch(e => {
        this.logThis(e);
      });
    // const address = this.props.navigation.params;
  }

  async getDirections(startLoc, destinationLoc) {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${apiKey}`;
    this.logThis(url, "urlDirection");
    try {
      await axios
        .get(url)
        .then(resp => {
          this.logThis(resp, "googleDirection");
          const points = Polyline.decode(
            resp.data.routes[0].overview_polyline.points
          );
          const coords = points.map(point => ({
            latitude: point[0],
            longitude: point[1]
          }));
          this.setState({ direction: coords });
        })
        .catch(e => {
          this.logThis(e);
        });
    } catch (error) {
      return error;
    }
  }

  render() {
    const { address, name, note } = this.props.navigation.state.params;
    let view;
    if (!this.state.long || !this.state.lat) {
      view = <Spinner />;
    } else {
      this.logThis(this.state);
      const coordinate = new MapView.AnimatedRegion({
        latitude: this.state.lat,
        longitude: this.state.long
      });
      const home = new MapView.AnimatedRegion({
        latitude: 20.9643519,
        longitude: 105.7954345
      });
      view = (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: this.state.lat,
            longitude: this.state.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <MapView.Marker.Animated
            coordinate={home}
            title={"Nhà riêng"}
            description={"M-SHOP.VN"}
          />
          <MapView.Marker.Animated
            coordinate={coordinate}
            title={address}
            description={note}
          />
          {this.state.direction && (
            <MapView.Polyline
              coordinates={this.state.direction}
              strokeWidth={3}
              strokeColor="red"
            />
          )}
        </MapView>
      );
    }

    return (
      <Container>
        <AppHeader title={name} subTitle={address} {...this.props} />
        {view}
      </Container>
    );
  }
}
