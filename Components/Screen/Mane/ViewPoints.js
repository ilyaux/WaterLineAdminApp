import React, { PureComponent } from "react";
import { View, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { mColor, w, h, tColor, sColor } from "../../SuportFiles/constanse";
import { HOMEPAGE, CREATEFACROTY } from "../../SuportFiles/routes";
import { Portal, Modal } from "react-native-paper";
import { HeaderCr, AddItem } from "../../UIKit/";
import NavFactory from "../../UIKit/NavFactory";
import firebase from "firebase";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import * as Location from "expo-location";

MapboxGL.setAccessToken(
  "pk.eyJ1IjoiaWx5YWthcml0c2tpeSIsImEiOiJjank2ZWRwa2MwMDFzM2VsY2RrcnNqYWU1In0.sJSsrP_0ZpZvm--CfMPNDg"
);

class ViewPoints extends PureComponent {
  interval;
  intervaladd;
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showpoint: false,
      createpoint: false,
      complete: false,
      addcomplete: false,
      ZPName: ""
    };
  }

  componentDidMount() {
    this.getData();
  }

  checkCoordinate = async () => {
    if (
      Number(this.state.pointlat) !== Number(this.state.loadlat) ||
      Number(this.state.pointlong) !== Number(this.state.loadlong) ||
      this.state.oldzpname !== this.state.ZPName
    ) {
      this.setState({
        complete: true
      });
    } else {
      this.setState({
        complete: false
      });
    }
  };

  checkAddCoordinate = async () => {
    let oldnumlat = Number(this.state.oldpntlat);
    let oldnumlong = Number(this.state.oldpntlong);
    let zname = this.state.ZPName;

    console.log("oldlong : " + oldnumlong);
    console.log("oldlat : " + oldnumlat);
    console.log("zname : " + zname);

    if (
      oldnumlat >= -90 &&
      oldnumlat <= 90 &&
      (oldnumlong >= -180 && oldnumlong <= 180) &&
      zname !== ""
    ) {
      this.setState({
        currentgeolt: oldnumlat,
        currentgeolong: oldnumlong,
        addcomplete: true
      });
    } else {
      this.setState({
        addcomplete: false
      });
    }
  };

  getData = async () => {
    this._isMounted = true;
    const { mind, pind } = this.props.navigation.state.params;
    let pi = pind + 1;
    console.log("mind " + mind);
    console.log("pind " + pi);
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
      .ref("/Countries/" + mind + "/points/" + pi + "/points/")
      .once("value", data => {
        if (data.exists()) {
          if (data !== null) {
            var res = Object.values(data.val());
            this.setState({
              data: res,
              gllength: res.length
            });
            console.log(res.length);
          } else {
            this.setState({
              data: []
            });
          }
        } else {
          this.setState({
            data: []
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

  componentWillUnmount(){
    this._isMounted = false;
  }

  goCreate = async () => {
    let location = await Location.getCurrentPositionAsync({});
    intervaladd = setInterval(() => {
      this.checkAddCoordinate();
    }, 1000);
    this.setState({
      currentgeolt: Number(location.coords.latitude),
      currentgeolong: Number(location.coords.longitude),
      createpoint: true
    });
  };

  ShowPoint = async item => {
    interval = setInterval(() => {
      this.checkCoordinate();
    }, 1000);

    this.setState({
      oldzpname: item.name,
      ZPName: item.name,

      showpoint: true,

      currentindex: item.index,

      loadlat: item.geo.lat,
      loadlong: item.geo.long,

      pointlat: item.geo.lat,
      pointlong: item.geo.long,

      oldpntlat: item.geo.lat.toString(),
      oldpntlong: item.geo.long.toString()
    });
    console.log("Номер Объекта : " + item.index);
    console.log("pointlat " + item.geo.lat);
    console.log("pointlong " + item.geo.long);
  };

  sendLong = Long => {
    let nlong = Number(Long);
    this.setState({ oldpntlong: Long });
    if (nlong !== 0 || undefined || null || "NaN") {
      this.setState({
        pointlong: Long
      });

      if (
        Number(this.state.pointlat) !== Number(this.state.loadlat) ||
        Number(this.state.pointlong) !== Number(this.state.loadlong)
      ) {
        this.setState({
          complete: true
        });
      } else {
        this.setState({
          complete: false
        });
      }
    } else {
      console.log(nlong);
    }
  };

  sendLat = Lat => {
    let nlat = Number(Lat);
    this.setState({ oldpntlat: Lat });
    if (nlat !== 0 || undefined || null || "NaN") {
      this.setState({
        pointlat: Lat
      });

      if (
        Number(this.state.pointlat) !== Number(this.state.loadlat) ||
        Number(this.state.pointlong) !== Number(this.state.loadlong)
      ) {
        this.setState({
          complete: true
        });
      } else {
        this.setState({
          complete: false
        });
      }
    } else {
      console.log(nlat);
    }
  };

  hideShModal = () => {
    clearInterval(interval);
    this.setState({
      showpoint: false,
      oldpntlat: "",
      oldpntlong: "",
      ZPName: "",
      oldzpname: ""
    });
  };

  hideCrModal = () => {
    clearInterval(intervaladd);
    console.log("Stop ADDINTERVAL");
    this.setState({ createpoint: false });
  };

  SendCoordinate = async () => {
    const { mind, pind } = this.props.navigation.state.params;
    let pi = pind + 1;
    console.log("mind " + mind);
    console.log("pind " + pi);
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

    if (this.state.currentindex !== undefined) {
      await firebase
        .database()
        .ref(
          "/Countries/" +
            mind +
            "/points/" +
            pi +
            "/points/" +
            this.state.currentindex +
            "/"
        )
        .set({
          index: this.state.currentindex,
          name: this.state.ZPName
        });

      await firebase
        .database()
        .ref(
          "/Countries/" +
            mind +
            "/points/" +
            pi +
            "/points/" +
            this.state.currentindex +
            "/geo/"
        )
        .set({
          lat: this.state.pointlat,
          long: this.state.pointlong
        });
      clearInterval(interval);
      this.setState({
        complete: false,
        showpoint: false,
        oldpntlat: "",
        oldpntlong: "",
        ZPName: "",
        oldzpname: ""
      });
    }
    this.getData();
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const _console = _.clone(console);
    console.warn = message => {
      if (message.indexOf("Setting a timer") <= -1) {
        _console.warn(message);
      }
    };
  };

  AddNewCoordinatate = async () => {
    const { mind, pind } = this.props.navigation.state.params;
    let np = this.state.gllength + 1;
    let pi = pind + 1;
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
    if (np !== undefined && np !== null) {
      await firebase
        .database()
        .ref("/Countries/" + mind + "/points/" + pi + "/points/" + np + "/")
        .set({
          index: np,
          name: this.state.ZPName
        });

      await firebase
        .database()
        .ref("/Countries/" + mind + "/points/" + pi + "/points/" + np + "/geo/")
        .set({
          lat: this.state.oldpntlat,
          long: this.state.oldpntlong
        });
      clearInterval(intervaladd);
      console.log("Stop ADDINTERVAL");
      this.getData()
      this.setState({ createpoint: false });
      this.setState({
        complete: false,
        showpoint: false,
        oldpntlat: "",
        oldpntlong: "",
        ZPName: "",
        oldzpname: ""
      });
    }
  };

  render() {
    const { name, rn } = this.props.navigation.state.params;

    let showpoint = this.state.showpoint;
    let createpoint = this.state.createpoint;

    let lst = this.state.pointlat;
    let lngst = this.state.pointlong;
    let lat = Number(lst);
    let long = Number(lngst);

    let tilst = this.state.oldpntlat;
    let tilng = this.state.oldpntlong;

    let curgeolt = Number(this.state.currentgeolt);
    let curgeolong = Number(this.state.currentgeolong);

    return (
      <View style={styles.mainview}>
        <View>
          <HeaderCr
            title={name}
            onPress={() => this.props.navigation.navigate(rn)}
          />
        </View>
        <Portal.Host>
          <Portal style={{ flex: 1 }}>
            <Modal visible={showpoint} onDismiss={this.hideShModal}>
              <View style={{ alignItems: "center" }}>
                <View style={styles.showpoint}>
                  <Text style={styles.textinnews}>
                    Название точки погрузки / разгрузки
                  </Text>

                  <View>
                    <TextInput
                      autoCapitalize="none"
                      keyboardAppearance="light"
                      style={[styles.gltextinput]}
                      autoCorrect={false}
                      value={this.state.ZPName}
                      placeholder="Название точки погрузки / разгрузки"
                      placeholderTextColor="#CCCCCC"
                      textColor={mColor}
                      onChangeText={ZPName => this.setState({ ZPName })}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <View>
                      <View style={styles.subtextnews}>
                        <Text style={styles.textinnews}>Широта:</Text>
                      </View>
                      <TextInput
                        autoCapitalize="none"
                        keyboardAppearance="light"
                        style={[styles.geotextinput]}
                        autoCorrect={false}
                        value={tilng}
                        placeholder="Широта"
                        placeholderTextColor="#CCCCCC"
                        textColor={mColor}
                        onChangeText={Long => this.sendLong(Long)}
                      />
                    </View>

                    <View>
                      <View style={styles.subtextnews}>
                        <Text style={styles.textinnews}>Долгота:</Text>
                      </View>
                      <TextInput
                        autoCapitalize="none"
                        keyboardAppearance="light"
                        style={[styles.geotextinput]}
                        autoCorrect={false}
                        value={tilst}
                        placeholder="Долгота"
                        placeholderTextColor="#CCCCCC"
                        textColor={mColor}
                        onChangeText={Lat => this.sendLat(Lat)}
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 8 }}>
                    {this.state.complete === false ? (
                      <AddItem
                        bColor={sColor}
                        Addtext="Подтвердить координаты"
                        tColr={mColor}
                        bBorWid={1}
                        bBorColr={mColor}
                      />
                    ) : (
                      <AddItem
                        bColor={mColor}
                        CreateNew={() => this.SendCoordinate()}
                        Addtext="Подтвердить координаты"
                      />
                    )}
                  </View>
                  <View
                    style={{
                      height: 150,
                      paddingTop: 8
                    }}
                  >
                    <MapboxGL.MapView
                      styleURL={MapboxGL.StyleURL.Street}
                      zoomLevel={15}
                      centerCoordinate={[long, lat]}
                      style={styles.mapview}
                    >
                      <MapboxGL.PointAnnotation
                        id={name}
                        coordinate={[long, lat]}
                      />
                    </MapboxGL.MapView>
                  </View>
                </View>
              </View>
            </Modal>

            <Modal visible={createpoint} onDismiss={this.hideCrModal}>
              <View style={{ alignItems: "center" }}>
                <View style={styles.createview}>
                  <Text style={styles.textinnews}>
                    Название точки погрузки / разгрузки
                  </Text>
                  <View>
                    <TextInput
                      autoCapitalize="none"
                      keyboardAppearance="light"
                      style={[styles.gltextinput]}
                      autoCorrect={false}
                      value={this.state.ZPName}
                      placeholder="Название точки погрузки / разгрузки"
                      placeholderTextColor="#CCCCCC"
                      textColor={mColor}
                      onChangeText={ZPName => this.setState({ ZPName })}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <View>
                      <View style={styles.subtextnews}>
                        <Text style={styles.textinnews}>Широта:</Text>
                      </View>
                      <TextInput
                        autoCapitalize="none"
                        keyboardAppearance="light"
                        style={[styles.geotextinput]}
                        autoCorrect={false}
                        value={tilng}
                        placeholder="Широта"
                        placeholderTextColor="#CCCCCC"
                        textColor={mColor}
                        onChangeText={Long =>
                          this.setState({ oldpntlong: Long })
                        }
                      />
                    </View>

                    <View>
                      <View style={styles.subtextnews}>
                        <Text style={styles.textinnews}>Долгота:</Text>
                      </View>
                      <TextInput
                        autoCapitalize="none"
                        keyboardAppearance="light"
                        style={[styles.geotextinput]}
                        autoCorrect={false}
                        value={tilst}
                        placeholder="Долгота"
                        placeholderTextColor="#CCCCCC"
                        textColor={mColor}
                        onChangeText={Lat =>
                          this.setState({
                            oldpntlat: Lat
                          })
                        }
                      />
                    </View>
                  </View>

                  <View>
                    <View style={{ marginVertical: 8 }}>
                      <Text style={styles.textinnews}>Местоположение:</Text>
                    </View>

                    <View style={styles.mapview}>
                      <MapboxGL.MapView
                        styleURL={MapboxGL.StyleURL.Street}
                        zoomLevel={15}
                        centerCoordinate={[curgeolong, curgeolt]}
                        style={styles.mapview}
                      >
                        <MapboxGL.PointAnnotation
                          id={name}
                          coordinate={[curgeolong, curgeolt]}
                        />
                      </MapboxGL.MapView>
                    </View>
                  </View>
                  <View style={{ marginTop: 8 }}>
                    {this.state.addcomplete == true ? (
                      <AddItem
                        bColor={mColor}
                        CreateNew={() => this.AddNewCoordinatate()}
                        Addtext="Подтвердить"
                      />
                    ) : (
                      <AddItem
                        bColor={sColor}
                        Addtext="Подтвердить"
                        tColr={mColor}
                        bBorWid={1}
                        bBorColr={mColor}
                      />
                    )}
                  </View>
                </View>
              </View>
            </Modal>
          </Portal>
          <ScrollView
            style={styles.scrollview}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.textnews}>
              <Text style={styles.textinnews}>Точки погрузки / разгрузки</Text>
            </View>
            <View styles={styles.chscview}>
              {this.state.data.map((item, index) => (
                <NavFactory
                  key={index}
                  Set="points"
                  nName={item.name}
                  icon={item.name}
                  goNav={() => this.ShowPoint(item)}
                />
              ))}
            </View>
          </ScrollView>
          <View style={styles.addviewc}>
            <AddItem
              bColor={mColor}
              Addtext="Добавить точку погрузки / разгрузки"
              CreateNew={() => this.goCreate()}
            />
          </View>
        </Portal.Host>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  glsubtextnews: {
    height: 30,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: w - 52 - 16
  },
  gltextinput: {
    backgroundColor: sColor,
    width: w - 52 - 16,
    borderColor: mColor,
    height: 54,
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 16,
    color: mColor,
    fontSize: 18
  },
  geotextinput: {
    backgroundColor: sColor,
    borderColor: mColor,
    height: 54,
    width: (w - 52) / 2 - 16,
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 16,
    color: mColor,
    fontSize: 18
  },
  mapview: {
    width: null,
    height: 200,
    borderRadius: 4,
    backgroundColor: tColor
  },
  showpoint: {
    height: 456,
    width: w - 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  createview: {
    height: 486,
    width: w - 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  scrollview: {
    // paddingRight: 16,
    // paddingLeft: 16
  },
  chscview: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 26
  },
  textnews: {
        paddingRight: 16,
    paddingLeft: 16,
    height: 30,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: w
  },
  subtextnews: {
    height: 30,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: (w - 52) / 2 - 16
  },
  textinnews: {
    fontWeight: "bold",
    fontSize: 16
    // height: 56,
  },
  addviewc: {
    width: w,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    elevation: 8
  }
});

export default ViewPoints;
