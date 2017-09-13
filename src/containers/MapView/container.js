import React from "react";
import { View } from "react-native";
import { MapView } from "expo";
import { Entypo } from "@expo/vector-icons";
import { Text, Fab, Button } from "native-base";

import AppComponent from "../../components/AppComponent";
import config from "../../config";

export default class MapViewContainer extends AppComponent {
  state = {
    fabActived: false
  };
  onFabPressed = location => {
    this.setState({ fabActived: false });
    this.props.changeStartLocation(location);
  };
  render() {
    const {
      initRegion,
      markerStart,
      markerEnd,
      legs,
      address,
      walkFromStart,
      walkToEnd
    } = this.props;
    const regionStart = new MapView.AnimatedRegion(markerStart.coordinate);
    const regionEnd = new MapView.AnimatedRegion(markerEnd.coordinate);
    return (
      <View style={{ flex: 1 }}>
        <MapView style={{ flex: 1 }} region={initRegion}>
          <MapView.Marker.Animated
            coordinate={regionStart}
            title={markerStart.title}
            pinColor={config.colors.PRIMARY}
            description={markerStart.desc}
          />
          <MapView.Marker.Animated
            coordinate={regionEnd}
            title={markerEnd.title}
            description={markerEnd.desc}
          />
          {legs.direction && (
            <MapView.Polyline
              coordinates={legs.direction}
              strokeWidth={5}
              strokeColor={config.colors.PRIMARY}
            />
          )}
          {walkFromStart && (
            <MapView.Polyline
              coordinates={walkFromStart}
              strokeWidth={5}
              strokeColor="rgba(0,0,0,0.1)"
            />
          )}
          {walkToEnd && (
            <MapView.Polyline
              coordinates={walkToEnd}
              strokeWidth={5}
              strokeColor="rgba(0,0,0,0.1)"
            />
          )}
        </MapView>
        <Fab
          active={this.state.fabActived}
          direction="up"
          containerStyle={{
            bottom: 110
          }}
          position="bottomRight"
          onPress={() => this.setState({ fabActived: !this.state.fabActived })}
        >
          <Entypo name="direction" size={24} color={"white"} />
          <Button
            style={{ backgroundColor: config.colors.PRIMARY }}
            onPress={() => this.onFabPressed(config.mapview.COORDINATE_HOME)}
          >
            <Entypo name={"home"} size={18} color={"white"} />
          </Button>
          <Button
            style={{ backgroundColor: "#DD5144" }}
            onPress={() => this.onFabPressed(config.mapview.COORDINATE_COMPANY)}
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
              <Entypo name={markerStart.icon} size={20} color="white" />
              <Text style={{ color: "white" }}> {markerStart.title}</Text>
            </View>
            <View style={{ marginLeft: 3, marginVertical: 5 }}>
              <Entypo name="dots-three-vertical" size={14} color="white" />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Entypo name={markerEnd.icon} size={20} color="white" />
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
              {legs.distance}
            </Text>
            <Text note style={{ color: "white" }}>
              {legs.duration}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
