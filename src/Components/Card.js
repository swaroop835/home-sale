import React from "react";
import "./Card.css";

const Card = () => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src="https://st4.depositphotos.com/17828278/24401/v/450/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">Place</h5>
        <p className="card-text">Description</p>
        <a href="/admin" className="btn btn-primary">
          More Info
        </a>
      </div>
    </div>
  );
};

export default Card;
