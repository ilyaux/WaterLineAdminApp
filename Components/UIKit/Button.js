import React, { Component } from "react";
import { View, Text, StyleSheet, w, TouchableOpacity } from "react-native";
import { mColor, sColor, tColor } from "../SuportFiles/constanse"

const Button = props => {
  return (
    <View style={styles.mainview}>
      <TouchableOpacity style={styles.textview} onPress={props.Auth}>
        <View style={styles.textview}>
          <Text style={{ fontSize: 24, color: mColor, fontWeight: "bold" }}>
           {props.ButtonText}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainview: {
    width: w,
    backgroundColor: sColor,
    height: 64,
    borderRadius: 4
  },
  textview: {
    paddingTop: 8,  
    alignItems: "center",
    justifyContent: "center"
  }
});

export { Button };
