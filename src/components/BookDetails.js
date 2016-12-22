import React, {PropTypes} from 'react';
import {View, Text, StyleSheet, Image, TouchableNativeFeedback} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const BookDetails = ({book}) => {
    if (book) {
        return (
            <Image source={{uri: book.cover_url}} style={styles.container}/>
        )
    } else {
        return (
            <View />
        )
    }
};

BookDetails.propTypes = {
    book: PropTypes.shape({
        cover_url: PropTypes.string,
        title: PropTypes.string.isRequired,
        subTitle: PropTypes.string,
        updateDate: PropTypes.string,
        owner: PropTypes.shape({
            pseudo: PropTypes.string.isRequired
        }),
        borrower: PropTypes.shape({
            pseudo: PropTypes.string.isRequired
        })
    })
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default BookDetails