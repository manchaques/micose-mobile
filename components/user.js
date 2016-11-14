import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class User extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.user}>
                    {this.props.user.pseudo}
                </Text>
                <Text style={styles.books}>
                    {this.props.user.books.length} {(this.props.user.books.length > 1 ? 'books' : 'book')}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 8
    },
    user: {
        flex: 1,
        flexDirection: 'row',
        fontSize: 16,
        height: 40
    }
});

export default User;