import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    ListView,
    StyleSheet,
    RefreshControl
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import Book from './book';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.title !== r2.title});

class BooksView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            dataSource: ds.cloneWithRows([]),
            isRefreshing: false
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
            .then((response) => {
                // Sort by title and subtitle
                if (!response.data) {
                    return [];
                }
                return response.data.sort((book1, book2) => {
                    if (book1.title < book2.title) {
                        return -1;
                    } else if (book2.title > book1.title) {
                        return 1;
                    } else {
                        return book1.subtitle < book2.subtitle ? -1 : 1;
                    }
                });
            })
            .then((books) => {
                // Managed 1st loading and refreshing
                if (this.state.loading) {
                    this.setState({
                        loading: false
                    })
                } else if (this.state.isRefreshing) {
                    this.setState({
                        isRefreshing: false
                    })
                }
                // Load books
                this.setState({
                    dataSource: ds.cloneWithRows(books)
                });
            })
            .catch((error) => {
                console.warn(error);
            })
            .done();
    }

    onRefresh() {
        this.setState({isRefreshing: true});
        this.fetchBooks();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Spinner visible={this.state.loading}/>
                <ListView
                    style={styles.books}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Book book={rowData} />}
                    refreshControl = {
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    books: {
        flex: 1
    },
});

export default BooksView;