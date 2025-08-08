import "./App.css";
import React from "react";
import "./index.css";

function App() {
  const recommendedAnswer = "REACT";

  // Answer state
  const [answer, setAnswer] = React.useState(() =>
    recommendedAnswer
      .split("")
      .map((letter) => ({ letter: letter, isGuessed: false }))
  );
  function answerPlaceholder() {
    return (
      <div className="answerPlaceHolder">
        {answer.map((item) => (
          <h2 className={item.isGuessed ? null : "isNotGuessed"}>
            {item.isGuessed ? item.letter : null}
          </h2>
        ))}
      </div>
    );
  }

  function updateAnswer(keyword) {
    setAnswer((prev) =>
      prev.map((item) =>
        item.letter === keyword ? { ...item, isGuessed: true } : item
      )
    );
  }

  function checkLetterMatching(keyword) {
    const letterExists = answer.some((item) => item.letter === keyword);
    if (letterExists) updateAnswer(keyword);
    return letterExists;
  }

  // Keyboard settings
  const [keyboardLetters, setKeyboardLetters] = React.useState(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      .split("")
      .map((letter) => ({ key: letter, keyword: letter, isClicked: false }))
  );

  function matchedKeyboardLetters(){ 

  }
  function keyboardListener() {
    return (
      <div className="keyboard-container">
        {keyboardLetters.map((currLetter) => (
          <button
            className={
              currLetter.isClicked
                ? {}
                : "keyboard-letters"
            }
            disabled={currLetter.isClicked ? true : false}
            key={currLetter.key}
            onClick={(event) => {
              keyboardHandler(currLetter.keyword);
            }}
          >
            {currLetter.keyword}
          </button>
        ))}
      </div>
    );
  }

  function keyboardHandler(currKeyword) {
    setKeyboardLetters(
      keyboardLetters.map((currItem) =>
        currItem.keyword === currKeyword
          ? { ...currItem, isClicked: true }
          : currItem
      )
    );
    const isMatched= checkLetterMatching(currKeyword);
  }

  // language effects
  const [languages, setLanguage] = React.useState(
    ["Java", "Python", "Ruby", "Go", "NodeJS", "C++", "CSS", "Assembly"].map(
      (item) => ({ langauge: item, isCrossed: false })
    )
  );
  function languageCrossing() {
    return (
      <div className="language-container">
        {languages.map((item) => (
          <h2 className="language"> {item.langauge} </h2>
        ))}
      </div>
    );
  }

  function displayGameOverMessage() {
    return <h4>You Win, Congratulations 🎉🎉</h4>;
  }

  // The Actual return
  return (
    <>
      <h1>Assembly: Endgame</h1>
      <p>Welcome to the Assembly Endgame project!</p>

      <p>
        You have <strong>8</strong> tries to guess the language
      </p>
      <p>Good luck!</p>

      <div className="displayGameOverMessage">{displayGameOverMessage()}</div>

      {answerPlaceholder()}
      {languageCrossing()}
      {keyboardListener()}
    </>
  );
}

export default App;
