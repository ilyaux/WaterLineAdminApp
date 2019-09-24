import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./Components/Screen/Login/Login";
import Home from "./Components/Screen/Mane/Home";
import Drivers from "./Components/Screen/Drivers/Drivers";
import MapPage from "./Components/Screen/Mane/MapPage"
import ViewFactory from "./Components/Screen/Mane/ViewFactory"
import ViewPoints from "./Components/Screen/Mane/ViewPoints"
import CreateNavigation from "./Components/Screen/Mane/CreateNavigation";
import CreateFactory from "./Components/Screen/Mane/CreateFactory"
import {
  LOGINPAGE,
  HOMEPAGE,
  CREATEPAGE,
  MAPPAGE,
  VIEWFACTORY,
  CREATEFACROTY,
  VIEWPOINTS,
  DRIVERSPAGE
} from "./Components/SuportFiles/routes";
import Ionicons from "react-native-vector-icons/Ionicons";
import { mColor, sColor } from "./Components/SuportFiles/constanse";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";



const homeicon = ({ tintColor }) => (
  <Ionicons name="ios-list" size={22} color={tintColor} />
);

const driversicon = ({ tintColor }) => (
  <Ionicons name="ios-person" size={22} color={tintColor} />
);


const LoginController = createStackNavigator(
  {
    [LOGINPAGE]: Login
  },
  {
    initialRouteKey: LOGINPAGE,
    headerMode: "none"
  }
);

const MapController = createStackNavigator(
  {
    [MAPPAGE]: MapPage
  },
  {
    initialRouteKey: MAPPAGE,
    headerMode: "none"
  }
);

const DriversController = createStackNavigator(
  {
    [DRIVERSPAGE]: Drivers
  },
  {
    initialRouteKey: DRIVERSPAGE,
    headerMode: "none"
  }
);

const CreateFactoryController = createStackNavigator(
  {
    [CREATEFACROTY]: CreateFactory
  },
  {
    initialRouteKey: CREATEFACROTY,
    headerMode: "none"
  }
);

const ViewFactoryController = createStackNavigator(
  {
    [VIEWFACTORY]: ViewFactory
  },
  {
    initialRouteKey: VIEWFACTORY,
    headerMode: "none"
  }
);

const ViewPoinsController = createStackNavigator(
  {
    [VIEWPOINTS]: ViewPoints
  },
  {
    initialRouteKey: VIEWPOINTS,
    headerMode: "none"
  }
);

export const MainView = createBottomTabNavigator(
  {
    Маршруты: {
      screen: Home,
      navigationOptions: { tabBarIcon: homeicon }
    },
    Водители: {
      screen: DriversController,
      navigationOptions: { tabBarIcon: driversicon }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: mColor,
      style: {
        backgroundColor: sColor
      }
    },
    initialRouteKey: "Водители",
    headerMode: "none",
    barStyle: { backgroundColor: mColor }
  }
);

const RootNavigation = createStackNavigator(
  {
    Логин: {
      screen: LoginController
    },
    [HOMEPAGE]: {
      screen: MainView
    },
    [CREATEPAGE]: {
      screen: CreateNavigation
    },
    [MAPPAGE]: {
      screen: MapController
    },
    [VIEWFACTORY]: {
      screen: ViewFactoryController
    },
    [CREATEFACROTY]: {
      screen: CreateFactoryController
    },
    [VIEWPOINTS]: {
      screen: ViewPoinsController
    }
  },
  {
    tabBarOptions: {
      activeTintColor: mColor,
      style: {
        backgroundColor: sColor
      }
    },
    initialRouteKey: "Логин",
    headerMode: "none",
    barStyle: { backgroundColor: mColor }
  }
);

export default RootNavigation;
