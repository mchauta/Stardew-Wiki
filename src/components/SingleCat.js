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

                      console.log(node.name);
                      switch (node.name) {

                        case 'img':

                          a = node.attribs;
                          return (
                            <Image
                              key={index}
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
                              key={b + index} >
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );

                          case 'body':
                          a = node.attribs;

                          return (
                            <View
                              key={index} >
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );



                          case 'h4':
                          a = node.attribs;

                          return (
                            <View
                              key={index} >
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );

                          case 'h3':
                          a = node.attribs;

                          return (
                            <View
                              key={index} >
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );

                          case 'h2':
                          a = node.attribs;

                          return (
                            <View
                              key={index} >
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );







                          case 'ul':
                          a = node.attribs;

                          return (
                            <View
                              key={index} style={styles.ul}>
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );

                          case 'ol':
                          a = node.attribs;

                          return (
                            <View
                              key={index} style={styles.ol}>
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );

                          case 'li':
                          a = node.attribs;

                          return (
                            <View
                              key={index} style={styles.li}>
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );




                        case 'table' :

                          a = node.attribs;
                          return (
                            <View
                              key={index} style={styles.tableContainer}>
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );

                          case 'p' :

                            a = node.attribs;

                            return (
                              <View
                                key={index} style={styles.p}>
                                <Text>{defaultRenderer(node.children, parent)}</Text>
                              </View>
                            );

                        case 'tbody' :
                        a = node.attribs;

                          return (
                            <View
                              key={index} style={styles.tableBody}>
                              {defaultRenderer(node.children, parent)}
                            </View>

                          );

                          case 'thead':
                          a = node.attribs;

                          return (
                            <View
                              key={index} style={styles.tableHeader}>
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );

                          case 'tfoot':
                          a = node.attribs;

                          return (
                            <View
                              key={index} style={styles.tableHeader}>
                              {defaultRenderer(node.children, parent)}
                            </View>
                          );

                        case 'tr' :
                        a = node.attribs;

                        return (
                          <View
                            key={index} style={styles.tableRow}>
                            {defaultRenderer(node.children, parent)}
                          </View>

                        );


                        case 'td' :
                        a = node.attribs;

                        return (
                          <View
                            key={index} style={styles.tableData}>
                            {defaultRenderer(node.children, parent)}
                          </View>
                        );


                        case 'th':
                        a = node.attribs;

                        return (
                          <View
                            key={index} style={styles.tableHeader}>
                            {defaultRenderer(node.children, parent)}
                          </View>
                        );

                        case 'h1':
                        a = node.attribs;

                        return (
                          <Text
                            key={index} style={styles.h1}>
                            {defaultRenderer(node.children, parent)}
                          </Text>
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
  ul : {
    flex: 1,
    alignItems: 'center',
  },
  li : {
    flex: 1,

  },
  tableHeader : {
    flex: 1,
    //alignSelf: 'stretch',
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

});

export default SingleCat;
