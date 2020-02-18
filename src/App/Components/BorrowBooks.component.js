import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { fetchBooks } from '../../actions';
import Table from '../../components/table.component';
import ConfirmButton from '../../components/confirmButton.component';

class BorrowBooks extends Component {
    
    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        const {page}  = values;
        this.props.fetchBooks(this.props.searchTerm, page ? page : 1);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.searchTerm !== this.props.searchTerm) {
            this.props.fetchBooks(this.props.searchTerm);
        }
    }

    render() {
        return (
            <div>
                <Table data={this.props.books} currentTab="books"/>
                <ConfirmButton history={this.props.history}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books,
        searchTerm: state.searchTerm
    }
}
export default connect(mapStateToProps, { fetchBooks })(BorrowBooks);