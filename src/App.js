import React from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import UserDetails from './components/users/UserDetails';
import Signin from './components/auth/Signin';
import SignUp from './components/auth/SignUp';
import CreateUser from './components/users/Createuser';
import EditUser from './components/users/EditUser';

function App() {
  return (
    <BrowserRouter>
    
    <div className="App">
    <Navbar />
    <Switch>
      <Route exact path='/' component={Dashboard}/>
      <Route exact path='/signin' component={Signin}/>
      <Route exact path='/signup' component={SignUp}/>
      <Route exact path='/create' component={CreateUser}/>
      <Route exact path='/user/:id' component={UserDetails}/> 
      <Route path='/edit/:id' component={EditUser}/>
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
