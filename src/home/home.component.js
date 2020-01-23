import React from 'react';
import './home.scss';
import GoogleAuth from '../components/googleAuth';
import Logo from '../assets/images/bookshelf-icon.png';

class Home extends React.Component {
    
    handleBorrowBookButtonClick = () => {
        return this.props.history.push('/books');
    }

    render() {
        return(
            <div className='home-container'>
                <div>
                    <h2 className="ui center aligned huge teal inverted header"> 
                            Put On Share
                    </h2>
                    <h3 className="ui center aligned huge header">
                        <img alt="" className="ui image" src={Logo}/>
                    </h3>
                    <div className="ui placeholder segment">
                        <div className="middle aligned column">
                            <GoogleAuth/>
                        </div>
                        <h4 className="ui center aligned black header">
                            Sign In To Get Started
                        </h4>
                    </div>
                    <button className="home ui big green button" onClick={this.handleBorrowBookButtonClick}>Borrow Books</button>
                </div>
            </div>
        );
    }
}
export default Home;