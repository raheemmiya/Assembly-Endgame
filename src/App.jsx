import "./App.css";
import React from "react";
import "./index.css";
import { getRandomWord } from "./utils";
import { clsx } from "clsx";
import { languages } from "./languages";

function App() {
  //states
  const [currentWord, setCurrentWord] = React.useState(() =>
    getRandomWord().toUpperCase()
  );
  const [guessedLetter, setGuessedLetter] = React.useState([]);

  //local variables
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const guessCount = guessedLetter.length;
  const gameWin = currentWord
    .split("")
    .every((letter) => guessedLetter.includes(letter));
  const rightGuesses = currentWord
    .split("")
    .map((letter) => (guessedLetter.includes(letter) ? letter : null));
  const rightGuessCount = rightGuesses.length;

  const wrongGuesses = guessedLetter.filter(
    (letter) => !currentWord.toUpperCase().includes(letter)
  );
  const wrongGuessesCount = wrongGuesses.length;
  let tempWrongGuessCount = wrongGuessesCount;

  const gameLoss =
    wrongGuessesCount === 8 &&
    !currentWord.split("").every((letter) => guessedLetter.includes(letter));
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
    const isAlreadyGuessed = guessedLetter.includes(word);

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
    const upperKeyword = keyword.toUpperCase();
    const isGuessed = guessedLetter.includes(upperKeyword);
    const isCorrect = isGuessed && currentWord.includes(upperKeyword);
    const isWrong = isGuessed && !currentWord.includes(upperKeyword);
    const maxLengthReached = wrongGuessesCount == 8;

    const className = clsx("keyword-letters", {
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        key={upperKeyword}
        className={className}
        disabled={isGuessed || maxLengthReached || gameOver}
        onClick={() => clickHandler(upperKeyword)}
      >
        {keyword}
      </button>
    );
  });

  const gameWinStatus = (
    <h4 className="game-win">You Win, Congratulations 🎉🎉</h4>
  );
  const gameLostStatus = (
    <h4 className="game-lost">You Lost! Better start learning Assembly🤖☹️</h4>
  );
  const constantGameStatus = (
    <h4 className="game-constant">Come on! You can do it!!</h4>
  );

  const statusElement = () => {
    if (gameWin) {
      return gameWinStatus;
    } else if (gameLoss) {
      return gameLostStatus;
    } else {
      return constantGameStatus;
    }
  };

  const languageElement = languages.map((item) => {
    const isFaded = tempWrongGuessCount > 0;
    const styles = {
      "--background-color": item.backgroundColor,
      "--text-color": item.color,
      "--opacty": isFaded ? 0.3 : 1,
    };
    tempWrongGuessCount = tempWrongGuessCount - 1;
    return (
      <h1 key={item.name} className="language" style={styles}>
        {item.name}
      </h1>
    );
  });

  const answerRevealElement = <h2>The Answer is {currentWord}</h2>;

  function renderNewGame() {
    return (
      <button onClick={() => handleNewGame()} className="new-game-button">
        New Game
      </button>
    );
  }

  function handleNewGame() {
    setCurrentWord(() => getRandomWord().toUpperCase());
    setGuessedLetter([]);
  }

  return (
    <>
      <h1>Assembly: Endgame</h1>
      <p>Welcome to the Assembly Endgame project!</p>

      <p>
        You have <strong>8 </strong>wrong tries to guess the language
      </p>
      <p>Good luck!</p>

      <div className="displayGameOverMessage">{statusElement()}</div>
      <div className="answerPlaceholder"> {answerElement} </div>
      {gameLoss && (
        <div className="answerReveal-container"> {answerRevealElement} </div>
      )}
      <div className="language-container"> {languageElement}</div>
      <div className="keyboard-container">{keyboardElement}</div>
      {gameOver && (
        <div className="new-game-button-container">{renderNewGame()}</div>
      )}
    </>
  );
}

export default App;
