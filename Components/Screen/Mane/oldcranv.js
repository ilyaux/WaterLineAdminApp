import React, { Component } from "react";
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
import { HOMEPAGE } from "../../SuportFiles/routes";
import { Header, AddItem, HeaderCr, SubSupportName } from "../../UIKit/";
import firebase from "firebase";

class CreateNavigation extends Component {
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
      ltlng: [],
      currentzpp: 1,
      curentltlng: 1
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
    let curl = this.state.currentcp;
    let globl = this.state.globalcp;
    let curfal = this.state.currentzp;
    let curltlng = this.state.curentltlng;
    let CName = this.state.CName;
    let PName = this.state.PName;
    let ZPName = this.state.ZPName;
    let Long = this.state.Long;
    let Lat = this.state.Lat;

    if (curl + 1 > globl) {
      await firebase
        .database()
        .ref("Countries/" + curl + "/points/" + curfal + "/points/" + (curltlng + 1))
        .set({
          geo: {
            lat: Lat,
            long: Long
          },
          name: ZPName,
          index: curltlng
        });
      // this.fofunc(curl ,CName )
      // this.ftfunc(curl , curfal , PName , curfal)
    } else {
      await firebase
        .database()
        .ref("Countries/" + curl + "/points/" + curfal)
        .set({
          name: PName,
          index: curfal
        });

      await firebase
        .database()
        .ref("Countries/" + curl + "/points/" + curfal + "/points/" + (curltlng + 1))
        .set({
          geo: {
            lat: Lat,
            long: Long
          },
          name: ZPName,
          index: curltlng
        });
    }
  };

  fofunc = async (curl, CName) => {
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
      .ref("Countries/" + curl)
      .set({
        icon: CName,
        name: CName,
        index: curl
      });
  };

  ftfunc = async (curl, curfal, PName) => {
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
      .ref("Countries/" + curl + "/points/" + curfal)
      .set({
        name: PName,
        index: curfal
      });
  };

  ftrfunc = async (curl, curfal, curltlng, Lat, Long) => {
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
      .ref("Countries/" + curl + "/points/" + curfal + "/points/" + curltlng)
      .set({
        geo: {
          lat: Lat,
          long: Long
        },
        name: ZPName,
        index: curltlng
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
      this.CountrieListener();
      this.FalconListener();
      this.PositinListener()
    }, 1000);
  }

  CountrieListener = async () => {
    cname = this.state.CName;
    if (cname !== "") {
      let cdata = this.state.cdata;
      let pdata = cdata.find(el1 => el1.name === cname);
      if (pdata !== undefined) {
        let res = Object.values(pdata);
        if (res !== null) {
          let cp = res[1];
          this.setState({ currentcp: cp });
          await firebase
            .database()
            .ref("/Countries/" + cp + "/points/")
            .once("value", data => {
              if (data.exists()) {
                var pv = Object.values(data.val());
                this.setState({
                  currentcp: cp,
                  pdata: pv
                });
              } else {
                this.setState({
                  currentcp: 1,
                  pdata: null
                });
              }
            });
        }
      } else {
        await firebase
          .database()
          .ref("/Countries/")
          .once("value", data => {
            if (data.exists()) {
              var pv = Object.values(data.val());
              this.setState({
                currentcp: pv.length + 1,
                pdata: null
              });
            } else {
              this.setState({
                currentcp: 1
              });
            }
          });
      }
    }
  };

  FalconListener = async () => {
    let zpname = this.state.PName;
    if (zpname !== "") {
      let pd = this.state.pdata;
      let zpdata = pd.find(el1 => el1.name === zpname);
      if (zpdata !== undefined) {
        let res = Object.values(zpdata);
        if (res !== null) {
          let fp = res[0];
          console.log("FALCON NUMBER : " + fp )
          let currentcp = this.state.currentcp;
          this.setState({ currentzp: fp });
          await firebase
            .database()
            .ref("/Countries/" + currentcp + "/points/" + fp + "/points")
            .once("value", data => {
              if (data.exists()) {
                var pv = Object.values(data.val());
                this.setState({
                  currentzp: fp,
                  zpdata: pv
                });
              } else {
                this.setState({
                  currentzp: 1,
                  pdata: null
                });
              }
            });
        }
      } else {
        let currentcp = this.state.currentcp;
        await firebase
          .database()
          .ref("/Countries/" + currentcp + "/points/")
          .once("value", data => {
            if (data.exists()) {
              var pv = Object.values(data.val());
              this.setState({
                currentzp: pv.length + 1
              });
              console.log(currentcp)
              console.log("PV: " + this.state.currentzp)
            } else {
              this.setState({
                currentzp: 1
              });
            }
          });
      }
    }
  };

  PositinListener = async () => {
    let zpd = this.state.zpdata;
    
    this.setState({
      curentltlng: zpd.length 
    });

    console.log("POINT NUMBER : " + this.state.curentltlng )
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
            globalcp: res.length,
            currentcp: res.length
          });
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

  setName = async cname => {
    this.setState({ CName: cname });
    if (cname !== "") {
      this.setState({
        PName: "",
        ZPName: "",
        Long: "",
        Lat: "",
        pdata: null,
        zpdata: null,
        ltlng: null
      });
      let cdata = this.state.cdata;
      let pdata = cdata.find(el1 => el1.name === cname);
      if (pdata !== undefined) {
        let res = Object.values(pdata);
        if (res !== null) {
          let cp = res[1];
          this.setState({ currentcp: cp });
          await firebase
            .database()
            .ref("/Countries/" + cp + "/points/")
            .once("value", data => {
              if (data.exists()) {
                var pv = Object.values(data.val());
                this.setState({
                  currentcp: cp,
                  pdata: pv
                });
              } else {
                this.setState({
                  pdata: null
                });
              }
            });
        }
      } else {
        await firebase
          .database()
          .ref("/Countries/")
          .once("value", data => {
            if (data.exists()) {
              var pv = Object.values(data.val());
              this.setState({
                currentcp: pv.length,
                pdata: null,
                PName: "",
                ZPName: "",
                Long: "",
                Lat: ""
              });
            } else {
              this.setState({
                currentcp: 0,
                PName: "",
                ZPName: "",
                Long: "",
                Lat: ""
              });
            }
          });
      }
    } else {
      this.setState({
        PName: "",
        ZPName: "",
        Long: "",
        Lat: "",
        pdata: null,
        zpdata: null,
        ltlng: null
      });
    }
  };

  setZPName = async zpname => {
    this.setState({ PName: zpname });
    if (this.state.ZPName !== zpname) {
      this.setState({
        Long: "",
        Lat: "",
        PName: zpname,
        ZPName: ""
      });
    }

    let pd = this.state.pdata;
    let zpdata = pd.find(el1 => el1.name === zpname);
    if (zpdata !== null) {
      let res = Object.values(zpdata);
      let zpp = res[0];
      this.setState({
        currentzpp: zpp
      });
      await firebase
        .database()
        .ref(
          "/Countries/" + this.state.currentcp + "/points/" + zpp + "/points/"
        )
        .once("value", data => {
          if (data.exists()) {
            var zpv = Object.values(data.val());

            this.setState({
              zpdata: zpv,
              curentzp: zpv.length
            });
          } else {
            this.setState({
              zpata: null
            });
          }
        });
    } else {
      this.setState({
        Lat: "",
        Long: ""
      });
    }

    YellowBox.ignoreWarnings(["Setting a timer"]);
    const _console = _.clone(console);
    console.warn = message => {
      if (message.indexOf("Setting a timer") <= -1) {
        _console.warn(message);
      }
    };
  };

  setLtLng = async ltlngname => {
    let zpd = this.state.zpdata;
    let ltlng = zpd.find(el1 => el1.name === ltlngname);
    console.log(ltlng.name);
    if (ltlng !== undefined) {
      if (ltlng !== null) {
        this.setState({
          ltlng: ltlng,
          ZPName: ltlng.name,
          curentltlng: ltlng.index,
          Lat: ltlng.geo.lat.toString(),
          Long: ltlng.geo.long.toString()
        });
      }
    }
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

    if (name.length > 3) {
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

            <View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {this.state.cdata.map((item, index) => (
                  <View key={index} style={{ marginHorizontal: 8 }}>
                    <SubSupportName
                      Subname={item.name}
                      SetName={() => this.setName((cname = item.name))}
                    />
                  </View>
                ))}
              </ScrollView>
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

            {this.state.pdata !== null ? (
              <View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {this.state.pdata.map((item, index) => (
                    <View key={index} style={{ marginHorizontal: 8 }}>
                      <SubSupportName
                        Subname={item.name}
                        SetName={() => this.setZPName((zpname = item.name))}
                      />
                    </View>
                  ))}
                </ScrollView>
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

                {this.state.zpdata !== null ? (
                  <View>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      {this.state.zpdata.map((item, index) => (
                        <View key={index} style={{ marginHorizontal: 8 }}>
                          <SubSupportName
                            Subname={item.name}
                            SetName={() =>
                              this.setLtLng((ltlngname = item.name))
                            }
                          />
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                ) : null}

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
                  <AddItem bColor={mColor} Addtext="Проверить координаты" />
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
