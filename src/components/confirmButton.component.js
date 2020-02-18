import React, {Component} from 'react';
import { connect } from 'react-redux';
import { borrowBooks, discardSelectedbooks } from '../actions';
import _ from 'lodash';
import '../styles/confirmButton.scss';

class confirmButton extends Component {
    onConfirm = (books) => {
        books.map(book => {
            this.props.borrowBooks(book);
        });
        this.props.discardSelectedbooks();
        return this.props.history.push('/books');
    }

    render() {
        const isDisabled = _.isEmpty(this.props.selectedBooks);
        return (
            <div className="confirmButton">
                <button disabled={isDisabled} className="ui primary button" onClick={() => this.onConfirm(this.props.selectedBooks)}>
                    Borrow
                </button>
                <button disabled={isDisabled} className="ui button" onClick={() => this.props.discardSelectedbooks()}>
                    Discard
                </button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        selectedBooks: state.selectedBooks
    }
}
export default connect(mapStateToProps, { borrowBooks, discardSelectedbooks })(confirmButton);