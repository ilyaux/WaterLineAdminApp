import React, { Component } from "react";
import { View, Text } from "react-native";
import {  w } from "../SuportFiles/constanse"

const ErrorMessage = props => { 
   return(
       <View style={{ width: w , height: 30 , backgroundColor: props.BackColor }}>
           <View style={{ justifyContent: 'center' , alignItems: 'center' , paddingTop: 7 }}> 
               <Text  style={{ color: props.textColor , fontSize: 12 , fontWeight: 'bold' }}>  {props.Message } </Text>
           </View>
       </View>
   )
}


export { ErrorMessage }
