import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

import moment from 'moment';

const styles = StyleSheet.create({
});


class SearchBar extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            //<View style={styles.container}>
                <TextInput
                    //style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    //onChangeText={(text) => this.setState({text})}
                    //value={this.state.text}
                    placeholder="Search for a comic..."
                />
            //</View>
        );
    }
}

export default SearchBar;