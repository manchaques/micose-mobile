import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'

import LoginButton from '../components/LoginButton';
import {signInGoogle, trySignInGoogle, failTryLogin} from '../actions/loginActions';

const mapStateToProps = (state) => {
    return {
        loading: state.login.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPress: () => {
            dispatch(signInGoogle())
                .then(() => {
                    Actions.home()
                })
        },
        onMount: () => {
            dispatch(trySignInGoogle())
                .then(() => {
                    Actions.home()
                })
                .catch(() => {
                    dispatch(failTryLogin())
                })
        }
    };
};

const GoogleLogin = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginButton);

export default GoogleLogin;