import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableNativeFeedback
} from 'react-native';

import Hr from 'react-native-hr';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Drawer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.drawer}>

                <View style={styles.user}>
                    <View style={styles.thumbnailUser}>
                        <Image source={{uri: this.props.user.photo}} style={styles.userPhoto}/>
                    </View>
                    <Text style={styles.userName}>
                        {this.props.user.name}
                    </Text>
                    <Hr lineColor='gainsboro' styles={styles.separator}/>
                </View>

                <View style={styles.actions}>
                    <TouchableNativeFeedback
                        onPress={this.props.signOut}
                        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}>
                        <View style={styles.logoutContainer}>
                            <Icon
                                name="exit-to-app"
                                size={20}
                                style={styles.logoutButton}
                            />
                            <Text style={styles.logoutText}>Logout</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>

                <View style={styles.footer}>
                    <Text>Manchaques Team - 2016</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    drawer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    separator: {
        height: 3
    },

    user: {
        flex: 2,
        paddingTop: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    thumbnailUser: {},
    userName: {},
    userPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: 'cover'
    },

    actions: {
        flex: 10
    },
    logoutContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    logoutButton: {
        flex: 1,
        paddingTop: 2,
        paddingLeft: 10,
    },
    logoutText: {
        flex: 1,
        alignItems: 'flex-start'
    },

    footer: {
        flex: 1,
        alignItems: 'center'
    }
});

export default Drawer;
