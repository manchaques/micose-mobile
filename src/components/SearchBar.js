import React, {PropTypes} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

const SearchBar = () => (
    //<View style={styles.container}>
    <TextInput
        //style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        //onChangeText={(text) => this.setState({text})}
        //value={this.state.text}
        placeholder="Search for a comic..."
    />
//</View>
);

SearchBar.propTypes = {

};

export default SearchBar;