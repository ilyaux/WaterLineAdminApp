import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "firebase";

export default class NavFactory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      icon: ""
    };
  }

  render() {
    return (
      <View style={styles.mainview}>
        <TouchableOpacity style={styles.mainbody} onPress={this.props.goNav}>
          <View style={styles.mainbody}>
            <View>
              {/* <Image
                style={styles.imageview}
                source={{
                  uri: this.state.image
                }}
              /> */}
            </View>
            <View style={styles.textbody}>
              <Text style={styles.textview}> {this.props.nName} </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainview: {
    paddingHorizontal: 16,
    height: 70,
    justifyContent: "center",
    marginBottom:16,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginHorizontal: 16
  },
  textview: {
    fontSize: 16,
    fontWeight: "bold"
  },
  imageview: {
    width: 28,
    height: 28
  },
  mainbody: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  textbody: {
    marginLeft: 16
  }
});
