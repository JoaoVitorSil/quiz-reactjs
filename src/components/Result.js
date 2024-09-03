/* eslint-disable react-hooks/exhaustive-deps */
import React , { useEffect , useState } from "react";
import "./Result.css";

import { useNavigate } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const [results, setResults] = useState({});
  let count = 0;

  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
    window.history.go(1);
  };
  
  useEffect(() => {
    const resultsSaved = JSON.parse(localStorage.getItem('results'));
    if (resultsSaved) {
      setResults(resultsSaved);
    }
  }, []); 

  if(Object.keys(results).length>0){
    for(let i=1; i<=Object.keys(results).length;i++){
      if(results[i][1].includes(results[i][0])){
        count++
        console.log(i+" true")
      }
      else{
        console.log(i+" false")
      }
    }
  }
  
  const handleClick = () => {
    localStorage.removeItem('results');
    navigate("/");
  };

  return (
    <div className="result">
      <button onClick={handleClick}>Voltar</button>
      <h1>{count} / {Object.keys(results).length}</h1>
    </div>
  );
}

export default Result;
