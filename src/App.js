import React from 'react';
import {Route} from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { HOME, SIGN_IN, BORROW_BOOKS, UPLOAD_BOOK, MY_BOOKS } from './constants/routeAPIs';
import Home from './App/Components/Home.component';
import BorrowBooks from './App/Components/BorrowBooks.component';
import requireAuth from './App/Components/RequireAuth';
import Menu from './components/menuSecondary.component';
import GoogleAuth from './App/Components/GoogleAuth';
import UploadBook from './App/Components/UploadBook.component';
import MyBooks from './App/Components/MyBooks.component';
import Notification from './App/Components/notifications.component';

class App extends React.Component {
  render() {
    return (
        <div>
          <Router>
            <div>
                <Menu/>
                <Notification />
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
