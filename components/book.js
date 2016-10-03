import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import moment from 'moment';

const styles = StyleSheet.create({
    container: {
        flex: 1,
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


class Book extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.firstRow}>
                    <Text style={styles.title}>
                        {this.props.book.title}
                    </Text>
                    <Text style={styles.owner}>
                        {this.props.book.owner.pseudo} {this.props.book.borrower ? '-> ' + this.props.book.borrower.pseudo : ''}
                    </Text>
                </View>
                <View style={styles.secondRow}>
                    <Text style={styles.subtitle}>
                        {this.props.book.subtitle}
                    </Text>
                    <Text style={styles.updateDate}>
                        {moment(this.props.book.updateDate).format('ll')}
                    </Text>
                </View>
            </View>
        );
    }
}

export default Book;