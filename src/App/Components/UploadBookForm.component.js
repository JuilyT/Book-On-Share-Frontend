import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class UploadBookForm extends Component {

    isDirtyChange(values) {
        return values.phone
               && values.location && values.location.length > 0
               && values.bookTitle && values.bookTitle.length > 0 
               && values.bookAuthor && values.bookAuthor.length > 0 
               && values.bookCover && values.bookCover.length > 0;
    }

    render() {
        const {values} = this.props;
        const isEnabled = this.isDirtyChange(values);
       
        return (
            <Form>
                <h1 className='ui centered'>User Information</h1>
                <Form.Group unstackable widths={2}>
                    <Form.Field required>
                        <label>Phone{values.phoneError}</label>
                        <Form.Input
                            placeholder='Phone'
                            onChange={this.props.handleChange('phone')}
                            value={values.phone}
                            error={values.phoneError ? {content: 'Phone number should be 10 digits in length'} : null}
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>Location {values.locationError}</label>
                        <Form.Input
                            placeholder='Desk location'
                            onChange={this.props.handleChange('location')}
                            value={values.location}
                            error={values.locationError ? {content: 'Enter location'} : null}
                        />
                    </Form.Field>
                </Form.Group>
                <br/>
                <h1 className='ui centered'>Book Information</h1>
                <br/><br/>
                <Form.Group unstackable widths={2}>
                <Form.Field required>
                        <label>Title{values.bookTitleError}</label>
                        <Form.Input
                            placeholder='Title'
                            onChange={this.props.handleChange('bookTitle')}
                            value={values.bookTitle}
                            error={values.bookTitleError ? {content: 'Enter book title'} : null}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <Form.Input
                            placeholder='Description'
                            onChange={this.props.handleChange('bookDesc')}
                            value={values.bookDesc}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group unstackable widths={2}>
                    <Form.Field required>
                        <label>Author{values.bookAuthorError}</label>
                        <Form.Input
                            placeholder='Author'
                            onChange={this.props.handleChange('bookAuthor')}
                            value={values.bookAuthor}
                            error={values.bookAuthorError ? {content: 'Enter book author name'} : null}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Category</label>
                        <Form.Input
                            placeholder='Category'
                            onChange={this.props.handleChange('bookCategory')}
                            value={values.bookCategory}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths={1}>
                    <Form.Field required>
                        <label>Cover Image</label>
                        <Form.Input
                            id="group_image"
                            type="file"
                            placeholder='Cover'
                            onChange={this.props.handleImageChange('bookCover')}
                            error={values.bookCoverError ? {content: 'Add book cover'} : null}
                        />
                    </Form.Field>
                </Form.Group>
                <button disabled={!isEnabled} className="ui primary button" onClick={this.props.onSubmit} type='submit'>Submit</button>
            </Form>
        );
    }
}
  
  export default UploadBookForm
  