import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { signIn } from '../actions';
import { fetchBooks } from '../actions';
import SearchBook from './searchBook.component';
import Table from '../utils/table.component';
import ConfirmButton from '../utils/confirmButton.component';

class BorrowBooks extends Component {
    
    componentDidMount() {
       /* this.props.signIn();
        if ( !this.props.isSignedIn) {
            this.props.history.push("/");
        }*/
        const values = queryString.parse(this.props.location.search);
        const {_page}  = values;
        this.props.fetchBooks(_page ? _page : 1);
    }

    onClickHome = ()=>{
        this.props.history.push("/");  
    }

    render() {
        return (
            <div>
                <button onClick={this.onClickHome} className="ui icon button">
                    <i aria-hidden="true" className="home icon"></i>
                </button>
                <SearchBook/>
                <Table data={this.props.books}/>
                <ConfirmButton history={this.props.history}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.auth.isSignedIn);
    return {
        isSignedIn: state.auth.isSignedIn,
        books: state.books
    }
}
export default connect(mapStateToProps, { signIn, fetchBooks })(BorrowBooks);