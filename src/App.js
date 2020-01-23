import React from 'react';
import {Route} from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Home from './home/home.component';
import BorrowBooks from './components/borrowBooks.component';
import ViewBook from './components/viewBook.component';
import requireAuth from './components/requireAuth';

class App extends React.Component {
  render() {
    return (
        <div>
          <Router>
            <div>
                <Route path="/" exact component={Home} />
                <Route path="/books" exact component={requireAuth(BorrowBooks)} />
                <Route path="/book/:id" exact component={requireAuth(ViewBook)} />
            </div>
          </Router>
        </div>
    );
  }
}

export default App;
