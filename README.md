# Assembly: Endgame

Assembly: Endgame is a React-based word guessing game where players try to guess the name of a programming language within 8 wrong guesses. The game provides interactive feedback and visually tracks correct and incorrect guesses.

---

## Features

- Randomly selects a programming language as the word to guess.
- Displays letters as blanks and reveals correct guesses.
- Shows a keyboard for guessing letters; disables used or invalid keys.
- Tracks up to 8 wrong guesses; game ends on win or loss.
- Displays game status messages (win, loss, or encouragement).
- Highlights languages with color fading based on wrong guesses.
- Button to start a new game, resetting the state.

---

## Technologies Used

- React with functional components and hooks (`useState`)
- CSS modules for styling (custom properties for dynamic colors and opacity)
- `clsx` package for conditional classNames
- Custom utility for fetching random words

---

## Installation

1. Clone this repository  
```bash
git clone https://github.com/yourusername/assembly-endgame.git
cd assembly-endgame

## Acknowledgements
Inspired by classic Hangman games.

Thanks to React community and clsx package for helpful tools.
