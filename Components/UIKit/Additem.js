import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { Appbar } from "react-native-paper";
import { mColor, sColor, tColor } from "../SuportFiles/constanse";

const AddItem = props => {
  return (
    <TouchableHighlight
      style={{
        paddingHorizontal: 16,
        height: 54,
        justifyContent: "center",
        backgroundColor: props.bColor,
        borderRadius: 4,
        borderWidth: props.bBorWid !== undefined ? props.bBorWid : null,
        borderColor: props.bBorColr !== undefined ? props.bBorColr : null
      }}
      onPress={props.CreateNew}
    >
      <View style={styles.textviewc}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: props.tColr !== undefined ? props.tColr : "#FFFFFF" }}>
          {props.Addtext}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  textviewc: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export { AddItem };
