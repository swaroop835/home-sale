import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
// import Contactus from "./Components/Contactus";
import AdminPage from "./Components/Admin/AdminPage";
import Adminlogin from "./Components/Admin/Adminlogin";
import AddProperty from "./Components/Admin/AddProperty";
import PropertyTable from "./Components/Admin/PropertyTable";
import Userlisting from "./Components/Admin/Userlisting";
import Terms from "./Components/Footer/Terms";
import Policy from "./Components/Footer/Policy";
import SalesEnquiry from "./Components/Footer/SalesEnquiry";
import Footer from "./Components/Footer/Footer";
import FeedbackForm from "./Components/Footer/FeedbackForm";
import Feedbacklist from "./Components/Footer/Feedbacklist";
import Body from "./Components/body/Body";
import CustomNavbar from "./Components/Nav/CustomNavbar";
import UserPage from "./Components/UserPage";
import PropertyDetails from "./Components/Prop/PropertyDetails";

function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <CustomNavbar username={username} />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/Login" element={<Login />} />
          {/* <Route path="/Contactus" element={<Contactus />} /> */}
          <Route path="/Signup" element={<Signup />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/Adminlogin" element={<Adminlogin />} />
          <Route path="/Header" element={<Header />} />
          <Route path="/AddProperty" element={<AddProperty />} />
          <Route path="/PropertyTable" element={<PropertyTable />} />
          <Route path="/Userlisting" element={<Userlisting />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/Policy" element={<Policy />} />
          <Route path="/SalesEnquiry" element={<SalesEnquiry />} />
          <Route path="/FeedbackForm" element={<FeedbackForm />} />
          <Route path="/Feedbacklist" element={<Feedbacklist />} />
          <Route path="/UserPage" element={<UserPage setUsername={setUsername} />} />
          <Route path="/PropertyDetails" element={<PropertyDetails />} />
        </Routes>
      </Router>
      <Body />
      <Footer />
    </div>
  );
}

export default App;
