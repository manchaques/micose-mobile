import React, {PropTypes} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import {GoogleSigninButton} from 'react-native-google-signin';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginButton = ({loading, onPress}) => (
    <View style={styles.googleSigninButton}>
        <Spinner visible={loading}/>
        <GoogleSigninButton
            style={{width: 312, height: 48}}
            color={GoogleSigninButton.Color.Light}
            size={GoogleSigninButton.Size.Wide}
            onPress={onPress}
        />
    </View>
);

LoginButton.propTypes = {
    loading: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    googleSigninButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

export default LoginButton;
