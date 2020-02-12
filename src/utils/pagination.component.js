import React, { Component } from 'react';
import { Grid, Pagination } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchBooks, getMyBooks } from '../actions';

class PaginationComponent extends Component {
  state = { activePage: 1 }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.updateBooksOnPageRequest(activePage);
  }

  updateBooksOnPageRequest(activePage) {
    const { currentTab } = this.props;
    if(currentTab === "borrowed") {
        this.props.getMyBooks("BORROWED", activePage, this.props.currentUser.id);
    } else {
        this.props.fetchBooks('', activePage);
    }
  }

  render() {
    const { activePage } = this.state

    return (
      <Grid columns={1} horizontalalign='right'>
        <Grid.Column>
          <Pagination
            activePage={activePage}
            onPageChange={this.handlePaginationChange}
            totalPages={5}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(null, {fetchBooks, getMyBooks})(PaginationComponent);