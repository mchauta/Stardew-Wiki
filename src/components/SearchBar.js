
import React, { Component } from "react";
import { TextInput, StyleSheet  } from "react-native";
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

export default class SearchBar extends Component<{}> {

  static propTypes = {
    searchWiki: PropTypes.func.isRequired,
  };

  state= {
    searchTerm: '',
  }

debouncedSearchWiki = debounce(this.props.searchWiki, 300);
handleChange = (searchTerm) => {
  this.setState({searchTerm}, () => {
    this.debouncedSearchWiki(this.state.searchTerm);
  });
};
  render() {
    return(
      <TextInput
        style= {styles.input}
        placeholder= "Search Stardew Wiki"
        onChangeText={this.handleChange}/>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    padding: 5,

  }
})
