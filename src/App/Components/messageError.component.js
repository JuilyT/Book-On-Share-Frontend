import React from 'react';
import { Message } from 'semantic-ui-react';

class MessageNegative extends React.Component {
  
  render() {
    return (
      <Message 
        compact
        error
        header = 'Error'
        content = {this.props.message}
        onDismiss={this.props.handleDismiss}
      />
    );
  }
}

export default MessageNegative;