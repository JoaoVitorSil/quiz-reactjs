/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import "./Questions.css";
import React, { useEffect } from "react";
import { getQuestions } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

function Questions() {
  const navigate = useNavigate();
  let { category } = useParams();
  const [questions, setQuestions] = React.useState([]);
  const [count, setCount] = React.useState(1);
  const [selecoes, setSelecoes] = React.useState({});
  const [correctAnswer, setCorrectAnswer] = React.useState([]);
  const [answer, setAnswer] = React.useState([]);
  const [results, setResults] = React.useState({});

  if (category === "Bash") {
    category = "bash";
  }
  if (category === "Random") {
    category = "uncategorized";
  }
  const fetchQuestions = async () => {
    try {
      const data = await getQuestions(category);
      setQuestions(data);
    } catch (error) {
      console.log("fetchMovies error: ", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleClick = (e) => {
    localStorage.setItem('results', JSON.stringify(results));
    navigate("/Result");
  };
  const handleClicknext = () => {
    setCount(count + 1);
    if (count === questions.length) {
      setCount(questions.length);
    }
  };
  const handleClickprevious = () => {
    setCount(count - 1);
    if (count === 1) {
      setCount(1);
    }
  };
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setSelecoes({ ...selecoes, [name]: value });
    setAnswer(value);
    const correct_answers = Object.entries(
      questions[count - 1].correct_answers
    );
    for (const answer of correct_answers) {
      if (answer[1] === "true") {
        setCorrectAnswer(answer[0]);
      }
    }
  };
  useEffect(() => {
    setResults({...results,[count]: [answer, correctAnswer]});
  }, [answer, correctAnswer]);

  if (questions.length === 0) {
    return (
      <div className="loading">
        <TailSpin
          visible={true}
          height="200"
          width="200"
          color="#0671b8"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  } else if (questions[count - 1]["multiple_correct_answers"] === "false") {
    const answers_options = Object.entries(questions[count - 1].answers);

    return (
      <div className="questions">
        <div className="head">
          <h2 className="count">
            Question: {count} of {questions.length}{" "}
          </h2>
          {Object.keys(selecoes).length === questions.length ? (
            <button className="btn btn-result" onClick={handleClick}>Result</button>
          ) : (
            <div></div>
          )}
        </div>
        <div className="question-container">
          <div className="title">
            <h2>{questions[count - 1].question}</h2>
          </div>
          <div className="options-container">
            {answers_options.map((answers, index) => {
              if (answers[1]) {
                return (
                  <label className="options" key={index * 2}>
                    <div className="input">
                      <input
                        type="radio"
                        name={`question-${count}`}
                        value={answers[0]}
                        checked={selecoes[`question-${count}`] === answers[0]}
                        onChange={handleRadioChange}
                      />
                    </div>

                    <div className="description">{answers[1]}</div>
                  </label>
                );
              }
            })}
          </div>
        </div>
        <div className="buttons-cont">
          <button
            className="btn l"
            disabled={count <= 1}
            onClick={handleClickprevious}
          >
            Previous
          </button>
          <button
            className="btn r"
            disabled={count >= questions.length}
            onClick={handleClicknext}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Questions;
