/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./Result.css";

import { useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  let count = 0
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
    window.history.go(1);
  };
  
 
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="result">
      <button onClick={handleClick}>Voltar</button>
      <h1>{count}</h1>
    </div>
  );
}

export default Result;
