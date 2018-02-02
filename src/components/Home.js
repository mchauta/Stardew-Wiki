/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import ajax from '../ajax';
import SearchBar from './SearchBar';
import { StackNavigator } from 'react-navigation';


export default class Home extends Component<{}> {
  state = {
    categories: [],
    searchResults: [],
  };


  searchWiki = async (searchTerm) => {
    let searchResults = [];
    if (searchTerm) {
     const searchData = await ajax.fetchSearchResults(searchTerm);
     this.setState({ searchResults: searchData.query.search });
     console.log(this.state.searchResults);
   } else {
     this.setState({searchResults: []});
   }
  }




  static navigationOptions = {
    title: "Stardew Valley Wiki",
  }
  async componentDidMount() {
     const catData = await ajax.fetchCategories ();
     console.log(catData, 'catData');
     this.setState({ categories: catData.query.pages[4].links });
     console.log(this.state.categories, 'categories');

  }
  render() {
    const { navigate } = this.props.navigation;
    console.log(this.state.searchResults);
    const resultsToDisplay = this.state.searchResults.length > 0
     ? this.state.searchResults
     : this.state.categories;

    if (resultsToDisplay) {

      return(
      <View style={styles.container}>
        <View style={styles.head}>
          <Image
           style={styles.welcomeImg}
            source={require('../img/Cat.gif')}
          />
          <SearchBar searchWiki={this.searchWiki}/>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={resultsToDisplay}
            renderItem={({item}) =>
              <TouchableOpacity onPress={() => navigate("SingleCat", {pageName: item.title})}>
                <Text style={styles.listItem}>{item.title}</Text>
              </TouchableOpacity>
            }

            keyExtractor={item => item.title}
          />
        </View>
       </View>
     );
   }
    return (
         <View style={styles.welcomeContainer}>
           <View style={styles.welcome}>
             <Text style={{fontSize: 30}}>Stardew Valley Wiki</Text>
          </View>
          <View style={styles.welcomeImg}>
               <Image
                 source={require('../img/Abigail.gif')}
               />
             </View>
         </View>
       );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 3,
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#F5FCFF',
  },
  head: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: -3
    },
    shadowRadius: 5,
    shadowOpacity: .5

  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    //alignItems: 'center',
    //width: '100%',

  },
  welcome: {
    flex: 1,
    justifyContent: 'center',

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
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    //width: '100%',
    alignItems: 'center',

  },
  welcomeImg: {
    justifyContent: 'flex-start',
    flex: 1,
  }
});
