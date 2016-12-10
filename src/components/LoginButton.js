import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
    View,
    StyleSheet
} from 'react-native';

import {GoogleSigninButton} from 'react-native-google-signin';
import Spinner from 'react-native-loading-spinner-overlay';


class LoginButton extends Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        onMount: PropTypes.func.isRequired,
        onPress: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.onMount();
    }

    render() {
        return (
            <View style={styles.googleSigninButton}>
                <Spinner visible={this.props.loading}/>
                <GoogleSigninButton
                    style={{width: 312, height: 48}}
                    color={GoogleSigninButton.Color.Light}
                    size={GoogleSigninButton.Size.Wide}
                    onPress={this.props.onPress}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    googleSigninButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

export default LoginButton;
