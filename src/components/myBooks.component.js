import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMyBooks } from '../actions';
import queryString from 'query-string'
import Table from '../utils/table.component';

class MyBooks extends Component {
    
    componentDidMount() {
        this.props.getMyBooks("BORROWED", null, this.props.currentUser.id);
    }

    render() {
        return (
            <div>
                <Table data={this.props.myBooks} currentTab="borrowed"/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        myBooks: state.myBooks
    }
}
export default connect(mapStateToProps, { getMyBooks })(MyBooks);