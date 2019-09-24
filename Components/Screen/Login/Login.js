import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { mColor, sColor, w, h } from "../../SuportFiles/constanse";
import { Button } from "../../UIKit/";
import { HOMEPAGE } from "../../SuportFiles/routes";
import firebase from "firebase";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Font } from "expo";

async function getLocationAsync() {
  // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
  const { status, permissions } = await Permissions.askAsync(
    Permissions.LOCATION
  );
  if (status === "granted") {
    return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
  } else {
    throw new Error("Location permission not granted");
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Login: "IKaritskiy",
      Password: "ik410509ad",
      data: []
    };
  }

  componentDidMount() {
    
    getLocationAsync();
    this.AuthSession()
    this.loadfont()
  }

  loadfont = async() => {

    await Font.loadAsync({
      "FredokaOne": require("../../../assets/fonts/FredokaOne.ttf")
    });

    

  }

  render() {
    return (
      <View style={styles.mainview}>
        <KeyboardAvoidingView behavior="padding" style={styles.buttonview}>
          <View style={styles.textview}>
           <Image style={{ height: 184.96 , width: 300 }} source={require("../../../assets/mainlogo.png")}/>
          </View>

          <View style={{ marginBottom: 16 }}>
            <View>
              <TextInput
                autoCapitalize="none"
                keyboardAppearance="light"
                style={[styles.textinput]}
                onSubmitEditing={() => this.passwordInput.focus()}
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                value={this.state.Login}
                placeholder="Логин"
                placeholderTextColor="#CCCCCC"
                textColor={mColor}
                onChangeText={Login => this.setState({ Login })}
              />
            </View>
            <View>
              <TextInput
                returnKeyType="go"
                ref={input => (this.passwordInput = input)}
                keyboardAppearance="light"
                style={[styles.textinput]}
                secureTextEntry={true}
                autoComplete="password"
                value={this.state.Password}
                placeholder="Пароль"
                placeholderTextColor="#ccc"
                textColor={mColor}
                onChangeText={Password => this.setState({ Password })}
              />
            </View>
          </View>

          <View>
            <Button ButtonText="Войти" Auth={() => this.AuthSession()} />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  AuthSession = async () => {
    console.log("AUTH START");
    var firebaseConfig = {
      apiKey: "AIzaSyAzIFtcevzNUFk6Gdd7hnYXG3itAbO45ns",
      authDomain: "water-line-20d1d.firebaseapp.com",
      databaseURL: "https://water-line-20d1d.firebaseio.com",
      projectId: "water-line-20d1d",
      storageBucket: "water-line-20d1d.appspot.com",
      messagingSenderId: "221727334596",
      appId: "1:221727334596:web:f6dbcd6ae6ad8f97"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    let login = this.state.Login;
    let password = this.state.Password;

    if (login !== null) {
      console.log("LOGIN NOT NULL");
      await firebase
        .database()
        .ref("/Admins/" + login + "/authdata/")
        .once("value", data => {
          if (data !== null) {
            console.log("DATA NOT NULL");
            var res = Object.values(data.val());
            console.log(res)
            this.setState({
              data: res
            });

            if (res[0] === login && res[1] === password) {
              this.GoAuth(login, password);
            } else {
              console.log("ERROR LOGIN RES.LOGIN || RES.PASSWORD");
            }
          } else {
            console.log("ERROR LOGIN");
            this.setState({
              Error: " Неправильный логин или пароль "
            });
          }
        });
    } else {
      console.log("LOGIN NULL");
    }
  };

  GoAuth = async (login, password) => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      currentDateTime:
        date + "-" + month + "-" + year + " " + hours + ":" + min + ":" + sec
    });

    let deviceid = Constants.deviceId;
    var firebaseConfig = {
      apiKey: "AIzaSyAzIFtcevzNUFk6Gdd7hnYXG3itAbO45ns",
      authDomain: "water-line-20d1d.firebaseapp.com",
      databaseURL: "https://water-line-20d1d.firebaseio.com",
      projectId: "water-line-20d1d",
      storageBucket: "water-line-20d1d.appspot.com",
      messagingSenderId: "221727334596",
      appId: "1:221727334596:web:f6dbcd6ae6ad8f97"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    let location = await Location.getCurrentPositionAsync({});

    await firebase
      .database()
      .ref(
        "Admins/" + login + "/AuthSession/" + this.state.currentDateTime + "/"
      )
      .set({
        date: this.state.currentDateTime,
        deviceid: deviceid,
        platform: Constants.platform,
        appsession: Constants.sessionId,
        lt: location.coords.latitude,
        lng: location.coords.longitude
      });

      const { navigation } = this.props
      navigation.navigate(HOMEPAGE)
  };
}

const styles = StyleSheet.create({
  mainview: {
    backgroundColor: mColor,
    flex: 1
  },
  buttonview: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 16,
    marginHorizontal: 8
  },
  textview: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: h / 5
  },
  h1: {
    textAlign: "center",
    color: sColor,
    fontSize: 36,
    fontWeight: "bold"
  },
  textinput: {
    backgroundColor: sColor,
    borderColor: mColor,
    height: 54,
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 16,
    color: mColor,
    fontSize: 18,
    marginBottom: 4
  }
});

export default Login;
