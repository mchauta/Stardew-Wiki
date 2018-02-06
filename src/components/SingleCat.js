import React, { Component } from "react";
import { StyleSheet, Text, View, WebView, ScrollView, Image, TouchableOpacity, Dimensions, FlatList  } from "react-native";
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';
import ajax from '../ajax';
import HTML from 'react-native-render-html';
import { Icon } from 'react-native-elements';



class SingleCat extends React.Component {


  state = {
    data: [],
    coords: [],
    tocData: [],
    toc:[],
    showTOC: false,
  };


  async componentDidMount() {
     const { params } = this.props.navigation.state;
     let singlePageData = await ajax.fetchSinglePage (params.pageName);
     this.setState({ data: singlePageData });
     //console.log(this.state.data);
     //console.log(this.state.data.parse.text['*']);

  }



  static navigationOptions = ({ navigation }) => ({

    title: navigation.state.params.pageName.replace("_", " "),
  })


  sortCoords = (a, b) => {
    if (a[1] && b[1]) {
      console.log(a[1],b[1]);
      console.log('coords got inside');
      if (a[1] < b[1]) return -1;
      if (a[1] > b[1]) return 1;
      return 0;

    }
  }

  onLayout = (e) => {

        var arrayvar = this.state.coords.slice();
        arrayvar.push([e.nativeEvent.layout.x,  e.nativeEvent.layout.y])

        this.setState({ coords: arrayvar }, () => {
              console.log(this.state.coords, 'coords before');
              var r = [];
              var keys = this.state.tocData;
              var values = this.state.coords;
              values = values.sort(this.sortCoords);
              for (i = 0; i < keys.length; i++) {

                  r[i] = [keys[i], values[i]];
                }


            console.log(this.state.coords, 'coords sorted');
              this.setState({toc: r}, () => {console.log(this.state.toc, "TOC");});
          });
    }

    buildTOCData = (text) => {
      setTimeout(() => {
        var tempArray = this.state.tocData.slice();
        tempArray.push(text);
        this.setState({tocData: tempArray}, () => console.log(this.state.tocData, "after"));
      }, 5);
    }


//toggle the Table of Contents
        toggleTOC = () => {
          this.setState({showTOC: !this.state.showTOC});
        }


//render the Table of Contents
    renderTOC = () => {

       if (this.state.toc.length > 0 && this.state.showTOC) {
         console.log(this.state.toc, "inside TOC");
         return (
           <View style={styles.head}>
               <FlatList
               style={styles.toc}
                data={this.state.toc}
                keyExtractor={(item, index) => index}
                renderItem={({item, index}) =>
                <TouchableOpacity onPress={() => this.refs._scrollView.scrollTo({x: item[1][0], y: item[1][1]})}>
                  <Text style={styles.listItem}>{index + 1}. {item[0]}</Text>
                </TouchableOpacity>
                }
                />

                <TouchableOpacity
                style={styles.tocContainer}
                 onPress={this.toggleTOC}>
                   <Text> Table of Contents </Text>
                   <Icon
                    name='keyboard-arrow-up' />
                 </TouchableOpacity>
             </View>

         );
       }
       return (
         <TouchableOpacity
          onPress={this.toggleTOC}
          style={styles.tocContainer}>

          <Text>Table of Contents</Text>
          <Icon
           name='keyboard-arrow-up' />
        </TouchableOpacity>
       );

     }



  render() {


    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;


    let alterNode = (node) => {
      const { children, name } = node;

      //prepending uri for images
      if (name === 'img') {
        //console.log(node.attribs.src);
        node.attribs.src = 'https://stardewvalleywiki.com/' + node.attribs.src;
        return node;
      }
      //removing all inline styles
      if (node.attribs) {
        if (node.attribs.style) {
          node.attribs.style = '';
          return node;
        }
      }
    }

    //if there is a page to display, show it
    if (this.state.data.parse) {
    return (


      <View style={styles.container}>

          { this.renderTOC() }

          <ScrollView ref='_scrollView' style={styles.web}>
              <HTML

                html={this.state.data.parse.text['*']}
                onLinkPress={(evt, href) => navigate("SingleCat", {pageName: decodeURI(href.replace("/",""))})}
                ignoredTags={['head', 'scripts', 'audio', 'video', 'track', 'embed', 'object', 'param', 'source', 'canvas', 'noscript',
                    'caption', 'col', 'colgroup', 'button', 'datalist', 'fieldset', 'form',
                    'input', 'label', 'legend', 'meter', 'optgroup', 'option', 'output', 'progress', 'select', 'textarea', 'details', 'diaglog',
                    'menu', 'menuitem', 'summary']}
                alterNode = {alterNode}
                renderers={{
                      h2: (htmlAttribs, children, styles, passProps) => {
                        this.buildTOCData(passProps.rawChildren[0].children[0].data);
                        return(
                          <Text
                            onLayout={
                                        this.onLayout
                                      }
                            key={passProps.key}
                            style={[styles, { fontWeight: 'bold',}]}>{ children } </Text>
                          );}
                }}
                tagsStyles={{

                  h3: {
                    fontSize: 40,
                  },

                    tr: {
                      flexDirection: 'row',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      flexWrap: 'wrap',
                    },

                    th : {
                      flex: 1,
                      alignSelf: 'stretch',
                      backgroundColor: '#23356C',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRightWidth: 1,
                      borderColor: 'grey',
                      color: 'white',
                      padding: 10,
                      //fontSize: 12,
                      //fontWeight: 'bold',
                    },

                    td : {
                      flex: 1,
                      alignSelf: 'stretch',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      flexWrap:'wrap',
                      overflow: 'hidden',
                      padding: 10,
                      backgroundColor: '#F5FCFF',
                      borderWidth: 1,
                      borderColor: 'grey',
                      minWidth: 20,
                      //fontSize: 12,

                    },

                    table: {
                      borderWidth: 1,
                      borderColor: 'grey',
                      borderRadius: 5,
                    },

                    img: {
                      flex: 1,
                      maxWidth: '100%',


                    },
                  }}



              />
          </ScrollView>
          </View>
        );
       }
       //if no page to display, show loading screen
       return (
         <View style={styles.container}>
           <Image
            style={styles.loadImg}
             source={require('../img/Dog.gif')}
           />
          <Text style={styles.loading}>Loading...</Text>
         </View>
       );
     }
  }



const styles = StyleSheet.create({
  head: {
    flex: 1,
    width: '100%',
  },
  toc: {
    padding: 10,
  },
  tocArrow: {
    fontSize: 40,
  },
  tocContainer: {
    //flex:1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    borderTopColor: 'grey',
    width: '100%',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',

  },

  loading: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: 'grey'
  },
  web: {
    width: '100%',
    padding: 10,
  },
  listItem: {
    flex: 1,
    textAlign: 'center',
    margin: 5,
    backgroundColor: '#5771B7',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: '#23356C',
    fontSize: 18,
    color: 'white',
  },

});

export default SingleCat;
