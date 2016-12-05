import { connect } from 'react-redux';

import Drawer from '../components/Drawer';

import {changeCommunity} from '../actions/communityActions';
import {fetchBooks} from '../actions/bookActions';
import {fetchUsers} from '../actions/userActions';
import {signOutGoogle} from '../actions/loginActions';

const mapStateToProps = (state) => {
    return {
        user: state.login.user,
        loading: state.login.loading,
        selectedCommunity: state.community
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignOut: () => {
            dispatch(signOutGoogle())
        },
        onCommunityChanged: (community) => {
            dispatch(changeCommunity(community));
            dispatch(fetchBooks(community));
            dispatch(fetchUsers(community));
        }
    };
};

const MainDrawer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Drawer);

export default MainDrawer;