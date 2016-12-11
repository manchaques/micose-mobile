import {connect} from 'react-redux';

import _ from 'lodash';

import ListBooks from '../components/ListBooks';
import {fetchBooks} from '../actions/bookActions';


const getCommunityBooks = (books, filter) => {
    let booksByFirstLetter = {};

    // Expand [books] in {firstLetter, [books]}
    const lowerCaseFilter = filter.toLowerCase();
    books
        .filter((book) => {
            return (book.title && book.title.toLowerCase().indexOf(lowerCaseFilter) > -1)
                || (book.subtitle && book.subtitle.toLowerCase().indexOf(lowerCaseFilter) > -1)
                || (book.owner && book.owner.pseudo.toLowerCase().indexOf(lowerCaseFilter) > -1)
                || (book.borrower && book.borrower.pseudo.toLowerCase().indexOf(lowerCaseFilter) > -1);
        })
        .forEach((book) => {
            let firstBookLetter = book.title.charAt(0).toUpperCase();
            if (!firstBookLetter) {
                return;
            }
            if (!booksByFirstLetter[firstBookLetter]) {
                booksByFirstLetter[firstBookLetter] = [];
            }
            booksByFirstLetter[firstBookLetter].push(book);
        });


    let booksByFirstLetterOrdered = {};

    // Sort by first letter
    Object.keys(booksByFirstLetter)
        .sort()
        .forEach((firstLetter) => {
            booksByFirstLetterOrdered[firstLetter] = booksByFirstLetter[firstLetter];
        });

    // Sort each [books]
    _.forOwn(booksByFirstLetter, (books, firstLetter) => {
        booksByFirstLetterOrdered[firstLetter] = books.sort((book1, book2) => {
            if (book1.title < book2.title) {
                return -1;
            } else if (book1.title > book2.title) {
                return 1;
            } else {
                return book1.subtitle < book2.subtitle ? -1 : 1;
            }
        });
    });

    return booksByFirstLetterOrdered;
};

const mapStateToProps = (state) => {
    return {
        community: state.community,
        books: getCommunityBooks(state.books.data, state.books.filter),
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