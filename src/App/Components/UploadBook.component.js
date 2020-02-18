import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadBook } from '../../actions';
import UploadBookForm from './UploadBookForm.component';
import '../../styles/uploadForm.scss';

class UploadBook extends Component {

    state = {
        phone: '',
        location: '',
        bookTitle: '',
        bookAuthor: '',
        bookCategory: '',
        bookDesc: '',
        bookCover: '',
        phoneError: false,
        bookTitleError: false,
        bookAuthorError: false,
        locationError: false,
        bookCoverError: false
    };

    handleChange = input => event => {
        this.setState({ [input] : event.target.value })
    }
    
    handleImageChange = input => (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.setState({[input]: e.target.result});
          };
          reader.readAsDataURL(event.target.files[0]);
        }
    }

    handleValidation() {
        const { phone, bookTitle, bookAuthor, location, bookCover } = this.state;
        let error = false;
        if(phone === '' || phone.length < 10) {
            this.setState({ phoneError: true });
            error = true;
        } else {
            this.setState({phoneError: false});
        }
        if(bookTitle === '') {
            this.setState({ bookTitleError: true });
            error = true;
        } else {
            this.setState({bookTitleError: false});
        }
        if(bookAuthor === '') {
            this.setState({ bookAuthorError: true });
            error = true;
        } else {
            this.setState({bookAuthorError: false});
        } 
        if(bookCover === '') {
            this.setState({ bookCoverError: true });
            error = true;
        } else {
            this.setState({bookCoverError: false});
        } 
        if(location === '') {
            this.setState({ locationError: true });
            error = true;
        } else {
            this.setState({locationError: false});
        }
        return error;
    }

    getBase64(file, cb) {
        let reader = new FileReader();
        // Convert the file to base64 text
        reader.readAsDataURL(file);

        // on reader load somthing...
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    onSubmit = () => {
        const { phone, location, bookTitle, bookAuthor, bookCategory, bookDesc, bookCover } = this.state;
        if(this.handleValidation()) {
            return;
        }
        const uploadedBook = {
                            title: bookTitle,
                            desc: bookDesc,
                            category: bookCategory,
                            cover: bookCover,
                            author: bookAuthor,
                            owner: {...this.props.currentUser, phone, location},
                            status: "LENTED"
                        };
        this.props.uploadBook(uploadedBook);
        
        this.setState(
            {
                phone: '',
                location: '',
                bookTitle: '',
                bookAuthor: '',
                bookCategory: '',
                bookDesc: '',
                bookCover: ''
            }
        );
    }

    render() {
        const { fullName, email, phone, location, bookTitle, bookAuthor, bookCategory, bookDesc, bookCover, 
                phoneError, bookTitleError, bookAuthorError, locationError, bookCoverError, } = this.state;
        const values = { fullName, email, phone, location, bookTitle, bookAuthor, bookCategory,  bookDesc,  bookCover,
                        phoneError, bookTitleError, bookAuthorError, locationError, bookCoverError};
        return (
            <div className='upload-form'>
                <UploadBookForm
                    handleChange = {this.handleChange}
                    handleImageChange = {this.handleImageChange}
                    values={values}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}
export default connect(null, {uploadBook})(UploadBook);