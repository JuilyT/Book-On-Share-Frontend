import React, {Component} from 'react';
import { connect } from 'react-redux';
import {signIn, signOut, saveCurrentUser, deactivateCurrentUser} from '../actions';
import '../styles/googleAuth.scss';

class GoogleAuth extends Component {
    
    componentDidMount() {
        window.gapi.load('client:auth2', () =>{
            window.gapi.client.init({
                clientId:'750552076587-1qtouaa5r3266k0blb6l7doonka7c0d2.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else{
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn().then(() =>  {
            let currentUser = {
                id: this.auth.currentUser.get().getBasicProfile().getId(),
                email: this.auth.currentUser.get().getBasicProfile().getEmail(),
                name: this.auth.currentUser.get().getBasicProfile().getName()
            }
            this.props.saveCurrentUser(currentUser);
          });
          this.props.history.push('/home');
    }

    onSignOutClick = () => {
        const currentUserId = this.auth.currentUser.get().getId();
        this.auth.signOut().then(()=>{
            this.props.deactivateCurrentUser(currentUserId);
        });
        this.props.history.push('/home');
    }

    renderAuthButton = () => {
        if(this.props.isSignedIn === null) {
            return null;
        } else if(this.props.isSignedIn) {
            return (
                <div className="googleAuth">
                    <button onClick = {this.onSignOutClick} className="huge fluid ui blue google button">
                        <i className="google icon"/>
                            Sign Out
                    </button>
                </div>
            );
        } else {
            return (
                <div className="googleAuth">
                    <button onClick = {this.onSignInClick} className="huge fluid ui blue google button">
                        <i className="google icon"/>
                            Sign In With Google
                    </button>
                </div>
            );
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        currentUser: state.currentUser
    }
}

export default connect(
    mapStateToProps, 
    {signIn, signOut, saveCurrentUser, deactivateCurrentUser}
)(GoogleAuth);