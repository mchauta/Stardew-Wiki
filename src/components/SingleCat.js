import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';

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

class SingleCat extends React.Component {

  static propTypes = {
    category: PropTypes.object.isRequired,
  };

  state = {
    singleCat: [],
  };
  async componentDidMount() {
     const singleCatData = await ajax.fetchSingleCat (this.props.category);
     this.setState({ singleCat: singleCatData });
     console.log(singleCat);
  }
  static navigationOptions = {
    title: '',
  };
  render() {
    
    return (
      <View>
        <Text>SingleCat</Text>
      </View>
    );
  }
}



export default SingleCat;
