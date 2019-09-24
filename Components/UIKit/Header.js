import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Appbar } from "react-native-paper";
import { mColor , w } from "../SuportFiles/constanse";





const Header = props => {

  return (
    <View>
      <Appbar.Header style={[styles.Appbar]}>
        <View style={{ flexDirection: "row"  , paddingHorizontal: 10 , justifyContent: "space-between" , width: w}}>
         
          <View style={{ justifyContent: 'center' }}>
            {props.type === "rus" ? (
              <Text style={{  fontWeight: 'bold', fontSize: 20 , color: mColor }}>
              {props.title}
            </Text>
            ):(
              <Text style={{  fontFamily: "FredokaOne" , fontSize: 18 , color: mColor }}>
              {props.title}
            </Text>
            )}
          </View>
          <View>
            <Appbar.Action icon="person" color={mColor}  onPress={this._onMore} />
          </View>
        </View>
      </Appbar.Header>
    </View>
  );
};

const styles = StyleSheet.create({
  Appbar: {
    marginTop: 24,
    backgroundColor: "#fff",
    elevation: 2
  },
  textcontent: {
    fontWeight: "bold",
    fontFamily: "fedoka"
  }
});

export { Header };
