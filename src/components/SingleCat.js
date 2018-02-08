import React, { Component } from "react";
import { StyleSheet, Text, View, WebView, ScrollView, Image, TouchableOpacity, Dimensions, FlatList, LayoutAnimation } from "react-native";
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
     LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

  }



  static navigationOptions = ({ navigation }) => ({

    title: navigation.state.params.pageName.replace("_", " "),
  })


  sortCoords = (a, b) => {
    if (a[1] && b[1]) {
      if (a[1] < b[1]) return -1;
      if (a[1] > b[1]) return 1;
      return 0;

    }
  }

  onLayout = (e) => {

        var arrayvar = this.state.coords.slice();
        arrayvar.push([e.nativeEvent.layout.x,  e.nativeEvent.layout.y])

        this.setState({ coords: arrayvar }, () => {
              var r = [];
              var keys = this.state.tocData;
              var values = this.state.coords;
              values = values.sort(this.sortCoords);
              for (i = 0; i < keys.length; i++) {

                  r[i] = [keys[i], values[i]];
                }
              //place a back to top button at beginning of array
              r.unshift(["Back to the top", [0, 0]]);

              this.setState({toc: r});
          });
    }

    buildTOCData = (text) => {
      setTimeout(() => {
        var tempArray = this.state.tocData.slice();
        tempArray.push(text);
        this.setState({tocData: tempArray});
      }, 5);
    }

    //toggle the arrow for Table of Contents
            toggleArrow = () => {
              if (this.state.showTOC) {
                return(
                  <Icon
                   name='keyboard-arrow-up'
                   color='white' />
                );
              }
              return(
                <Icon
                 name='keyboard-arrow-down'
                 color='white' />);
            }

    //toggle the height of the Table of Contents
            toggleHeight = () => {
              if (this.state.showTOC) {
                return({height: '30%',});
              }
              return({height: 0,});
            }

//toggle the Table of Contents
        toggleTOC = () => {
          this.setState({showTOC: !this.state.showTOC});
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        }

//toggle the Table of Contents
        renderTOCList = (item, index) => {
          if (index === 0) {
            return (
              <Text style={styles.listItemTop}>{item[0]}</Text>
            );
          }
            return (
              <Text style={styles.listItem}>{index}. {item[0]}</Text>
            );
          }




//render the Table of Contents
    renderTOC = () => {

       if (this.state.toc.length > 0) {

         return (
           <View style={styles.head}>
               <FlatList
                ref="_toc"
                style={this.toggleHeight()}
                data={this.state.toc}
                keyExtractor={(item, index) => index}
                renderItem={({item, index}) =>
                <TouchableOpacity onPress={() => this.refs._scrollView.scrollTo({x: item[1][0], y: item[1][1]})}>
                  { this.renderTOCList(item, index) }
                </TouchableOpacity>
                }
                />

                <TouchableOpacity
                style={styles.tocContainer}
                 onPress={this.toggleTOC}>
                   <Text style={styles.tocButton}> Table of Contents </Text>
                   { this.toggleArrow() }
                 </TouchableOpacity>
             </View>

         );
       }
       return (
         <View
          style={styles.tocContainer}>

          <Text style={styles.tocButton}>Table of Contents Loading...</Text>

        </View>
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
                            style={[styles, { marginTop: 20, fontWeight: 'bold',}]}>{ children } </Text>
                          );
                        },

                          table: (htmlAttribs, children, styles, passProps) => {
                            //if has id render as view instead of scrollview
                            if (htmlAttribs && htmlAttribs.id =='infoboxtable') {
                              return (
                                <View
                                  style={styles}
                                  key={passProps.key}>
                                  { children }
                                </View>
                              );
                              }

                            return (
                              <ScrollView
                                horizontal={true}
                                directionalLockEnabled={false}
                                key={passProps.key}
                                >
                                <View
                                  style={styles}>
                                    { children }
                                </View>
                                </ScrollView>

                            );
                          }
                }}
                tagsStyles={{

                  h3: {
                    fontSize: 40,
                  },

                    tr: {
                      flexDirection: 'row',
                      flex: 1,
                      alignItems: 'center',
                      //justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      minWidth: Dimensions.get('window').width - 20,
                    },

                    th : {
                      flex: 1,
                      alignSelf: 'stretch',
                      backgroundColor: '#44DB5E',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRightWidth: 1,
                      borderColor: 'white',
                      padding: 10,
                      //minWidth: 200,
                      maxWidth: Dimensions.get('window').width,


                    },
                    li: {
                      minWidth:75,
                      minHeight: 16,
                    },
                    td : {
                      //minWidth: 200,
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
                      borderColor: 'white',
                      maxWidth: Dimensions.get('window').width,


                    },

                    table: {


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
    //flex: 1,
    width: '100%',
  },
  toc: {
    padding: 10,
    height: 0,
    width: '100%'
  },
  tocArrow: {
    fontSize: 40,
  },
  tocButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tocContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    width: '100%',
    backgroundColor: '#0076FF',


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
    backgroundColor: '#0076FF',
    padding: 5,
    overflow: 'hidden',
    fontSize: 18,
    color: 'white',
  },
  listItemTop: {
    flex: 1,
    textAlign: 'center',
    margin: 5,
    backgroundColor: '#44DB5E',
    padding: 5,
    overflow: 'hidden',
    fontSize: 18,
    color: 'white',
  },

});

export default SingleCat;
