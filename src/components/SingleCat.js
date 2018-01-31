import React, { Component } from "react";
import { StyleSheet, Text, View, WebView, ScrollView, Image, TouchableOpacity, FlatList  } from "react-native";
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
     //console.log(this.state.data);
     //console.log(this.state.data.parse.text['*']);

  }

  static navigationOptions = ({ navigation }) => ({

    title: navigation.state.params.pageName.replace("_", " "),
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
                value={'<body><div>' + this.state.data.parse.text['*'] + '</div></body>'}
                stylesheet={webstyles}
                onLinkPress={(url) => navigate("SingleCat", {pageName: url.replace("/","")})}
                renderNode = {
                  function renderNode(node, index, siblings, parent, defaultRenderer) {
                      var a;
                      var b;
                      switch (node.name) {

                        case 'img':

                          a = node.attribs;
                          return (
                            <Image
                              key={'image' - index}
                              style={[styles.image,  {width: Number(a.width), height: Number(a.height)}]}
                              source={{uri: 'https://stardewvalleywiki.com/' + a.src}}
                            />
                          );

                          case 'div':
                          a = node.attribs;
                          //console.log(a);
                          if (a.class) {
                            b = a.class;
                          } else {
                            b = index;
                          }
                          return (
                            <View
                              key={'div-' + b + index} >
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );

                          case 'body':
                          return (
                            <View
                              key={'body' + index}>
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );



                          case 'ul':
                          return (
                            <View
                              key={index} style={styles.test}>
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );

                        case 'em':
                            return (
                              <View
                                key={index}>
                                {defaultRenderer(node.children, parent)}
                              </View>
                            );
                        case 'ol':
                          return (
                            <View
                              key={index} style={styles.ol}>
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );

                        case 'li':
                          return (
                            <View
                              key={'li-' + index} style={styles.li}>
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );


                        case 'table' :
                          return (
                            <View
                              key={'table-' +  index} style={styles.tableContainer}>
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );



                        case 'tbody' :
                          return (
                            <View
                              key={'tbody-' + index} style={styles.tableBody}>
                              {defaultRenderer(node.children, parent)}
                            </View>

                          );

                          case 'thead':
                          return (
                            <View
                              key={'thead-' + index} style={styles.tableHeader}>
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );



                        case 'tr' :
                          return (
                            <View
                              key={'tr-' + index} style={styles.tableRow}>
                              {defaultRenderer(node.children, parent)}
                            </View>

                          );


                        case 'td' :
                          return (
                            <View
                              key={'td-' + index} style={styles.tableData}>
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );


                        case 'th':
                          return (
                            <View
                              key={'th-' + index} style={styles.tableHeader}>
                              {defaultRenderer(node.children, parent)}
                            </View>
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
  h1: {
    fontSize: 40,
  }

})

const styles = StyleSheet.create({
  tableRow : {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',



  },
  image: {

  },
  p: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tableData : {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 5,


  },
  test: {
    width: 150,
    height: 150,
  },
  tableHeader : {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableBody: {
    flex:1
  },
  tableContainer: {
    width: '100%',
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  web: {
    width: '100%',
    padding: 5,
  },
  ul : {
      flex: 1,
      alignItems: 'center',
    },
    li : {
      flex: 1,

    },
});

export default SingleCat;
