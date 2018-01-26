import React, { Component } from "react";
import { StyleSheet, Text, View, WebView } from "react-native";
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';
import ajax from '../ajax';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  web: {
    width: '100%',
    flex: 1,
  }
});

class SingleCat extends React.Component {

  static propTypes = {
    //category: PropTypes.object.isRequired,
  };

  state = {
    data: [],
  };
  async componentDidMount() {
     const { params } = this.props.navigation.state;
     const singlePageData = await ajax.fetchSinglePage (params.pageName);
     this.setState({ data: singlePageData });
     console.log(this.state.data);


  }

  static navigationOptions = ({ navigation }) => ({

    title: navigation.state.params.pageName,
  })



  render() {
    const { params } = this.props.navigation.state;
    return (

      <View style={styles.container}>

        {this.state.data.parse ? (

          <WebView
            style={styles.web}
            source={{uri: 'https://stardewvalleywiki.com/?curid=' + this.state.data.parse.pageid}}
            javascriptEnable= {false}
            thirdPartyCookiesEnabled={false}
          />

       ) : (
         <Text style={styles.welcome}>Loading...</Text>
       )}

      </View>
    );
  }
}



export default SingleCat;
