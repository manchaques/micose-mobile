import React, {PropTypes} from 'react';
import {
    AppRegistry,
    View,
    ListView,
    StyleSheet,
    RefreshControl
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import Book from './Book';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.title !== r2.title});

const Books = ({community, loading, books, isRefreshing, onRefresh}) => (
    <View style={{flex: 1}}>
        <Spinner visible={loading}/>
        <ListView
            style={styles.books}
            dataSource={ds.cloneWithRows(books)}
            renderRow={(rowData) => <Book book={rowData} />}
            refreshControl = {
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={() => onRefresh(community)}
                />
            }
        />
    </View>
);

Books.propTypes = {
    community: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    books: PropTypes.arrayOf(Book).isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    books: {
        flex: 1
    },
});

export default Books;