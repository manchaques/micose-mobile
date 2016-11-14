import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    ListView,
    StyleSheet,
    RefreshControl
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import User from './user';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.title !== r2.title});

class UsersView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            dataSource: ds.cloneWithRows([]),
            isRefreshing: false
        }
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        fetch('https://www.micose.pierrepironin.fr/api/users/')
        // fetch('http://192.168.0.12:4000/api/books/')
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                // Sort by title and subtitle
                if (!response.data) {
                    return [];
                }
                return response.data.sort((user1, user2) => {
                    return user1.pseudo < user2.pseudo ? -1 : 1;
                });
            })
            .then((users) => {
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
                    dataSource: ds.cloneWithRows(users)
                });
            })
            .catch((error) => {
                console.warn(error);
            })
            .done();
    }

    onRefresh() {
        this.setState({isRefreshing: true});
        this.fetchUsers();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Spinner visible={this.state.loading}/>
                <ListView
                    style={styles.users}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <User user={rowData} />}
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
    users: {
        flex: 1
    },
});

export default UsersView;