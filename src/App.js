import React from 'react';
import {Route} from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { HOME, SIGN_IN, BORROW_BOOKS, UPLOAD_BOOK, MY_BOOKS } from './constants/routeAPIs';
import Home from './home/home.component';
import BorrowBooks from './components/borrowBooks.component';
import requireAuth from './components/requireAuth';
import Menu from './utils/menuSecondary.component';
import GoogleAuth from './components/googleAuth';
import UploadBook from './components/uploadBook.component';
import MyBooks from './components/myBooks.component';

class App extends React.Component {
  render() {
    return (
        <div>
          <Router>
            <div>
                <Menu/>
                <Route path={HOME} exact component={Home} />
                <Route path={SIGN_IN} exact component={GoogleAuth} />
                <Route path={BORROW_BOOKS} exact component={requireAuth(BorrowBooks)} />
                <Route path={UPLOAD_BOOK} exact component={requireAuth(UploadBook)} />
                <Route path={MY_BOOKS} exact component={requireAuth(MyBooks)} />
            </div>
          </Router>
        </div>
    );
  }
}

export default App;
