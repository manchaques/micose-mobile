import React, {Component, PropTypes} from 'react';
import {View, StyleSheet, DrawerLayoutAndroid} from 'react-native';
import {connect} from 'react-redux';

import Spinner from 'react-native-loading-spinner-overlay';

import Library from './Library';
import SearchBar from './SearchBar';
import MainDrawer from '../containers/MainDrawer';
import {fetchBooks} from '../actions/bookActions';
import {fetchUsers} from '../actions/userActions';

class Home extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        loading: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        community: PropTypes.number.isRequired
    };

    componentDidMount() {
        this.props.dispatch(fetchBooks(this.props.community));
        this.props.dispatch(fetchUsers(this.props.community));
    }

    render() {
        let NavigationView = (
            <MainDrawer />
        );

        return (
            <View style={{flex: 1}}>
                <Spinner visible={this.props.loading}/>
                <DrawerLayoutAndroid
                    drawerWidth={300}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() => NavigationView}>
                    <View style={{flex: 1}}>
                        <Library style={styles.books} />
                        <SearchBar style={styles.searchBar} />
                    </View>
                </DrawerLayoutAndroid>
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

export default connect()(Home);