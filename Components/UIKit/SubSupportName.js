import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Appbar } from "react-native-paper";
import { mColor, sColor, tColor } from "../SuportFiles/constanse";

const SubSupportName = props => {
  return (
    <TouchableOpacity style={styles.mainview} onPress={props.SetName}>
      <View style={styles.textview}>
        <Text style={{ color: mColor, fontSize: 14 }}> {props.Subname} </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainview: {
    marginTop: 8,
    borderRadius: 2,
    height: 30,
    backgroundColor: sColor,
    borderColor: mColor,
    borderWidth: 1,

  },
  textview: {
    marginHorizontal: 8,  
    paddingTop: 4,
    justifyContent: "center",
    alignItems: "center"
  }
});

export { SubSupportName };
