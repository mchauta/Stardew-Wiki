import React, { Component } from "react";
import { StyleSheet, Text, View, WebView, ScrollView, Image } from "react-native";
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';
import ajax from '../ajax';
import HTMLView from 'react-native-htmlview';


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
     console.log(this.state.data.parse.text['*']);

  }

  static navigationOptions = ({ navigation }) => ({

    title: navigation.state.params.pageName,
  })



  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>

        {this.state.data.parse ? (
          <ScrollView>
              <HTMLView
                style={styles.web}
                value={this.state.data.parse.text['*']}
                stylesheet={webstyles}
                onLinkPress={(url) => navigate("SingleCat", {pageName: url.replace("/","")})}
                renderNode = {
                  function renderNode(node, index, siblings, parent, defaultRenderer) {
                      if (node.name == 'img') {
                        const a = node.attribs;
                        //const imgHtml = `<img src="${a.src}"></img>`;
                        return (
                          <Image
                            style={{width: Number(a.width), height: Number(a.height)}}
                            source={{uri: 'https://stardewvalleywiki.com/' + a.src}}
                          />
                        );
                      }
                    }
                }

              />
          </ScrollView>

       ) : (
         <Text style={styles.welcome}>Loading...</Text>
       )}

      </View>

    );
  }
}

var webstyles = StyleSheet.create({

})

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
    overflow: 'scroll',
  }
});

export default SingleCat;
