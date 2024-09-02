const API_KEY = "gBFzsUTu3DiEeRPB9WPocjYpAC9s6PbWmNM39dGT";

export const getCategories = async () => {
    try {
      const response = await fetch(`https://quizapi.io/api/v1/categories?apiKey=${API_KEY}`)
      return await response.json();
    } catch (error) {
      console.log("error getMovies: ", error);
    }
  };
  
  export const getQuestions = async (category) => {
    try {
      const response = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&limit=20&category=${category}`)
      return await response.json();
    } catch (error) {
      console.log("error getMovies: ", error);
    }
  };