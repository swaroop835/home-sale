import React from "react";
import { useref, useEffect, useState } from "react";
const paragraphStyle = {
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};
export default function ReadMore() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <p style={isOpen ? null : paragraphStyle}>
        As the largest platform connecting property buyers and sellers, Dream
        Homes boasts over 2 crore monthly visitors and 15 lakh active property
        listings. With experience,Dream Homes will evolve into a comprehensive
        service provider, offering home loans, interiors and expert advice.Dream
        Homes also offers extensive research-based knowledge and insight-driven
        platforms like MBTV, India's leading online real estate YouTube channel,
        along with proprietary tools providing home buyers with price trends,
        forecasts and locality reviews.
      </p>
      <div id="rmore" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Read less..." : "Read more..."}
      </div>
    </div>
  );
}
