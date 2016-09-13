import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 12,
        fontSize: 12,
    }
});


class Book extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}

export default Book;