import React, {PropTypes} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

const SearchBar = ({filter, onChangeText}) => (
    <TextInput
        onChangeText={onChangeText}
        value={filter}
        placeholder="Search for a comic..."
    />
);

SearchBar.propTypes = {
    filter: PropTypes.string,
    onChangeText: PropTypes.func
};

export default SearchBar;