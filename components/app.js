import React, {Component} from 'react';
import {
    View
} from 'react-native';

import Library from './library';

class App extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Library/>
            </View>
        );
    }
}

export default App;
