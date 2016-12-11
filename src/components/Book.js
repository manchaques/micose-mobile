import React, {PropTypes} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import moment from 'moment';

const Book = ({book}) => {
    if (book) {
        return (
            <View style={styles.container}>
                <View style={styles.thumbnail}>
                    <Image source={{uri: book.cover_url}} style={styles.cover}/>
                </View>
                <View style={styles.description}>
                    <View style={styles.firstRow}>
                        <Text style={styles.title}>
                            {book.title}
                        </Text>
                        <Text style={styles.owner}>
                            {book.owner.pseudo} {book.borrower ? '-> ' + book.borrower.pseudo : ''}
                        </Text>
                    </View>
                    <View style={styles.secondRow}>
                        <Text style={styles.subtitle}>
                            {book.subtitle}
                        </Text>
                        <Text style={styles.updateDate}>
                            {moment(book.updateDate).format('ll')}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
};

Book.propTypes = {
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
        flex: 1,
        flexDirection: 'row'
    },
    thumbnail: {
        flex: 1,
        padding: 3,
        flexDirection: 'row'
    },
    cover: {
        resizeMode: 'cover',
        width: 32,
        height: 50

    },
    description: {
        flex: 8,
        padding: 8,
        flexDirection: 'column'
    },
    firstRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    secondRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    title: {
        flex: 3,
        fontSize: 14
    },
    subtitle: {
        flex: 3,
        fontSize: 12
    },
    owner: {
        flex: 1,
        fontSize: 12,
        textAlign: 'right'
    },
    updateDate: {
        flex: 1,
        fontSize: 10,
        textAlign: 'right'
    }
});

export default Book