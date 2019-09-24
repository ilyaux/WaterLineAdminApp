import React from 'react'
import {AppRegistry} from 'react-native'
import RootNavigation from './App'
import {name as appName} from './app.json'
AppRegistry.registerComponent(appName, () => RootNavigation)