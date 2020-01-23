import React, {Component} from 'react';
import { connect } from 'react-redux';
import { borrowBooks, discardSelectedbooks } from '../actions';
import '../styles/confirmButton.scss';

class confirmButton extends Component {
    onConfirm = (books) => {
        books.map(book => {
            this.props.borrowBooks(book);
        })
        this.props.discardSelectedbooks();
        return this.props.history.push('/books');
    }

    render() {
        return (
            <div className="confirmButton">
                <button className="ui primary button" onClick={() => this.onConfirm(this.props.selectedBooks)}>
                    Save
                </button>
                <button className="ui button" onClick={() => this.props.discardSelectedbooks()}>
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