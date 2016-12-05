import { connect } from 'react-redux';

import Home from '../components/Home';

const mapStateToProps = (state) => {
    return {
        user: state.login.user,
        loading: state.login.loading,
        community: state.community
    };
};

const CommunityHome = connect(
    mapStateToProps
)(Home);

export default CommunityHome;