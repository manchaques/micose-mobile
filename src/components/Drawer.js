import React, {PropTypes} from 'react';
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

const Drawer = ({user, selectedCommunity, onCommunityChanged, onSignOut}) => {
    if (user) {
        return (   <View style={styles.drawer}>

                <View style={styles.user}>
                    <View style={styles.thumbnailUser}>
                        <Image source={{uri: user.avatarUrl}} style={styles.userPhoto}/>
                    </View>
                    <Text style={styles.userName}>
                        {user.pseudo}
                    </Text>
                    <Hr lineColor='gainsboro' styles={styles.separator}/>
                </View>

                <View style={styles.actions}>
                    <Text style={{fontWeight: 'bold'}}>Current community</Text>
                    <Picker
                        selectedValue={selectedCommunity}
                        onValueChange={(community) => {
                            onCommunityChanged(community);
                        }}
                    >
                        { user.communities.map((community, index) => {
                            return <Picker.Item
                                key={index}
                                label={community.name}
                                value={community.id}/>
                        })}
                    </Picker>
                </View>

                <View style={styles.logout}>
                    <TouchableNativeFeedback
                        onPress={onSignOut}
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
        )
    }
};

Drawer.propTypes = {
    user: PropTypes.shape({
        pseudo: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
        techName: PropTypes.string.isRequired,
        communities: PropTypes.array.isRequired
    }),
    selectedCommunity: PropTypes.number.isRequired,
    onCommunityChanged: PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired
};

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
