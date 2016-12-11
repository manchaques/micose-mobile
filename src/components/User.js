import React, {PropTypes} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const User = ({user}) => {
    if (user) {
        return (
            <View style={styles.container}>
                <Text style={styles.user}>
                    {user.pseudo}
                </Text>
                <Text style={styles.books}>
                    {user.books.length} {(user.books.length > 1 ? 'books' : 'book')}
                </Text>
            </View>
        )
    }
};

User.propTypes = {
    user: PropTypes.shape({
        pseudo: PropTypes.string,
        books: PropTypes.array
    })
};

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