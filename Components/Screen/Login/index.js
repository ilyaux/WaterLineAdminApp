import { createStackNavigator } from 'react-navigation'
import { LOGINPAGE } from "../../SuportFiles/routes"
import Login from './Login'


export default createStackNavigator(
  { 
      [LOGINPAGE]:Login
  },
  {
    initialRouteKey: LOGINPAGE,
    headerMode: 'none'
  }
)