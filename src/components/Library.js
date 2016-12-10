import React, {PropTypes} from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import TabBar from './TabBar';
import CommunityBooks from '../containers/CommunityBooks';
import CommunityUsers from '../containers/CommunityUsers';

const Library = () => (
    <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <TabBar/>}
    >
        <CommunityBooks tabLabel="library-books"/>
        <CommunityUsers tabLabel="group"/>
    </ScrollableTabView>
);

export default Library;