import React, {Component, PropTypes} from 'react';
import {View, StyleSheet, DrawerLayoutAndroid} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import Library from './Library';
import MainDrawer from '../containers/MainDrawer';

class Home extends Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        community: PropTypes.number.isRequired,
        onMount: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.onMount(this.props.community)
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
                    </View>
                </DrawerLayoutAndroid>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    books: {
        flex: 10,
        marginTop: 20,
    }
});

export default Home;