
import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Signup from "./Components/Signup";
import Login from './Components/Login';
import Contactus from './Components/Contactus';

import AdminPage from "./Components/AdminPage";


function App() {
  return (
    <div className="App">
      {/* <Header />
      <Login/> */}
      {/* <Contactus /> */}
      {/* <AdminPage/> */}

      <Router>
        <Routes>

          <Route path="/"Component={Header}/>
          <Route path="/Login" Component={Login}/>
          <Route path="/Contactus" Component={Contactus}/>
          <Route path="/Signup" Component={Signup}/>
          <Route path="AdminPage" Component={AdminPage}/>

          
        </Routes>
      </Router>

    </div>
  )
};

export default App;
