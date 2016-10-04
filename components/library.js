import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    ListView,
    StyleSheet
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';

import Book from './book';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.title !== r2.title});

class Library extends Component {
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
        // fetch('http://192.168.0.12:4000/api/books/')
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                // Sort by update date
                return response.data.sort((book1, book2) => {
                    moment(book1.updateDate).isBefore(book2.updateDate)
                }).reverse();
            })
            .then((books) => {
                this.setState({
                    loading: false,
                    dataSource: ds.cloneWithRows(books)
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
                    renderRow={(rowData) => <Book book={rowData} />}
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

export default Library;