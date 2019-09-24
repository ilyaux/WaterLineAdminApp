import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Appbar } from "react-native-paper";
import { mColor, sColor, tColor , w } from "../SuportFiles/constanse";

const SwitcherButton = props => {
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 16,
        height: 54,
        width: w/2 - 16,
        justifyContent: "center",
        backgroundColor: props.bColor,

        borderTopLeftRadius: props.Curv === "false" ? 4 : null,
        borderBottomLeftRadius: props.Curv === "false" ? 4 : null,

        borderBottomRightRadius: props.Curv === "true" ? 4 : null,
        borderTopRightRadius: props.Curv === "true" ? 4 : null,

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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textviewc: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export { SwitcherButton };
