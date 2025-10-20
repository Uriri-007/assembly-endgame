import { useState, useEffect, useRef } from "react";
import { clsx } from "clsx";
import Letter from "./Keyboard";
import StatusBar from "./Status";
import Lives from "./Lives";
import { letterObj, words, languages } from "./data.js";

function getNewWord() {
  const rndmX = Math.floor(Math.random() * words.length);
  return words[rndmX].toUpperCase();
}

export default function Endgame() {
  const [guessedLetters, setGuessedLetter] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [goneLang, setGoneLang] = useState("")
  const isGone = useRef("")
    
  useEffect(() => {
    setCurrentWord(getNewWord());
  }, []);

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const isGameWon = currentWord
    .split("")
    .every((word) => guessedLetters.includes(word));
  const isGameLost = wrongGuessCount === languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const lostLanguages = [];

  const letterBtns = letterObj.map((letter) => {
    const isGuessed = guessedLetters.includes(letter.value);
    const isCorrect = isGuessed && currentWord.includes(letter.value);
    const isWrong = isGuessed && !currentWord.includes(letter.value);
    const className = clsx({
      passed: isCorrect,
      deactivated: isWrong,
    });

    return (
      <Letter
        key={letter.value}
        handleClick={handleUserGuess}
        value={letter.value}
        clsxClass={className}
      />
    );
  });
  const languageLives = languages.map((language, index) => {
    const isLangLost = index < wrongGuessCount;
    isLangLost && lostLanguages.push(language.lang)
    isLangLost ? isGone.current = language.lang : ""
    const aliveStyles = {
      color: language.color,
      backgroundColor: language.backgroundColor,
    };
    const deadStyles = {
      backgroundColor: "gray",
    };
    return (
      <Lives
        key={language.lang}
        language={isLangLost ? "💀" : language.lang}
        styles={isLangLost ? deadStyles : aliveStyles}
      />
    );
  });
  const currentWordBox = currentWord.split("").map((char, index) => {
    const isMatch = guessedLetters.some((letter) => letter === char);
    return (
      <span key={index} className="letter-box">
        {isMatch ? char : ""}
      </span>
    );
  });

  function handleUserGuess(letter) {
    setGuessedLetter((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  const winMessagesArray = [
    "You did it! You really saved some programming languages from the fallout🎉🎉🎉🎉",
    "You saved them... How can we repay you for your kindness?",
  ];

  const defeatMessagesArray = [
    `Farewell ${lostLanguages[lostLanguages.length - 1]}`,
    `Its been an honour, ${lostLanguages[lostLanguages.length - 1]}`,
    `We lost ${lostLanguages[lostLanguages.length - 1]} today`,
    `Nooooo! 
        😢😢😢 ${lostLanguages[lostLanguages.length - 1]} 😭`,
  ];

  function handleNewGame() {
    setCurrentWord(getNewWord());
    setGuessedLetter([]);
  }

  return (
    <>
      <StatusBar
        className={isGameWon ? "won" : isGameLost ? "lost" : ""}
        messages={
          isGameWon ? winMessagesArray : isGone.current ? defeatMessagesArray : ""
        }
      />
      <section className="languages">{languageLives}</section>
      <section className="letter-column">{currentWordBox}</section>
      <section className="letters">{letterBtns}</section>
      {isGameOver === true && (
        <section className="new-game">
          <button onClick={handleNewGame}>New Game</button>
        </section>
      )}
    </>
  );
}
