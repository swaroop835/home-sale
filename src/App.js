import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Contactus from "./Components/Contactus";

import AdminPage from "./Components/Admin/AdminPage";
import Adminlogin from "./Components/Admin/Adminlogin";
import AddProperty from "./Components/Admin/AddProperty";
import Propertylisting from "./Components/Admin/Propertylisting";
import Userlisting from "./Components/Admin/Userlisting";
import EditProperty from "./Components/Admin/EditProperty";



function App() {
  return (
    <div className="App">
      {/* <Header />
      <Login/> */}
      {/* <Contactus /> */}
      {/* <AdminPage/> */}
      {/* <Adminlogin/> */}
      {/* <AddProperty/> */}
      {/* <PropertyListing /> */}
      {/* <Userlisting/> */}
      {/* <EditProperty/> */}

      <Router>
        <Routes>
          <Route path="/" Component={Header} />
          <Route path="/Login" Component={Login} />
          <Route path="/Contactus" Component={Contactus} />
          <Route path="/Signup" Component={Signup} />
          <Route path="/AdminPage" Component={AdminPage} />
          <Route path="/Adminlogin" Component={Adminlogin} />
          <Route path="/Header" Component={Header} />
          <Route path="/AddProperty" Component={AddProperty} />
          <Route path="Propertylisting" Component={Propertylisting} />
          <Route path="Userlisting" Component={Userlisting} />
          <Route path="EditProperty" Component={EditProperty} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
