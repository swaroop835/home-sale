import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ image, description,place, price, id, houseno }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={image} className="card-img-top" alt={description} />
      <div className="card-body">
        <h5 className="card-title">{description}</h5>
        {place}
        <p className="card-text">{price}</p>
        <Link
          onClick={() => {
            localStorage.setItem("house_no", houseno);
          }}
          to={`/PropertyDetails`}
          className="btn btn-primary"
        >
          More Info
        </Link>
      </div>
    </div>
  );
};

export default Card;
  