import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, Animated } from "react-native";
import { mColor, w, h, tColor } from "../../SuportFiles/constanse";
import { CREATEPAGE, VIEWFACTORY } from "../../SuportFiles/routes";
import { YellowBox } from "react-native";
import _ from "lodash";
import NavItems from "../../UIKit/NavItems";
import { Header, AddItem } from "../../UIKit/";
import firebase from "firebase";
import { Font } from "expo";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fadeAnim: new Animated.Value(0),
      animation: {
        statusPositionTop: new Animated.Value(300),
        PasswordPositionTop: new Animated.Value(300),
        LoginPositionTop: new Animated.Value(300)
      }
    };
  }

  componentDidMount() {
    YellowBox.ignoreWarnings(["Possible Unhandled Promise Rejection"]);
    let _console = _.clone(console);
    console.warn = message => {
      if (message.indexOf("Possible Unhandled Promise Rejection") <= -1) {
        _console.warn(message);
      }
    };
    this.getData();
  }

  Animation = () => {
    const timing = Animated.timing;
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 2000
    }).start();
    Animated.parallel([
      timing(this.state.animation.statusPositionTop, {
        toValue: 0,
        duration: 600
      }),
      timing(this.state.animation.PasswordPositionTop, {
        toValue: 0,
        duration: 800
      }),
      timing(this.state.animation.LoginPositionTop, {
        toValue: 0,
        duration: 1000
      })
    ]).start();
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
      .ref("/Countries/")
      .once("value", data => {
        if (data.exists()) {
          if (data !== null) {
            var res = Object.values(data.val());
            this.setState({
              data: res
            });
            this.Animation();
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

  onGoBack = someDataFromChildren => {
    console.log("someDataFromChildren", someDataFromChildren);
  };

  goPage = (item, index) => {
    const { navigation } = this.props;
    navigation.navigate("Страна", {
      cdata: item,
      cindex: index,
      goBack: navigation.state.routeName
    });
  };

  goCreate = () => {
    const { navigation } = this.props;
    navigation.navigate(CREATEPAGE);
  };

  goViewFactory = (item, index) => {
    const { navigation } = this.props;
    navigation.navigate(VIEWFACTORY, {
      item: item,
      ind: index,
      name: item.name
    });
  };

  render() {
    return (
      <View style={styles.mainview}>
        <View>
          <Header title="WATERLINE ADMIN"  />
        </View>

        <ScrollView
          style={styles.scrollview}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.textnews}>
            <Text style={styles.textinnews}>Маршруты</Text>
          </View>
          <Animated.View
            styles={{
              ...this.props.style,
              top: this.state.animation.LoginPositionTop,
              position: "relative",
              flex: 1,
              alignItems: "center",
              paddingBottom: 26,
              paddingHorizontal: 16,
              opacity: this.state.fadeAnim,
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            {this.state.data.map((item, index) => (
              <NavItems
                key={item.name}
                nName={item.name}
                icon={item.name}
                goNav={() => this.goViewFactory(item, index)}
              />
            ))}
          </Animated.View>
        </ScrollView>
        <View style={styles.addviewc}>
          <AddItem
            bColor={mColor}
            Addtext="Добавить Страну"
            CreateNew={() => this.goCreate()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  scrollview: {
   
  },
  chscview: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 26
  },
  textnews: {
     paddingRight: 16,
    paddingLeft: 16,
    height: 56,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: w
  },
  textinnews: {
    fontWeight: "bold",
    fontSize: 16
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
