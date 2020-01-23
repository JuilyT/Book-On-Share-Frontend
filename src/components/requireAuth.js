import React from 'react';
import { withRouter } from 'react-router';
import {connect} from 'react-redux';
import { compose } from 'redux';
import {signIn} from '../actions';

export default function requireAuth(Component) {

  class AuthenticatedComponent extends React.Component {

    componentDidMount() {
        this.props.signIn();
        this.checkAuth();
    }

    checkAuth() {
        console.log(this.props.isSignedIn);
      if ( ! this.props.isSignedIn) {
        this.props.history.push("/");
      }
    }

    render() {
      return this.props.isSignedIn
        ? <Component { ...this.props } />
        : null;
    }

  }
  const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
  }

  return compose (
      withRouter,
      connect(mapStateToProps, {signIn})
    )(AuthenticatedComponent);
}