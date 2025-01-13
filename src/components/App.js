import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from './Loader';
import Error from './Error';
import StartScreen from "./StartScreen";
import Question from "./Question";

function App() {
  const initialState = {
    questions: [],

    //"loading", 'ready', 'error', 'active', 'finished'
    status: "loading",

    //first question position
    index:0,
    
  };

  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataFailed":
        return { ...state, status: "error" };
      //creating action to set the status to active
      case "start":
        return { ...state, status: "active" };
      default:
        throw new Error("Action Unknown");
    }
  }

  const [{ questions, status, index }, dispatch] = useReducer(reducer, initialState);

  //calculating the number of questions
  const numQuestions = questions.length;

  //fetching data from the fake server
  useEffect(function () {
    fetch("http://localhost:3001/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  },[]);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && <Question question = {questions[index]} />}
      </Main>
    </div>
  );
}

export default App;
