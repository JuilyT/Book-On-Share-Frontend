import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

class MessageSuccess extends Component {
  
  render() {  
    return (
      <Message 
        compact
        success
        header='Success'
        content={this.props.message}
        onDismiss={this.props.handleDismiss}
      />
    );
  }
}
  
export default MessageSuccess;
