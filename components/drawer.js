import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableNativeFeedback,
    Picker
} from 'react-native';

import Hr from 'react-native-hr';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Drawer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCommunity: this.props.community ? this.props.community.id : null
        }
    }

    render() {
        return (
            <View style={styles.drawer}>

                <View style={styles.user}>
                    <View style={styles.thumbnailUser}>
                        <Image source={{uri: this.props.user.googleProfile.photo}} style={styles.userPhoto}/>
                    </View>
                    <Text style={styles.userName}>
                        {this.props.user.googleProfile.name}
                    </Text>
                    <Hr lineColor='gainsboro' styles={styles.separator}/>
                </View>

                <View style={styles.actions}>
                    <Text style={{fontWeight: 'bold'}}>Current community</Text>
                    <Picker
                        selectedValue={this.state.selectedCommunity}
                        onValueChange={(community) => {
                            this.setState({selectedCommunity: community});
                            this.props.onCommunityChanged(community);
                        }}
                    >
                        { this.props.user.communities.map((community, index) => {
                            return <Picker.Item
                                key={index}
                                label={community.name}
                                value={community.id}/>
                        })}
                    </Picker>
                </View>

                <View style={styles.logout}>
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
                    <Hr lineColor='gainsboro' styles={styles.separator}/>
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
    logout: {
        flex: 1,
        justifyContent: 'flex-end'
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
