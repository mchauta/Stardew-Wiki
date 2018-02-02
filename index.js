import React from "react";
import { StackNavigator } from "react-navigation";
import { AppRegistry } from 'react-native';
import Home from './src/components/Home';
import SingleCat from "./src/components/SingleCat";







const App = StackNavigator({
  Home: { screen: Home },
  SingleCat: { screen: SingleCat },

});

AppRegistry.registerComponent('Stardew', () => App);
