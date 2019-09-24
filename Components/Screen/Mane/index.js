import { createStackNavigator } from "react-navigation";
import { HOMEPAGE  , CREATEPAGE  , MAPPAGE} from "../../SuportFiles/routes";
import Home from "./Home";
import CreateNavigation from "./CreateNavigation"
import MapPage from "./MapPage"
export default createStackNavigator(
  {
    [HOMEPAGE]: Home,
    [CREATEPAGE]: CreateNavigation,
    [MAPPAGE]: MapPage
  },
  {
    initialRouteKey: HOMEPAGE,
    headerMode: "none"
  }
);
