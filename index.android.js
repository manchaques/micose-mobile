import React, {Component} from 'react';
import {
    AppRegistry,
    View
} from 'react-native';

import thunkMiddleware from 'redux-thunk'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'

import reducers from './src/reducers/reducers';
import App from './src/components/App';

let store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware
    )
);

class MicoseMobile extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Provider store={store} style={{flex: 1}}>
                <App/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('MicoseMobile', () => MicoseMobile);
