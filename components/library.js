import React, {Component} from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import TabBar from './tabBar';
import BooksView from './booksView';


class Library extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollableTabView
                initialPage={0}
                renderTabBar={() => <TabBar/>}
            >
                <BooksView tabLabel="all-inclusive"/>
                <BooksView tabLabel="group"/>
            </ScrollableTabView>
        );
    }
}

export default Library;