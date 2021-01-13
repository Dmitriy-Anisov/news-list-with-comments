import React from 'react';
import Main from './Container/Main/Main';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import AddForm from './Container/AddForm/AddForm';
import FullPost from './Container/FullPost/FullPost';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Main}/>
        <Route path='/add' exact component={AddForm}/>
        <Route path='/news/:id' component={FullPost}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
