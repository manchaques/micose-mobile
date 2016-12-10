import React, {PropTypes} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TabBar = ({tabs, goToPage, activeTab}) => (
    <View style={styles.tabs}>
        {tabs.map((tab, i) => {
            return <TouchableOpacity key={tab} onPress={() => goToPage(i)} style={styles.tab}>
                <Icon
                    name={tab}
                    size={30}
                    color={activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
                />
            </TouchableOpacity>;
        })}
    </View>
);

TabBar.propTypes = {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
};

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    tabs: {
        height: 45,
        flexDirection: 'row',
        paddingTop: 5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
});

export default TabBar;