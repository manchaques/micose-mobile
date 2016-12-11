import {connect} from 'react-redux';

import _ from 'lodash';

import SearchBar from '../components/SearchBar';
import {filterBooks} from '../actions/bookActions';

const mapStateToProps = (state) => {
    return {
        filter: state.books.filter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeText: (text) => {
            dispatch(filterBooks(text))
        }
    };
};

const BooksSearchBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);

export default BooksSearchBar;