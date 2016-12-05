import React, {PropTypes} from 'react';
import {
    AppRegistry,
    View,
    ListView,
    StyleSheet,
    RefreshControl
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import User from './User';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.pseudo !== r2.pseudo});

const Users = ({loading, users, isRefreshing, onRefresh}) => (
    <View style={{flex: 1}}>
        <Spinner visible={loading}/>
        <ListView
            style={styles.users}
            dataSource={ds.cloneWithRows(users)}
            renderRow={(rowData) => <User user={rowData}/>}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />
            }
        />
    </View>
);

Users.propTypes = {
    loading: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(User).isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    books: {
        flex: 1
    },
});

export default Users;