import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onSelectedBooks } from '../actions';
import '../styles/table.scss';

class Table extends React.Component {

    markSelectedRow = (book) => {
        return  this.props.selectedBooks.some(o => o.id === book.id);
    }

    handleClick = (book) => {
        if(book.status !== "BORROWED") {
            this.props.onSelectedBooks({
                ...book,
                status: 'BORROWED',
                borrower: this.props.currentUser,
                assignDate: new Date()
            })
        }
    }

    renderList = () => {
        return (
            <tbody>
                {this.props.data.map((book)=>{
                    return <tr key={book.id} className={this.markSelectedRow(book) ? 'active': ''} onClick={() => this.handleClick(book)}>
                            <td>
                                <h2 className="single line">
                                <Link to={`/book/${book.id}`}>{book.title}</Link>
                                </h2>
                            </td>
                            <td className="single line">
                                {book.desc}
                            </td>
                            <td>
                                <div className="single line">{book.owner.name}</div>
                            </td>
                            <td className="single line">
                                {book.status} 
                            </td>
                        </tr>
                    })
                }
            </tbody>
        ); 
    }
    
    render() {
        return (
            <div>
                <table className="ui celled padded striped table">
                        <thead>
                        <tr>
                            <th className="single line">Title</th>
                            <th>Desciption</th>
                            <th>Owner</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {this.renderList()}
                    <tfoot>
                        <tr>
                            <th colSpan="5">
                            <div className="ui right floated pagination menu">
                                <a href="#0" className="icon item">
                                <i className="left chevron icon"></i>
                                </a>
                                <Link to={`/books?_page=1`} className="item">1</Link>
                                <Link to={`/books?_page=2`} className="item">2</Link>
                                <Link to={`/books?_page=3`} className="item">3</Link>
                                <Link to={`/books?_page=4`} className="item">4</Link>
                                <a href="#0" className="icon item">
                                <i className="right chevron icon"></i>
                                </a>
                            </div>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        selectedBooks: state.selectedBooks,
        currentUser: state.currentUser
    }
}
export default connect(mapStateToProps, {onSelectedBooks})(Table);