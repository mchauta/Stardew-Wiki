import React, { Component } from "react";
import { StyleSheet, Text, View, WebView, ScrollView, Image, TouchableOpacity, FlatList, Dimensions  } from "react-native";
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';
import ajax from '../ajax';
import HTML from 'react-native-render-html';



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
          console.log(node.attribs.style, "Styles being removed:");
          node.attribs.style = '';
          return node;
        }
      }
    }
    return (

      <View style={styles.container}>

        {this.state.data.parse ? (
          <ScrollView style={styles.web}>
              <HTML

                html={this.state.data.parse.text['*']}
                onLinkPress={(evt, href) => navigate("SingleCat", {pageName: href.replace("/","")})}
                ignoredTags={['head', 'scripts', 'audio', 'video', 'track', 'embed', 'object', 'param', 'source', 'canvas', 'noscript',
                    'caption', 'col', 'colgroup', 'button', 'datalist', 'fieldset', 'form',
                    'input', 'label', 'legend', 'meter', 'optgroup', 'option', 'output', 'progress', 'select', 'textarea', 'details', 'diaglog',
                    'menu', 'menuitem', 'summary']}
                alterNode = {alterNode}
                //imagesMaxWidth={Dimensions.get('window').width - 50}
                tagsStyles={{
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
                      fontSize: 12,
                      fontWeight: 'bold',
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
                      fontSize: 12,

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

       ) : (
         <View style={styles.container}>
           <Image
            style={styles.loadImg}
             source={require('../img/Dog.gif')}
           />
          <Text style={styles.loading}>Loading...</Text>
         </View>
       )}

      </View>

    );
  }
}


const styles = StyleSheet.create({
  loadImg: {

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

});

export default SingleCat;
