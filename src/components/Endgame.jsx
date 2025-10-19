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
    const languageLives = languages.map(language => {
        const styles = {
            color: language.color,
            backgroundColor: language.backgroundColor
        };
        return (
            <Lives
                key={language.lang}
                language={language.lang}
                styles={styles}
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
            <section className="new-game">
                <button>New Game{wrongGuessCount}</button>
            </section>
        </>
    );
}
