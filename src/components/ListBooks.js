import React, {PropTypes} from 'react';
import {
    AppRegistry,
    View,
    ListView,
    StyleSheet,
    RefreshControl,
    Text
} from 'react-native';
import Hr from 'react-native-hr';

import Spinner from 'react-native-loading-spinner-overlay';

import Book from './Book';

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => (r1.title !== r2.title) && (r1.subtitle !== r2.subtitle),
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

const Books = ({community, loading, books, isRefreshing, onRefresh}) => {
    if (community) {
        return (
            <View style={{flex: 1}}>
                <Spinner visible={loading}/>
                <ListView
                    style={styles.books}
                    dataSource={ds.cloneWithRowsAndSections(books)}
                    renderRow={(rowData) => <Book book={rowData}/>}
                    renderSectionHeader={(sectionData, firstLetter) =>
                        <View>
                            <Text style={{fontWeight: "700", textAlign: 'center'}}>{firstLetter}</Text>
                            <Hr lineColor='#b3b3b3'/>
                        </View>
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={() => onRefresh(community)}
                        />
                    }
                />
            </View>
        )
    }
};

Books.propTypes = {
    community: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    // books: PropTypes.arrayOf(Book).isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    books: {
        flex: 1
    },
});

export default Books;