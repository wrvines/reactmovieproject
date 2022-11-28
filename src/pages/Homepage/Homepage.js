import React from "react";
import Slider from "../../components/SLider/Slider";
import "./Homepage.css";

function Homepage({ apiKey, baseUrl }) {
  return (
    <div className="homepage-container">
      <Slider apiKey={apiKey} baseUrl={baseUrl} />
    </div>
  );
}

export default Homepage;
