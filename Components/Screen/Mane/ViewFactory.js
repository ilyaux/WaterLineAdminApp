import React, { PureComponent } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { mColor, w, h, tColor } from "../../SuportFiles/constanse";
import { HOMEPAGE, CREATEFACROTY, VIEWPOINTS } from "../../SuportFiles/routes";
import { HeaderCr, AddItem } from "../../UIKit/";
import NavFactory from "../../UIKit/NavFactory";
import firebase from "firebase";

class ViewFactory extends PureComponent {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getData = async () => {
    this._isMounted = true;
    const { ind } = this.props.navigation.state.params;
    let inde = ind + 1;
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
      .ref("/Countries/" + inde + "/points/")
      .once("value", data => {
        if (data.exists()) {
          if (data !== null) {
            var res = Object.values(data.val());
            this.setState({
              data: res
            });
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

  goCreate = () => {
    const { ind } = this.props.navigation.state.params;
    let inde = ind + 1;
    const { navigation } = this.props;
    navigation.navigate(CREATEFACROTY, {
      mind: inde
    });
  };

  goViewPoints = (item, index) => {
    const { ind } = this.props.navigation.state.params;
    const { navigation } = this.props;
    let mind = ind + 1;
    let pind = index;
    navigation.navigate(VIEWPOINTS, {
      name: item.name,
      rn: navigation.state.routeName,
      mind: mind,
      pind: pind
    });
  };

  render() {
    const { name } = this.props.navigation.state.params;
    return (
      <View style={styles.mainview}>
        <View>
          <HeaderCr
            title={name}
            onPress={() => this.props.navigation.navigate(HOMEPAGE)}
          />
        </View>
        <ScrollView
          style={styles.scrollview}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.textnews}>
            <Text style={styles.textinnews}>Предприятия</Text>
          </View>
          <View styles={styles.chscview}>
            {this.state.data.map((item, index) => (
              <NavFactory
                key={index}
                nName={item.name}
                icon={item.name}
                goNav={() => this.goViewPoints(item, index)}
              />
            ))}
          </View>
        </ScrollView>
        <View style={styles.addviewc}>
          <AddItem
            bColor={mColor}
            Addtext="Добавить Предприятие"
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

export default ViewFactory;
