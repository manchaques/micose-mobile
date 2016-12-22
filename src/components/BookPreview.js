import React, {PropTypes} from 'react';
import {View, Text, StyleSheet, Image, TouchableNativeFeedback} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const BookPreview = ({book, onSelected}) => {
    if (book) {
        let stateIcon = book.borrower ? "lock" : "lock-open";
        return (
            <TouchableNativeFeedback
                onPress={() => onSelected(book)}
                background={TouchableNativeFeedback.Ripple("light-gray", false)}>
                <View style={styles.container}>
                    <View style={styles.thumbnail}>
                        <Image source={{uri: book.cover_url}} style={styles.cover}/>
                    </View>
                    <View style={styles.description}>
                        <View style={styles.firstRow}>
                            <Text style={styles.title}>
                                {book.title}
                            </Text>
                        </View>
                        <View style={styles.secondRow}>
                            <Text style={styles.subtitle}>
                                {book.subtitle}
                            </Text>
                        </View>
                    </View>
                    <Icon
                        name={stateIcon}
                        size={30}
                    />
                </View>
            </TouchableNativeFeedback>
        )
    } else {
        return (
            <View />
        )
    }
};

BookPreview.propTypes = {
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
    }),
    onSelected: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
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
    }
});

export default BookPreview