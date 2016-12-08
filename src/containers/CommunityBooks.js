import { connect } from 'react-redux';

import ListBooks from '../components/ListBooks';
import {fetchBooks} from '../actions/bookActions';


const getCommunityBooks = (books) => {
    return books.sort((book1, book2) => {
        if (book1.title < book2.title) {
            return -1;
        } else if (book2.title > book1.title) {
            return 1;
        } else {
            return book1.subtitle < book2.subtitle ? -1 : 1;
        }
    });
};

const mapStateToProps = (state) => {
    return {
        community: state.community,
        books: getCommunityBooks(state.books.data),
        loading: state.books.loading,
        isRefreshing: state.books.isRefreshing,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRefresh: (community) => {
            dispatch(fetchBooks(community))
        }
    };
};

const CommunityBooks = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListBooks);

export default CommunityBooks;