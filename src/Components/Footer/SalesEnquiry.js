import React from "react";
import logo from "../../logo.png";
import "./SalesEnquiry.css";

function SalesEnquiry() {
  return (
    <div className="sales-enquiry-container">
      <h1 className="sales-enquiry-header">
        <b>Need Help?</b> We're Here for You!
      </h1>
      <table className="sales-enquiry-table" border="3px">
        <thead>
          <tr>
            <th colSpan="2">District</th>
            <th colSpan="2">Address</th>
            <th colSpan="2">Phone No</th>
            <th colSpan="2">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2" className="district">
              Trivandrum
            </td>
            <td colSpan="2" className="address">
              Ankit Bhargava (Sales Consultant) Mr. Abhishek Kumar (For Owner
              Enquiry) Dream Homes Realty Services Limited, G 10/8, 4th floor,
              Padamdeep tower, Sanjay place, Trivandrum, Kerala
            </td>
            <td colSpan="2" className="phone-number">
              07217565363, 07876400400
            </td>
            <td colSpan="2" className="email">
              ankit.bhargava@dreamhomes.com, enquiry@dreamhomes.com
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="district">
              Kollam
            </td>
            <td colSpan="2" className="address">
              Mr. Nilay Shah (Area Sales Manager) Mr. Dharmesh Goyal (Zonal
              Manager) Mr. Krunal Gohil (AM) Mr. Abhishek Kumar (For Owner
              Enquiry) Dream Homes Realty Services Limited, Fadia Chambers, 139,
              Ashram Rd, Opposite Bata Showroom, Karunagapally, Kollam, Kerala
            </td>
            <td colSpan="2" className="phone-number">
              09173499900, 09665562252
            </td>
            <td colSpan="2" className="email">
              nilay.shah@dreamhomes.com
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="district">
              Pathanamthitta
            </td>
            <td colSpan="2" className="address">
              Mr. Vinod Gowda (Zonal Manager) Dream Homes Limited No, 62, 1st
              Floor, 6th Cross, 27th Main Road, Phase 3, 1st Sector, HSR Layout.
              Pathanamthitta,Kerala.
            </td>
            <td colSpan="2" className="phone-number">
              {" "}
              7619505963,09986383851
            </td>
            <td colSpan="2" className="email">
              {" "}
              vinod.gowda@dreamhomes.com
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="district">
              Alappuzha
            </td>
            <td colSpan="2" className="address">
              Mr. Mitesh Patel Mr. Abhishek Kumar (For Owner Enquiry) Dream
              Homes Limited The Times Of India Building, 49, Krishna Nagar, Opp.
              Vaccine Ground, Old Padra Road, Alappuzha,Kerala.
            </td>
            <td colSpan="2" className="phone-number">
              9998975632,07876400400
            </td>
            <td colSpan="2" className="email">
              {" "}
              mitesh.patel@dreamhomes.com
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="district">
              Kottayam
            </td>
            <td colSpan="2" className="address">
              Mr. Utkal Keshari Patra (Area Sales Manager) Mr. Abhishek Kumar
              (For Owner Enquiry)Dream Homes Limited , The Times Of India Z
              Tower, 7th Floor, Patia Main Road, Kottayam,Kerala.
            </td>
            <td colSpan="2" className="phone-number">
              08763215258,07876400400
            </td>
            <td colSpan="2" className="email">
              {" "}
              utkalkeshari.patra@timesgroup.com
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="district">
              {" "}
              Thrissur
            </td>
            <td colSpan="2" className="address">
              Mr. Vasudevan K (Zonal Manager) Mr. Abhishek Kumar (For Owner
              Enquiry) Dream Homes Limited Dot Space , Cloud 9 Building, 2nd
              Floor, Main Avenue, MIG Housing Society, Panampilly Nagar,Thrissur
              , Kerala.
            </td>
            <td colSpan="2" className="phone-number">
              {" "}
              09952345292 07876400400
            </td>
            <td colSpan="2" className="email">
              {" "}
              vasudevan.k@dreamhomes.com
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SalesEnquiry;
