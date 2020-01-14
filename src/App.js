import React from 'react';
import {Switch,Route} from 'react-router-dom';
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";

class App extends React.Component {
  render() {
    return (
        <div>
           <Switch>
            <Route path="/" exact component={TodosList} />
            <Route path="/edit/:id" component={EditTodo} />
            <Route path="/create" component={CreateTodo} />
          </Switch>
        </div>
    );
  }
}

export default App;
