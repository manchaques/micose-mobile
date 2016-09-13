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
    Text
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

class Book extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <Text style={{flex: 1}}>Hello {this.props.title}</Text>
        );
    }
}

class MicoseMobile extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.title !== r2.title});

        this.state = {
            loading: true,
            dataSource: ds
        }
    }

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks() {
        fetch('https://www.micose.pierrepironin.fr/api/books/')
            .then((response) => response.json())
            .then((responseData) => {
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.title !== r2.title});
                this.setState({
                    dataSource: ds.cloneWithRows(responseData)
                })
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
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Book title={rowData.title}/>}
                />
            </View>
        );
    }
}

AppRegistry.registerComponent('MicoseMobile', () => MicoseMobile);
