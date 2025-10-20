import { useState } from "react";
import { clsx } from "clsx";
import Letter from "./Keyboard";
import StatusBar from "./Status";
import Lives from "./Lives";
import { letterObj, words, languages } from "./data.js";

export default function Endgame() {
    const [guessedLetters, setGuessedLetter] = useState([]);
    const [currentWord, setCurrentWord] = useState("REACT");
    
    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
    const isGameOver = currentWord.split("").every(word => guessedLetters.includes(word)) || wrongGuessCount === languages.length - 1

    const letterBtns = letterObj.map(letter => {
      const isGuessed = guessedLetters.includes(letter.value)
      const isCorrect = isGuessed && currentWord.includes(letter.value)
      const isWrong = isGuessed && !currentWord.includes(letter.value)
      const className = clsx({
        passed: isCorrect,
        deactivated: isWrong
      })
      
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
      const isLangLost = index < wrongGuessCount
        const aliveStyles = {
            color: language.color,
            backgroundColor: language.backgroundColor
        };
        const deadStyles = {
          backgroundColor: "gray",
          filter: "blur(0.4px)"
        }
        return (
            <Lives
                key={language.lang}
                language={isLangLost ? "💀" : language.lang}
                styles={isLangLost ? deadStyles : aliveStyles}
            />
        );
    });
    const currentWordBox = currentWord.split("").map((char, index) => {
        const isMatch = guessedLetters.some(letter => letter === char)
        return (<span key={index} className="letter-box">
            {isMatch ? char : ""}
        </span>)
    });

    function handleUserGuess(letter) {
        setGuessedLetter(prevLetters =>
            prevLetters.includes(letter)
                ? prevLetters
                : [...prevLetters, letter]
        );
    }

    return (
        <>
            <StatusBar />
            <section className="languages">{languageLives}</section>
            <section className="letter-column">{currentWordBox}</section>
            <section className="letters">{letterBtns}</section>
            {isGameOver === true && <section className="new-game">
                <button>New Game</button>
            </section>}
        </>
    );
}
