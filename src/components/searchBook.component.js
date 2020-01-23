import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/searchBook.scss';
import { searchTerm, fetchBooksByTerm } from '../actions';

class SearchBook extends Component {
    
    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.fetchBooksByTerm(this.props.term, 1);
    }

    onChange = (e) => {
        this.props.searchTerm(e.target.value);
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="ui search">
                <div className="ui icon input">
                    <input defaultValue={this.props.term} className="prompt" type="text" placeholder="Enter title..." onChange={(e)=>{this.onChange(e)}}/>
                    <i className="search icon"></i>
                </div>
                <div className="results"></div>
            </form>   
        );
    }
}

const mapStateToProps = (state) => {
    return {
        term: state.searchTerm
    }
}

export default connect(mapStateToProps, {searchTerm, fetchBooksByTerm})(SearchBook);