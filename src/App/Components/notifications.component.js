import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BORROW_BOOKS_SUCCESS, UPLOAD_BOOK_SUCCESS } from '../../actions/types';
import MessageSuccess from './messageSuccess.component';
import MessageError from './messageError.component';

class Notification extends Component {
    state = { visible: true }

    componentDidUpdate(){
        if(this.state.visible) {
            setTimeout(() => this.setState({ visible: false }), 3000);
        }
    }

    handleDismiss = () => {
        this.setState({ visible: false });
    }

    isSuccessMessage(type) {
        return (type === BORROW_BOOKS_SUCCESS
            || type === UPLOAD_BOOK_SUCCESS);
    }

    render() {
        const { type, message} = this.props;
        const isSuccess = this.isSuccessMessage(type);
        
        return (
            <div>
                {message && this.state.visible ? 
                    (isSuccess ? <MessageSuccess message={message} handleDismiss={this.handleDismiss}/> 
                               : <MessageError message={message} handleDismiss={this.handleDismiss}/>) :
                    <></>
                } 
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        type: state.notification.type,
        message: state.notification.message
    }
}
export default connect(mapStateToProps, {})(Notification);