import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    DrawerLayoutAndroid,
    Text,
    Image,
    TouchableNativeFeedback
} from 'react-native';

import Hr from 'react-native-hr';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

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
                <View style={styles.drawer}>
                    <View style={styles.user}>
                        <View style={styles.thumbnailUser}>
                            <Image source={{uri: this.state.user.photo}} style={styles.userPhoto}/>
                        </View>
                        <Text style={styles.userName}>
                            {this.state.user.name}
                        </Text>
                        <Hr lineColor='gainsboro' styles={styles.separator}/>
                    </View>

                    <View style={styles.actions}>
                        <TouchableNativeFeedback
                            onPress={this._signOut.bind(this)}
                            background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
                            <View style={styles.logoutContainer}>
                                <Icon
                                    name="exit-to-app"
                                    size={20}
                                    style={styles.logoutButton}
                                />
                                <Text style={styles.logoutText}>Logout</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>

                    <View style={styles.footer}>
                        <Text>Manchaques Team - 2016</Text>
                    </View>
                </View>
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

    drawer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    separator: {
        height: 3
    },

    user: {
        flex: 2,
        paddingTop: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    thumbnailUser: {},
    userName: {},
    userPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: 'cover'
    },

    actions: {
        flex: 10
    },
    logoutContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    logoutButton: {
        flex: 1,
        paddingTop: 2,
        paddingLeft: 10,
    },
    logoutText: {
        flex: 1,
        alignItems: 'flex-start'
    },

    footer: {
        flex: 1,
        alignItems: 'center'
    },

    googleSigninButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

export default App;
