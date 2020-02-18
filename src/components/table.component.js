import React from 'react';
import { connect } from 'react-redux';
import { onSelectedBooks } from '../actions';
import Modal from './modal.component';
import Pagination from './pagination.component';
import '../styles/table.scss';

class Table extends React.Component {

    markSelectedRow = (book) => {
        return  this.props.selectedBooks.some(o => o._id === book._id);
    }

    handleClick = (book) => {
        if(book.status !== "BORROWED") {
            var currentDate = new Date();
            var numberOfDaysToAdd = 3;
            currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd); 
            this.props.onSelectedBooks({
                ...book,
                status: 'BORROWED',
                borrower: this.props.currentUser,
                assignDate: new Date(),
                validTill: currentDate
            })
        }
    }

    renderList = () => {
        return (
            <tbody>
                {this.props.data.map((book)=>{
                    return <tr key={book._id} className={this.markSelectedRow(book) ? 'active': ''} onClick={() => this.handleClick(book)}>
                            <td>
                                <h2 className="single line">{book.title}
                                    <Modal data={book}/>
                                </h2>
                            </td>
                            <td className="single line">
                                {book.desc}
                            </td>
                            <td className="single line">
                                {book.category}
                            </td>
                            <td className="single line">
                                {book.author}
                            </td>
                            <td>
                                <div className="single line">{book.owner.name}</div>
                            </td>
                            <td className="single line">
                                {book.status} 
                            </td>
                            <td className="single line">
                                {book.status === "BORROWED" && book.validTill ? new Date(book.validTill).toLocaleDateString() : "Available" }
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
                <table className="ui small celled striped table">
                        <thead>
                        <tr>
                            <th className="single line">Title</th>
                            <th>Desciption</th>
                            <th>Category</th>
                            <th>Author</th>
                            <th>Owner</th>
                            <th>Status</th>
                            <th>Availability</th>
                        </tr>
                    </thead>
                    {this.renderList()}
                    <tfoot>
                        <tr>
                            <th colSpan="7">
                                <Pagination currentTab={this.props.currentTab} currentUser={this.props.currentUser}/>
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