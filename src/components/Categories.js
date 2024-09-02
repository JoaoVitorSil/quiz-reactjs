import React, { useEffect } from "react";
import logo from "../logo.png";
import "./Categories.css";
import { getCategories } from "../api";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
        try {
          const data = await getCategories();
          setCategories(data);
        } catch (error) {
          console.log("fetchMovies error: ", error);
        }
      };
    fetchCategories();
  }, []);
  for (const cat of categories) {
    if (cat.name === "bash") {
      cat.name = "Bash";
    }
    if (cat.name === "uncategorized") {
      cat.name = "Random";
    }
  }
  const handleClick = (e) => {
    navigate(`/${e}`);
  };

  if (categories.length === 0) {
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
  }
  return (
    <div className="categories">
      <div className="logo-container">
        <img src={logo} alt="Logo"></img>
      </div>
      <div className="buttons-container">
        <h1>Escolha um categoria:</h1>
        <div className="buttons">
          {categories?.map((cat) => {
            return (
              <button
                className="button"
                key={cat.id}
                onClick={() => handleClick(cat.name)}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Categories;
