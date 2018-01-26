import React from "react";
import { StackNavigator } from "react-navigation";
import { AppRegistry } from 'react-native';
import Home from './src/components/Home';
import Options from "./src/components/Options";
import SingleCat from "./src/components/SingleCat";







const App = StackNavigator({
  Home: { screen: Home },
  Options: { screen: Options },
  SingleCat: { screen: SingleCat },

});

AppRegistry.registerComponent('Stardew', () => App);
