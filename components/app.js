import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import Library from './library';
import SearchBar from './searchBar';

class App extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Library
                    style={styles.books}/>
                <SearchBar
                    style={styles.searchBar}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchBar: {
        flex: 1
    },
    books: {
        flex: 10,
        marginTop: 20,
    }
});

export default App;
