import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Actions, Scene, Router, Reducer} from 'react-native-router-flux';

import GoogleLogin from '../containers/GoogleLogin';
import CommunityHome from '../containers/CommunityHome';

const scenes = Actions.create(
    <Scene key="root" hideNavBar={true} >
        <Scene key="login" component={GoogleLogin} title="Login" initial={true} type="modal"/>
        <Scene key="home" component={CommunityHome} title="Home"/>
    </Scene>
);

class App extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
    };

    reducerCreate(params) {
        const defaultReducer = Reducer(params);
        return (state, action) => {
            this.props.dispatch(action);
            return defaultReducer(state, action);
        };
    }

    render() {
        return (
            <Router
                createReducer={this.reducerCreate.bind(this)}
                scenes={scenes}/>
        );
    }
}

export default connect()(App);
