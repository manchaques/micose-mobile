import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    Text
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import App from './components/app';

class MicoseMobile extends Component {
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
                <View style={styles.container}>
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
            return (
                <View style={{flex: 1}}>
                    <App/>
                </View>
            );
        }
    }

    async _setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({autoResolve: true});
            await GoogleSignin.configure();

            const user = await GoogleSignin.currentUserAsync();
            console.log(user);
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('MicoseMobile', () => MicoseMobile);
