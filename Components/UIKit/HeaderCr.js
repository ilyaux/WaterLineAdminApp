import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { mColor, sColor, tColor } from "../SuportFiles/constanse"

const HeaderCr = props => {
  return (
    <View>
      <Appbar.Header style={[styles.Appbar]}>
        <Appbar.BackAction onPress={props.onPress} />
        <Appbar.Content
          color={mColor}
          style={[styles.textcontent]}
          title={props.title}
        />
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
    fontWeight: "bold"
  }
});

export { HeaderCr };
