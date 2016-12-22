import React, {PropTypes} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const User = ({user}) => {
    if (user) {
        return (
            <View style={styles.container}>
                <View style={styles.user}>
                    <Image source={{uri: user.avatarUrl}} style={styles.avatar}/>
                    <Text style={styles.pseudo}>
                        {user.pseudo}
                    </Text>
                </View>
                <Text style={styles.books}>
                    {user.books.length} {(user.books.length > 1 ? 'books' : 'book')}
                </Text>
            </View>
        )
    } else {
        return (
            <View />
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
        flexDirection: 'row'
    },
    pseudo: {
        fontSize: 16,
        height: 40,
        alignItems: 'center'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: 'cover'
    },
    books: {
        justifyContent: 'center'
    }
});

export default User;