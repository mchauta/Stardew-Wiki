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
  TouchableOpacity
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
     console.log(catData);
     console.log(this.state.categories);
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
      <Button
         onPress={() => navigate("Options")}
         title="Options"
     />

        {this.state.categories.query ? (
         //<CategoryList categories={this.state.categories.query} />
         <FlatList
           data={this.state.categories.query.pages[4].links}
           renderItem={({item}) =>
             <TouchableOpacity onPress={() => navigate("SingleCat")}>
               <Text style={styles.listItem}>{item.title}</Text>
             </TouchableOpacity>
           }

           keyExtractor={item => item.title}
         />
       ) : (
         <Text style={styles.welcome}>Stardew Valley</Text>
       )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%',

  },
  welcome: {
    fontSize: 20,
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
});
