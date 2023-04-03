

import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './app.css'
import Header from './Header';
import Home from './Home';
import Signin from './signin';
import UserDashboard from './userDashboard';
import AdminDashboard from './AdminDashboard';
import Signup from './signup';
import Notfound from './Notfound';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';



const App = () => (

  <BrowserRouter>
  <Header>

  </Header>

  <main>
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/signup' element={<Signup />}></Route>
      <Route exact path='/signin' element={< Signin />}></Route>
      
      <Route element={<AdminRoute/>}>
        <Route element={<AdminDashboard/>} exact path='/admin/dashboard'/>
        
        
        

      </Route>
      <Route element={<UserRoute/>}>
        <Route element={<UserDashboard/>} exact path='/user/dashboard'/>
        

      </Route>
      
      <Route element={<Notfound/>}></Route>
    </Routes>


  </main>
  
  
  </BrowserRouter>




);





export default App;
