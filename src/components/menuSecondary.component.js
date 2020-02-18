import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { signIn } from '../actions';
import { HOME, SIGN_IN, BORROW_BOOKS, UPLOAD_BOOK, MY_BOOKS } from '../constants/routeAPIs';
import Search from '../App/Components/SearchBook.component';

class MenuSecondary extends Component {
  state = { activeLink: HOME};

  handleItemClick = (e, { to }) => this.setState({ activeLink: to });

  updateActiveLink() {
    const { pathname } = this.props.history.location; 
    if(this.state.activeLink !== pathname) {
      this.setState({ activeLink: pathname });
    } 
  }
  
  componentDidMount() {
    this.updateActiveLink();
  }
  
  componentDidUpdate() {
    this.updateActiveLink();
  }

  render() {
    const { activeLink } = this.state;
    const hidden = this.props.isSignedIn ? true : false;
    
    return (
      <Menu inverted>
        {!hidden ? <Menu.Item as={Link} to={HOME}
          name='home'
          active={activeLink === HOME || activeLink === '/'}
          onClick={this.handleItemClick}
        /> : <></>}
       {!hidden ? <Menu.Item as={Link} to={SIGN_IN}
          name='signIn'
          active={activeLink === SIGN_IN}
          onClick={this.handleItemClick}
        /> : <></>}
        {hidden ? <Menu.Item as={Link} to={BORROW_BOOKS}
          name='boorowBooks'
          active={activeLink === BORROW_BOOKS}
          onClick={this.handleItemClick}
        /> : <></>}
        {hidden ? <Menu.Item as={Link} to={UPLOAD_BOOK}
          name='uploadBook'
          active={activeLink === UPLOAD_BOOK}
          onClick={this.handleItemClick}
        /> : <></>}
        {hidden ? <Menu.Item as={Link} to={MY_BOOKS}
          name='myBooks'
          active={activeLink === MY_BOOKS}
          onClick={this.handleItemClick}
        /> : <></>}
        <Menu.Menu position='right'>
          <Menu.Item>
            <Search />
          </Menu.Item>
          {hidden ? <Menu.Item as={Link} to={SIGN_IN}
            name='logout'
            active={activeLink === SIGN_IN}
            onClick={this.handleItemClick}
          /> : <></>}
        </Menu.Menu>
      </Menu>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}
export default withRouter(connect(mapStateToProps, {signIn})(MenuSecondary));