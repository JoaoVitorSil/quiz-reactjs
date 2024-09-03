/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import "./Result.css";

import { useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const [results, setResults] = useState({});

  const correct = [];
  let count = 0;

  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
    window.history.go(1);
  };

  useEffect(() => {
    const resultsSaved = JSON.parse(localStorage.getItem("results"));
    if (resultsSaved) {
      setResults(resultsSaved);
    }
  }, []);

  if (Object.keys(results).length > 0) {
    for (let i = 1; i <= Object.keys(results).length; i++) {
      if (results[i][1].includes(results[i][0])) {
        count++;
        correct[i - 1] = "true";
      } else {
        correct[i - 1] = "false";
      }
    }
  }

  const handleClick = () => {
    localStorage.removeItem("results");
    navigate("/");
  };

  return (
    <div className="result">
      <div className="button-container">
        <button className="button-back" onClick={handleClick}>
          Back
        </button>
      </div>
      <div className="result-container">
        <div className="display">
          <h1>Corrrect Answers:</h1>
          <h1>
            {count} / {Object.keys(results).length}
          </h1>
        </div>
        <div className="answers-container">
          {correct.map((e, id) => {
            return e === "true" ? (
              <div className="answer">
                <h2  key={id * 2}>
                  Question {id + 1}:{" "}
                </h2>
                <IoMdCheckmark className="correct"/>
              </div>
            ) : (
              <div className="answer">
                <h2 key={id * 2}>
                  Question {id + 1}:{" "}
                </h2>
                <IoMdClose className="incorrect"/>
         
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Result;
