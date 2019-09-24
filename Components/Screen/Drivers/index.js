import { createStackNavigator } from "react-navigation";
import { DRIVERSPAGE } from "../../SuportFiles/routes";
import Dirvers from './Drivers'


export default createStackNavigator(
  {
    [DRIVERSPAGE]: Dirvers
  },
  {
    initialRouteKey:DRIVERSPAGE,
    headerMode: "none"
  }
);
