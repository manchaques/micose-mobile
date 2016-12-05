import { connect } from 'react-redux';

import ListUsers from '../components/ListUsers';
import {fetchUsers} from '../actions/userActions';


const getCommunityUsers = (users) => {
    return users.sort((user1, user2) => {
        return user1.pseudo < user2.pseudo ? -1 : 1;
    });
};

const mapStateToProps = (state) => {
    return {
        community: state.community,
        users: getCommunityUsers(state.users.data),
        loading: state.users.loading,
        isRefreshing: state.users.isRefreshing,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onRefresh: () => {
            dispatch(fetchUsers(ownProps.community))
        }
    };
};

const CommunityUsers = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListUsers);

export default CommunityUsers;