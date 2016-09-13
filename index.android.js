/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    ListView,
    StyleSheet
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import Book from './components/book';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.title !== r2.title});

class MicoseMobile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            dataSource: ds.cloneWithRows([])
        }
    }

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks() {
        fetch('https://www.micose.pierrepironin.fr/api/books/')
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                this.setState({
                    loading: false,
                    dataSource: ds.cloneWithRows(responseData.data)
                });
            })
            .catch((error) => {
                console.warn(error);
            })
            .done();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Spinner visible={this.state.loading}/>
                <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Book title={rowData.title}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
});

AppRegistry.registerComponent('MicoseMobile', () => MicoseMobile);
