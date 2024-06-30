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
import Terms from "./Components/Footer/Terms";
import Policy from "./Components/Footer/Policy";
import SalesEnquiry from "./Components/Footer/SalesEnquiry";
import Footer from "./Components/Footer/Footer";
import FeedbackForm from "./Components/Footer/FeedbackForm";
import Feedbacklist from "./Components/Footer/Feedbacklist";
import Body from "./Components/body/Body";
import Navbar from "./Components/CustomNavbar";
// import ReadMore from "./Components/Footer/ReadMore";






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
      {/* <Terms/> */}
      {/* <Policy/> */}
      {/* <SalesEnquiry/> */}
      {/* <Footer/> */}
      {/* <FeedbackForm/> */}
      {/* <Feedbacklist/> */}
      {/* <HomePage/> */}
      {/* <NavBar /> */}
      <Navbar/>
      
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
          <Route path="Terms" Component={Terms} />
          <Route path="Policy" Component={Policy} />
          <Route path="SalesEnquiry" Component={SalesEnquiry} />
          <Route path="FeedbackForm" Component={FeedbackForm} />
          <Route path="Feedbacklist" Component={Feedbacklist} />
        </Routes>
      </Router>
      <Body/>
      <Footer/>
    </div>
  );
}

export default App;
