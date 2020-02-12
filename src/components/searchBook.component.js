import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../styles/searchBook.scss';
import { searchTerm } from '../actions';

class SearchBook extends Component {
    
    onFormSubmit = (event) => {
        event.preventDefault();
        this.redirectToListPage();
    }
    
    redirectToListPage() {
        const { history } = this.props;
        if(history) {
            history.push('/books');
        }
    }

    onChange = (e) => {
        this.props.searchTerm(e.target.value);
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="ui search">
                <div className="ui icon input">
                    <input value={this.props.term} className="prompt" type="text" placeholder="Search..." onChange={(e)=>{this.onChange(e)}}/>
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

export default withRouter(connect(mapStateToProps, {searchTerm})(SearchBook));