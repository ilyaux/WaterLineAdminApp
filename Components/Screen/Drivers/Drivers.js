import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  YellowBox,
  Image
} from "react-native";
import { Header, AddItem, SwitcherButton } from "../../UIKit/";
import { mColor, w, h, tColor, sColor } from "../../SuportFiles/constanse";
import { Portal, Modal } from "react-native-paper";
import UserItem from "../../UIKit/UserItem";
import firebase from "firebase";
import MapboxGL from "@mapbox/react-native-mapbox-gl";
import _ from "lodash";

MapboxGL.setAccessToken(
  "pk.eyJ1IjoiaWx5YWthcml0c2tpeSIsImEiOiJjank2ZWRwa2MwMDFzM2VsY2RrcnNqYWU1In0.sJSsrP_0ZpZvm--CfMPNDg"
);

class Drivers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Свободные:",
      predata: [],
      data: [],
      showsuser: false,
      usergeodata: {
        curlat: null,
        curlong: null,

        endlat: null,
        endlong: null,

        endname: null,

        startlat: null,
        startlong: null
      }
    };
  }

  componentDidMount() {
    this.getData();
  }

  checkfree = () => {
    if (this.state.title === "В рейсе:") {
      this.setState({
        title: "Свободные:"
      });
    }

    if (this.state.title === "Свободные:") {
      this.setState({
        title: "В рейсе:"
      });
    }

    this.getData();
  };

  checkbusy = () => {
    if (this.state.title === "В рейсе:") {
      this.setState({
        title: "Свободные:"
      });
    }

    if (this.state.title === "Свободные:") {
      this.setState({
        title: "В рейсе:"
      });
    }

    this.getData();

    this.getData();
  };

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
      .ref("/Users/")
      .once("value", data => {
        if (data.exists()) {
          if (data !== null) {
            var res = Object.values(data.val());
            if (this.state.title === "Свободные:") {
              let fres = [];

              res.forEach(el => {
                if (el.drivestatus === 0) {
                  fres.push(el);
                }
              });
              this.setState({
                data: fres
              });
              this.setState({
                predata: res
              });
            }
            if (this.state.title === "В рейсе:") {
              let fres = [];
              res.forEach(el => {
                if (el.drivestatus === 1) {
                  fres.push(el);
                }
              });

              this.setState({
                predata: res
              });
              this.setState({
                data: fres
              });
            }
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
  };

  showUserModal = item => {
    console.log(item);
    this.setState({
      usergeodata: {
        curlat: item.currentlocation.lat,
        curlong: item.currentlocation.long,

        endlat: 55.8155,
        endlong: 37.17856,

        endname: "Медикоменты",

        startlat: 53.693696,
        startlong: 23.8039
      },

      usersecondname: item.secondname,
      DStatus: item.drivestatus,
      username: item.name,
      photo: item.photo,
      OStatus: item.onlinestatus,
      showsuser: true
    });
  };

  hideUserModal = () => {
    this.setState({ showsuser: false });
  };

  render() {
    let curlat = Number(this.state.usergeodata.curlat);
    let curlong = Number(this.state.usergeodata.curlong);
    let endlat = Number(this.state.usergeodata.endlat);
    let endlong = Number(this.state.usergeodata.endlong);
    let startlat = Number(this.state.usergeodata.startlat);
    let startlong = Number(this.state.usergeodata.startlong);
    let endname = this.state.usergeodata.endname;

    return (
      <View style={styles.mainview}>
        <View>
          <Header title="Водители" type="rus" />
        </View>

        <Portal.Host>
          <Portal style={{ flex: 1 }}>
            <Modal
              visible={this.state.showsuser}
              onDismiss={this.hideUserModal}
            >
              <View style={{ alignItems: "center" }}>
                <View style={styles.userminview}>
                  {/* Header */}

                  <View
                    style={{
                      flexDirection: "row",
                      height: 52,
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View>
                        <Image
                          style={{
                            width: 52,
                            height: 52,
                            borderRadius: 52 / 2
                          }}
                          source={{ uri: this.state.photo }}
                        />
                      </View>
                      <View>
                        {this.state.OStatus === 1 ? (
                          <View
                            style={{ position: "relative", top: 40, right: 12 }}
                          >
                            <View
                              style={{
                                backgroundColor: "#5fdba7",
                                width: 12,
                                height: 12,
                                borderRadius: 44 / 2
                              }}
                            />
                          </View>
                        ) : (
                          <View
                            style={{ position: "relative", top: 40, right: 12 }}
                          >
                            <View
                              style={{
                                width: 12,
                                height: 12,
                                borderRadius: 44 / 2
                              }}
                            />
                          </View>
                        )}
                      </View>
                      <View>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                          {this.state.username} {this.state.usersecondname}
                        </Text>
                        <View>
                          {this.state.DStatus === 1 ? (
                            <View
                              style={{
                                marginTop: 6,
                                width: 70,
                                height: 26,
                                borderRadius: 4,
                                borderWidth: 2,
                                borderColor: mColor,
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              <Text
                                style={{ color: mColor, fontWeight: "bold" }}
                              >
                                {" "}
                                В Рейсе{" "}
                              </Text>
                            </View>
                          ) : (
                            <View
                              style={{
                                marginTop: 6,
                                width: 80,
                                height: 26,
                                borderRadius: 4,
                                borderWidth: 2,
                                borderColor: "#5fdba7",
                                justifyContent: "center",
                                alignItems: "center"
                              }}
                            >
                              <Text
                                style={{ color: "#5fdba7", fontWeight: "bold" }}
                              >
                                {" "}
                                Свободен{" "}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        height: 52,
                        width: 52,
                        borderRadius: 4,

                        justifyContent: "flex-end"
                      }}
                    />
                  </View>

                  {/* HR */}

                  <View style={{ height: 2 , width: w - 52 - 32 , backgroundColor: mColor , marginTop: 16 }}/>

                  {/* Body  -> DRIVER STATUS COMPONENT */}

                  {this.state.DStatus === 1 ? (
                    <View style={{ height: 486 - 98 }}>
                      <View>
                        <View>
                          <View style={styles.textnews}>
                            <Text style={styles.textinnews}>Текущий рейс:</Text>
                          </View>
                          <View style={styles.mapview}>
                            <MapboxGL.MapView
                              styleURL={MapboxGL.StyleURL.Street}
                              zoomLevel={3}
                              centerCoordinate={[curlong, curlat]}
                              style={styles.mapview}
                            >
                              <MapboxGL.PointAnnotation
                                id={endname}
                                coordinate={[startlong, startlat]}
                              />

                              <MapboxGL.PointAnnotation
                                id={endname}
                                coordinate={[curlong, curlat]}
                              />
                              <MapboxGL.PointAnnotation
                                id={endname}
                                coordinate={[endlong, endlat]}
                              />
                            </MapboxGL.MapView>
                          </View>
                        </View>
                      </View>
                       {/* Body  -> SEND NOTIFICATION */}
                      <View
                        style={{
                          position: "absolute",
                          bottom: 0,
                          width: w - 52 - 32
                        }}
                      >
                        <AddItem
                          bColor={mColor}
                          Addtext="Отправить уведомление"
                          CreateNew={() => this.sendNotification()}
                        />
                      </View>
                    </View>
                  ) : null}

                 
                </View>
              </View>
            </Modal>
          </Portal>
          <View style={styles.switcher}>
            <View>
              {this.state.title === "Свободные:" ? (
                <SwitcherButton
                  bColor={mColor}
                  CreateNew={() => this.checkfree()}
                  Curv="false"
                  Addtext="Свободны"
                />
              ) : this.state.title === "В рейсе:" ? (
                <SwitcherButton
                  bColor={sColor}
                  CreateNew={() => this.checkfree()}
                  tColr={mColor}
                  Curv="false"
                  Addtext="Свободны"
                  bBorWid={1}
                  bBorColr={mColor}
                />
              ) : null}
            </View>

            <View>
              {this.state.title === "Свободные:" ? (
                <SwitcherButton
                  Curv="true"
                  CreateNew={() => this.checkbusy()}
                  bColor={sColor}
                  Addtext="В рейсе"
                  tColr={mColor}
                  bBorWid={1}
                  bBorColr={mColor}
                />
              ) : this.state.title === "В рейсе:" ? (
                <SwitcherButton
                  Curv="true"
                  bColor={mColor}
                  CreateNew={() => this.checkbusy()}
                  Addtext="В рейсе"
                />
              ) : null}
            </View>
          </View>
          <View style={styles.chscview}>
            <ScrollView>
              <View
                style={{
                  width: w,
                  paddingTop: 8,
                  paddingBottom: 26,
                  paddingHorizontal: 16,
                  justifyContent: "center",
                  backgroundColor: "#FFFFFF"
                }}
              >
                {this.state.data.map((item, index) => (
                  <UserItem
                    key={index}
                    Name={item.name}
                    Image={item.photo}
                    OStatus={item.onlinestatus}
                    Secondname={item.secondname}
                    goNav={() => this.showUserModal(item, index)}
                  />
                ))}
              </View>
            </ScrollView>
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
  switcher: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    width: w,
    flexDirection: "row",
    elevation: 8
  },
  mapview: {
    width: null,
    height: 100,
    borderRadius: 4,
    backgroundColor: tColor
  },
  chscview: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 26
  },
  textnews: {
    height: 42,
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  textinnews: {
    fontWeight: "bold",
    fontSize: 16
  },
  userminview: {
    height: 486,
    width: w - 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 16
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

export default Drivers;
