import {connect} from 'react-redux';

import BookDetails from '../components/BookDetails';

const mapStateToProps = (state) => {
    return {
        book: state.books.currentBook
    };
};

const BookPage = connect(
    mapStateToProps
)(BookDetails);

export default BookPage;