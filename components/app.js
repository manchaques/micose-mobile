import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    DrawerLayoutAndroid
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import _ from 'lodash';
import Spinner from 'react-native-loading-spinner-overlay';

import Drawer from './drawer';
import Library from './library';
import SearchBar from './searchBar';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            loading: false
        };
    }

    componentDidMount() {
        this._setupGoogleSignin();
    }

    render() {
        if (!this.state.user) {
            if (this.state.loading) {
                return (
                    <Spinner visible={!this.state.loaded}/>
                );
            } else {
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
        } else {
            let navigationView = (
                <Drawer
                    user={this.state.user}
                    signOut={this._signOut.bind(this)}
                    onCommunityChanged={this._communityChanged.bind(this)}
                />
            );

            return (
                <DrawerLayoutAndroid
                    drawerWidth={300}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() => navigationView}>
                    <View style={{flex: 1}}>
                        <Library
                            style={styles.books}
                            community={this.state.community}
                        />
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
            this.fetchUser(user);
        }
        catch (err) {
            console.log("Play services error", err.code, err.message);
        }
    }

    _signIn() {
        GoogleSignin.signIn()
            .then((user) => {
                this.fetchUser(user);
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
                this.setState({
                    user: null,
                    loaded: false,
                    community: null
                });
            })
            .done();
    }

    fetchUser(googleUser) {
        this.setState({loading: true});

        fetch('https://www.micose.pierrepironin.fr/api/user/find?pseudo=' + googleUser.name.replace(' ', '_'))
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                if (!response.data) {
                    // TODO create user
                }
                return response.data;
            })
            .then((user) => {
                console.log("Micose user fetched !");
                let completeUser = user;
                _.extend(completeUser, {
                    googleProfile: googleUser
                });
                this.setState({
                    user: completeUser,
                    loading: false,
                    community: completeUser.communities.length ? completeUser.communities[0].id : null
                });
            })
            .catch((error) => {
                console.warn(error);
            })
            .done();
    }

    _communityChanged(community) {
        this.setState({
            community: community
        })
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
