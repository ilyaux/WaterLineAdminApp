import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderCr  } from "../../UIKit/";
import { CREATEPAGE } from "../../SuportFiles/routes";
import { mColor, tColor, w, h } from "../../SuportFiles/constanse";
import MapboxGL from "@mapbox/react-native-mapbox-gl";

MapboxGL.setAccessToken(
  "pk.eyJ1IjoiaWx5YWthcml0c2tpeSIsImEiOiJjank2ZWRwa2MwMDFzM2VsY2RrcnNqYWU1In0.sJSsrP_0ZpZvm--CfMPNDg"
);

export default class MapPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { lat, long, name  , rn} = this.props.navigation.state.params;
    return (
      <View style={styles.maneview}>
        <View>
          <HeaderCr 
            title={name}
            onPress={() => this.props.navigation.navigate(rn)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <MapboxGL.MapView
            styleURL={MapboxGL.StyleURL.Street}
            zoomLevel={15}
            centerCoordinate={[long, lat]}
            style={styles.maneview}
          >
            <MapboxGL.PointAnnotation id={name} coordinate={[long, lat]} />
          </MapboxGL.MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  maneview: {
    flex: 1,
    backgroundColor: tColor,
    height: h,
    width: w
  }
});
