import React, {PropTypes} from 'react';
import {Actions, Scene, Router} from 'react-native-router-flux';

import GoogleLogin from '../containers/GoogleLogin';
import CommunityHome from '../containers/CommunityHome';

const scenes = Actions.create(
    <Scene key="root" hideNavBar={true} >
        <Scene key="login" component={GoogleLogin} title="Login" initial={true} type="modal"/>
        <Scene key="home" component={CommunityHome} title="Home"/>
    </Scene>
);

const MainRouter = ({reducerCreate}) => (
    <Router
        createReducer={reducerCreate}
        scenes={scenes}/>
);

Router.propTypes = {
    reducerCreate: PropTypes.func.isRequired
};

export default MainRouter;
