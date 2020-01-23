import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { signIn, fetchBookById } from '../actions';
import '../styles/viewBook.scss';

class viewBook extends Component {
    componentDidMount() {
        this.props.signIn();
        this.props.fetchBookById(this.props.match.params.id);
    }
    render() {
        if(!this.props.book) {
            return <div>Loading...</div>
        }
        const {book} = this.props;
        return (
            <div>
                <h2 className="ui center aligned header">VIEW BOOK</h2>
                <div className="view ui form">
                    <div className="two fields">
                        <div className="field">
                            <label>Title</label>
                            <input placeholder={book.title} readOnly="" type="text"/>
                        </div>
                        <div className="field">
                            <label>Description</label>
                            <input placeholder={book.desc} readOnly="" type="text"/>
                        </div>
                    </div>
                    <div className="two fields">
                        <div className="field">
                            <label>Owner</label>
                            <input placeholder={book.owner ? book.owner.name : book.title} readOnly="" type="text"/>
                        </div>
                        <div className="field">
                            <label>Status</label>

                            <input placeholder={book.status} readOnly="" type="text"/>
                        </div>
                    </div>
                </div>
                <button className="ui primary button" onClick={() => this.props.history.push("/books")}>
                    Back
                </button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        book: state.book
    }
}
export default connect(mapStateToProps, {signIn, fetchBookById})(viewBook);