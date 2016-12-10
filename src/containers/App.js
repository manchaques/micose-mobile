import {connect} from 'react-redux';
import {Reducer} from 'react-native-router-flux';

import MainRouter from '../components/MainRouter';

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        reducerCreate: (params) => {
            const defaultReducer = Reducer(params);
            return (state, action) => {
                dispatch(action);
                return defaultReducer(state, action);
            };
        }
    };
};


const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainRouter);

export default App;
