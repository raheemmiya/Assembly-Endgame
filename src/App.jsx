import "./App.css";
import React from "react";
import "./index.css";
import { getRandomWord } from "./utils";
import { clsx } from "clsx";

function App() {
  //states
  const [currentWord, setCurrentWord] = React.useState("REACT");
  const [guessedLetter, setGuessedLetter] = React.useState([]);

  //local variables
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const guessCount = guessedLetter.length;
  const gameWin = currentWord
    .split("")
    .every((letter) => guessedLetter.includes(letter.toUpperCase()));
  const rightGuesses = currentWord
    .split("")
    .map((letter) => (guessedLetter.includes(letter) ? letter : null));
  const rightGuessCount = rightGuesses.length;
  const wrongGuesses = guessedLetter.filter(
    (letter) => !currentWord.toUpperCase().includes(letter)
  );
  const wrongGuessesCount = wrongGuesses.length;
  const gameLoss =
    guessedLetter.length == 8 &&
    !currentWord
      .split("")
      .every((letter) => guessedLetter.includes(letter.toUpperCase()));
  const gameOver = gameLoss || gameWin;

  // functions
  function clickHandler(keyword) {
    const upperKeyword = keyword.toUpperCase();
    if (!guessedLetter.includes(upperKeyword)) {
      setGuessedLetter((prev) => [...prev, upperKeyword]);
    }
  }

  //hard variables
  const answerElement = currentWord.split("").map((word) => {
    const isAlreadyGuessed = rightGuesses.includes(word);

    return (
      <h1
        className={clsx(
          isAlreadyGuessed && "isAlreadyGuessedAnswer",
          !isAlreadyGuessed && "notGuessedAnswer"
        )}
      >
        {word}
      </h1>
    );
  });

  const keyboardElement = alphabet.split("").map((keyword) => {
    const isGuessed = guessedLetter.includes(keyword.toUpperCase());
    const isCorrect = isGuessed && currentWord.includes(keyword.toUpperCase());
    const isWrong = isGuessed && !currentWord.includes(keyword.toUpperCase());
    const className = clsx("keyword-letters", {
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button key = {keyword} className={className} disabled = {isGuessed} onClick={() => clickHandler(keyword)}>
        {keyword}
      </button>
    );
  });

  return (
    <>
      <h1>Assembly: Endgame</h1>
      <p>Welcome to the Assembly Endgame project!</p>

      <p>
        You have <strong>8</strong> tries to guess the language
      </p>
      <p>Good luck!</p>

      <div className="displayGameOverMessage">
        <h4>You Win, Congratulations 🎉🎉</h4>
      </div>

      <div className="answerPlaceholder"> {answerElement} </div>
      <div className="keyboard-container">{keyboardElement}</div>
    </>
  );
}

export default App;
