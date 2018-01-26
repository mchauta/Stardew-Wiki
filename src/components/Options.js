import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

class Options extends React.Component {
  static navigationOptions = {
    title: 'Options',
  };
  render() {
    
    return (
      <View>
        <Text>Options</Text>
      </View>
    );
  }
}



export default Options;
