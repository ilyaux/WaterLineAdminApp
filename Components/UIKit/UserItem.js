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
import { w } from "../SuportFiles//constanse";

export default class UserItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      icon: ""
    };
  }

  componentDidMount() {
    // this.loadimage();
  }

  //   loadimage = async () => {
  //     var firebaseConfig = {
  //       apiKey: "AIzaSyAzIFtcevzNUFk6Gdd7hnYXG3itAbO45ns",
  //       authDomain: "water-line-20d1d.firebaseapp.com",
  //       databaseURL: "https://water-line-20d1d.firebaseio.com",
  //       projectId: "water-line-20d1d",
  //       storageBucket: "water-line-20d1d.appspot.com",
  //       messagingSenderId: "221727334596",
  //       appId: "1:221727334596:web:f6dbcd6ae6ad8f97"
  //     };

  //     if (!firebase.apps.length) {
  //       firebase.initializeApp(firebaseConfig);
  //     }
  //     var ref = await firebase.storage().ref("Avatars/" + this.props.icon + ".png");
  //     return ref.getDownloadURL().then(url => {
  //       if (url !== null) {
  //         this.setState({
  //           image: url
  //         });
  //       }
  //     });
  //   };

  render() {
    return (
      <View style={styles.mainview}>
        <TouchableOpacity style={styles.mainbody} onPress={this.props.goNav}>
          <View style={styles.mainbody}>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Image
                  style={styles.imageview}
                  source={{
                    uri: this.props.Image
                  }}
                />
              </View>
              {this.props.OStatus === 1 ? (
                <View style={{ position: "relative", top: 20, right: 12 }}>
                  <View
                    style={{
                      backgroundColor: "#5fdba7",
                      width: 12,
                      height: 12,
                      borderRadius: 44 / 2
                    }}
                  />
                </View>
              ) : <View style={{ position: "relative", top: 20, right: 12 }}>
                  <View
                    style={{
                   
                      width: 12,
                      height: 12,
                      borderRadius: 44 / 2
                    }}
                  />
                </View>}
            </View>
            <View style={styles.textbody}>
              <Text style={styles.textview}>
                {this.props.Name} {this.props.Secondname}
              </Text>
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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  textview: {
    fontSize: 16,
    fontWeight: "bold"
  },
  imageview: {
    width: 32,
    height: 32,
    borderRadius: 100
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
