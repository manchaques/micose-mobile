import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    DrawerLayoutAndroid
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import Drawer from './drawer';
import Library from './library';
import SearchBar from './searchBar';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    componentDidMount() {
        this._setupGoogleSignin();
    }

    render() {
        if (!this.state.user) {
            return (
                <View style={styles.googleSigninButton}>
                    <GoogleSigninButton
                        style={{width: 312, height: 48}}
                        color={GoogleSigninButton.Color.Light}
                        size={GoogleSigninButton.Size.Wide}
                        onPress={() => {
                            this._signIn();
                        }}/>
                </View>
            );
        }

        if (this.state.user) {
            let navigationView = (
                <Drawer user={this.state.user} signOut={this._signOut.bind(this)}/>
            );

            return (
                <DrawerLayoutAndroid
                    drawerWidth={300}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() => navigationView}>
                    <View style={{flex: 1}}>
                        <Library
                            style={styles.books}/>
                        <SearchBar
                            style={styles.searchBar}/>
                    </View>
                </DrawerLayoutAndroid>
            );
        }
    }

    async _setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({autoResolve: true});
            await GoogleSignin.configure();

            const user = await GoogleSignin.currentUserAsync();
            this.setState({user});
        }
        catch (err) {
            console.log("Play services error", err.code, err.message);
        }
    }

    _signIn() {
        GoogleSignin.signIn()
            .then((user) => {
                console.log(user);
                this.setState({user: user});
            })
            .catch((err) => {
                console.log('WRONG SIGNIN', err);
            })
            .done();
    }

    _signOut() {
        GoogleSignin.revokeAccess()
            .then(() => GoogleSignin.signOut())
            .then(() => {
                this.setState({user: null});
            })
            .done();
    }
}

const styles = StyleSheet.create({
    searchBar: {
        flex: 1
    },
    books: {
        flex: 10,
        marginTop: 20,
    },

    googleSigninButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

export default App;
