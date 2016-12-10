import { connect } from 'react-redux';

import Home from '../components/Home';

import {fetchBooks} from '../actions/bookActions';
import {fetchUsers} from '../actions/userActions';

const mapStateToProps = (state) => {
    return {
        user: state.login.user,
        loading: state.login.loading,
        community: state.community
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMount: (community) => {
            dispatch(fetchBooks(community));
            dispatch(fetchUsers(community));
        }
    };
};

const CommunityHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default CommunityHome;