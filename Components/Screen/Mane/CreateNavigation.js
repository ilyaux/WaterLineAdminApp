import React, { PureComponent } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { mColor, w, h, tColor, sColor } from "../../SuportFiles/constanse";
import { YellowBox } from "react-native";
import _ from "lodash";
import { HOMEPAGE, MAPPAGE } from "../../SuportFiles/routes";
import {
  Header,
  AddItem,
  HeaderCr,
  SubSupportName,
  ErrorMessage
} from "../../UIKit/";
import firebase from "firebase";

class CreateNavigation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      CName: "",
      PName: "",
      ZPName: "",
      Long: "",
      Lat: "",
      cdata: [],
      pdata: [],
      zpdata: [],
      ltlng: []
    };
  }

  CreatePoint = async () => {
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

    let cname = this.state.CName;
    let globl = this.state.globalcp + 1;
    let PName = this.state.PName;
    let ZPName = this.state.ZPName;
    let Long = this.state.Long;
    let Lat = this.state.Lat;

    this.getData();
    let cdata = this.state.cdata;
    let pdata = cdata.find(el1 => el1.name === cname);
    if (pdata === undefined) {
      console.log("Страна : " + cname);
      console.log("Номер страны : " + globl);
      console.log("Предпритие : " + PName);
      console.log("Номер предприятия : " + 1);
      console.log("Точка погрузки : " + ZPName);
      console.log("Номер точки погрузки : " + 1);
      console.log("Координаты : " + " Широта = " + Long + " Долгота = " + Lat);

      await firebase
        .database()
        .ref("Countries/" + globl + "/")
        .set({
          name: cname,
          icon: cname,
          index: globl
        });

      await firebase
        .database()
        .ref("Countries/" + globl + "/points/" + 1 + "/")
        .set({
          name: PName,
          index: 1
        });

      await firebase
        .database()
        .ref("Countries/" + globl + "/points/" + 1 + "/points/" + 1 + "/")
        .set({
          name: ZPName,
          index: 1,
          geo: {
            lat: Lat,
            long: Long
          }
        });
    } else {
      console.log("Такая страна существует");
      this.setState({ ErrorMessage: true });
      setTimeout(() => {
        this.setState({ ErrorMessage: false });
      }, 5000);
    }
  };

  CheckNavigation = async () => {
    const { navigation } = this.props;
    let PName = this.state.PName;
    let Long = this.state.Long;
    let Lat = this.state.Lat;
    navigation.navigate(MAPPAGE, {
      rn: navigation.state.routeName, 
      name: PName,
      lat: Number(Lat),
      long: Number(Long)
    });
  };

  componentDidMount() {
    YellowBox.ignoreWarnings(["Possible Unhandled Promise Rejection"]);
    let _console = _.clone(console);
    console.warn = message => {
      if (message.indexOf("Possible Unhandled Promise Rejection") <= -1) {
        _console.warn(message);
      }
    };
    this.getData();
    setInterval(() => {
      this.searchCountriesFlag();
    }, 1000);
  }

  getData = async () => {
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

    await firebase
      .database()
      .ref("/Countries/")
      .once("value", data => {
        if (data !== null) {
          var res = Object.values(data.val());

          this.setState({
            cdata: res,
            globalcp: res.length
          });

          console.log(res.length);
        }
      });

    YellowBox.ignoreWarnings(["Setting a timer"]);
    const _console = _.clone(console);
    console.warn = message => {
      if (message.indexOf("Setting a timer") <= -1) {
        _console.warn(message);
      }
    };
  };

  searchCountriesFlag = async () => {
    let name = this.state.CName;

    var firebaseConfig = {
      apiKey: "AIzaSyAzIFtcevzNUFk6Gdd7hnYXG3itAbO45ns",
      authDomain: "water-line-20d1d.firebaseapp.com",
      databaseURL: "https://water-line-20d1d.firebaseio.com",
      projectId: "water-line-20d1d",
      storageBucket: "water-line-20d1d.appspot.com",
      messagingSenderId: "221727334596",
      appId: "1:221727334596:web:f6dbcd6ae6ad8f97"
    };

    YellowBox.ignoreWarnings(["Setting a timer"]);
    let _console = _.clone(console);
    console.warn = message => {
      if (message.indexOf("Setting a timer") <= -1) {
        _console.warn(message);
      }
    };

    if (name !== "") {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      var ref = await firebase.storage().ref("flags/" + name + ".png");
      return ref.getDownloadURL().then(url => {
        if (url !== null) {
          this.setState({
            image: url
          });
        } else {
          this.setState({
            image: null
          });
        }
      });
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.mainview}>
        <View>
          <HeaderCr
            title="Новый маршрут"
            onPress={() => navigation.navigate(HOMEPAGE)}
          />
        </View>
        <View>
          {this.state.ErrorMessage === true ? (
            <ErrorMessage
              BackColor="#D8000C"
              textColor="#FFFFFF"
              Message="Такая страна уже существует"
            />
          ) : null}
        </View>

        {/* Название страны */}

        <KeyboardAvoidingView style={styles.mainview} behavior="padding">
          <ScrollView>
            <View style={styles.namecview}>
              <View style={styles.textnews}>
                <Text style={styles.textinnews}>Название страны:</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <View>
                  <TextInput
                    autoCapitalize="none"
                    keyboardAppearance="light"
                    style={[styles.textinput]}
                    autoCorrect={false}
                    value={this.state.CName}
                    placeholder="Название Страны"
                    placeholderTextColor="#CCCCCC"
                    textColor={mColor}
                    onChangeText={CName => this.setState({ CName })}
                  />
                </View>
                <View style={styles.imageflag}>
                  {this.state.image !== null ? (
                    <Image
                      style={{ width: 30, height: 30 }}
                      source={{ uri: this.state.image }}
                    />
                  ) : null}
                </View>
              </View>
            </View>

            {/* Созданиче точки */}

            {this.state.CName !== "" ? (
              <View style={styles.namecview}>
                <View style={styles.textnews}>
                  <Text style={styles.textinnews}>Название предприятия:</Text>
                </View>
                <View>
                  <TextInput
                    autoCapitalize="none"
                    keyboardAppearance="light"
                    style={[styles.gltextinput]}
                    autoCorrect={false}
                    value={this.state.PName}
                    placeholder="Название предприятия"
                    placeholderTextColor="#CCCCCC"
                    textColor={mColor}
                    onChangeText={PName => this.setState({ PName })}
                  />
                </View>
              </View>
            ) : null}

            {/* Добавить точку */}

            {this.state.PName !== "" ? (
              <View>
                <View style={styles.namecview}>
                  <View style={styles.textnews}>
                    <Text style={styles.textinnews}>
                      Название точки погрузки / разгузки:
                    </Text>
                  </View>
                  <View>
                    <TextInput
                      autoCapitalize="none"
                      keyboardAppearance="light"
                      style={[styles.gltextinput]}
                      autoCorrect={false}
                      value={this.state.ZPName}
                      placeholder="Название точки погрузки / разгузки"
                      placeholderTextColor="#CCCCCC"
                      textColor={mColor}
                      onChangeText={ZPName => this.setState({ ZPName })}
                    />
                  </View>
                </View>

                <View style={styles.namecview}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 8
                    }}
                  >
                    <View>
                      <TextInput
                        autoCapitalize="none"
                        keyboardAppearance="light"
                        style={[styles.geotextinput]}
                        autoCorrect={false}
                        value={this.state.Long}
                        placeholder="Широта"
                        placeholderTextColor="#CCCCCC"
                        textColor={mColor}
                        onChangeText={Long => this.setState({ Long })}
                      />
                    </View>

                    <View>
                      <TextInput
                        autoCapitalize="none"
                        keyboardAppearance="light"
                        style={[styles.geotextinput]}
                        autoCorrect={false}
                        value={this.state.Lat}
                        placeholder="Долгота"
                        placeholderTextColor="#CCCCCC"
                        textColor={mColor}
                        onChangeText={Lat => this.setState({ Lat })}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ) : null}

            {this.state.Long !== "" &&
            this.state.Lat !== "" &&
            this.state.ZPName !== "" ? (
              <View style={{ marginTop: 16, marginBottom: 16 }}>
                {/* Проверить координаты*/}

                <View style={styles.namecview}>
                  <AddItem
                    bColor={mColor}
                    CreateNew={() => this.CheckNavigation()}
                    Addtext="Проверить координаты"
                  />
                </View>

                {/* Проверить координаты*/}

                <View
                  style={{
                    flex: 1,
                    width: w,
                    marginTop: 8,
                    paddingHorizontal: 8,
                    justifyContent: "center"
                  }}
                >
                  <AddItem
                    bColor={mColor}
                    CreateNew={() => this.CreatePoint()}
                    Addtext="Добавить маршрут"
                  />
                </View>
              </View>
            ) : null}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    height: h,
    backgroundColor: "#FFFFFF"
  },
  namecview: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: "center"
  },
  textinput: {
    backgroundColor: sColor,
    borderColor: mColor,
    height: 54,
    width: w - 80,
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 16,
    color: mColor,
    fontSize: 18
  },
  gltextinput: {
    backgroundColor: sColor,
    borderColor: mColor,
    height: 54,
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 16,
    color: mColor,
    fontSize: 18
  },
  geotextinput: {
    backgroundColor: sColor,
    borderColor: mColor,
    height: 54,
    width: w / 2 - 16,
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 16,
    color: mColor,
    fontSize: 18
  },
  textinnews: {
    fontWeight: "bold",
    fontSize: 18
  },
  textnews: {
    height: 56,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: w
  },
  imageflag: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: sColor,
    width: 54,
    height: 54,
    borderRadius: 4,
    marginLeft: 8,
    borderColor: mColor,
    borderWidth: 1
  }
});

export default CreateNavigation;
