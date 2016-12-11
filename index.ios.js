import React, {Component} from 'react';
import {
    AppRegistry,
    View
} from 'react-native';

import App from './src/containers/App';

class MicoseMobile extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <App/>
            </View>
        );
    }
}

AppRegistry.registerComponent('MicoseMobile', () => MicoseMobile);
