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
//import CategoryList from './CategoryList'
import { StackNavigator } from 'react-navigation';


export default class Home extends Component<{}> {
  state = {
    categories: [],
  };
static navigationOptions = {
  title: "Stardew Valley Wiki",
}
  async componentDidMount() {
     const catData = await ajax.fetchCategories ();
     this.setState({ categories: catData });

  }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
      

        {this.state.categories.query ? (

         <FlatList
           data={this.state.categories.query.pages[4].links}
           renderItem={({item}) =>
             <TouchableOpacity onPress={() => navigate("SingleCat", {pageName: item.title})}>
               <Text style={styles.listItem}>{item.title}</Text>
             </TouchableOpacity>
           }

           keyExtractor={item => item.title}
         />
       ) : (
         <View style={styles.welcomeContainer}>
         <Text style={styles.welcome}>Stardew Valley</Text>
         <Image
          style={styles.welcomeImg}
           source={require('../img/Blue_Chicken.png')}
         />
         </View>
       )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%',

  },
  welcome: {
    //flex: 1,
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  listItem: {
    textAlign: 'center',
    margin: 5,
    backgroundColor: '#29ABE2',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: '#29ABE2',
    fontSize: 18,
    color: 'white',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%',
    alignItems: 'center',

  },
  welcomeImg: {

  }
});
