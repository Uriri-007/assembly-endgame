import { useState } from "react";
import { clsx } from "clsx";
import Letter from "./Keyboard";
import StatusBar from "./Status";
import Lives from "./Lives";
import { letterObj, getNewWord, languages, winMessagesArray, defeatMessagesArray } from "./data.js";

export default function Endgame() {
    const [guessedLetters, setGuessedLetter] = useState([]);
    const [currentWord, setCurrentWord] = useState(() => getNewWord());

    const wrongGuessCount = guessedLetters.filter(
        letter => !currentWord.includes(letter)
    ).length;
    const isGameWon = currentWord
        .split("")
        .every(word => guessedLetters.includes(word));
    const isGameLost = wrongGuessCount === languages.length - 1;
    const isGameOver = isGameWon || isGameLost;

    const letterBtns = letterObj.map(letter => {
        const isGuessed = guessedLetters.includes(letter.value);
        const isCorrect = isGuessed && currentWord.includes(letter.value);
        const isWrong = isGuessed && !currentWord.includes(letter.value);
        const className = clsx({
            passed: isCorrect,
            deactivated: isWrong
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
        const styles = {
            color: language.color,
            backgroundColor: language.backgroundColor
        };
        return (
            <Lives
                key={language.lang}
                language={isLangLost ? "💀" : language.lang}
                styles={styles}
            />
        );
    });
    const currentWordBox = currentWord.split("").map((char, index) => {
        const isMatch = guessedLetters.some(letter => letter === char);
        return (
            <span key={index} className="letter-box">
                {isMatch ? char : ""}
            </span>
        );
    });

    function handleUserGuess(letter) {
        setGuessedLetter(prevLetters =>
            prevLetters.includes(letter)
                ? prevLetters
                : [...prevLetters, letter]
        );
    }

    function handleNewGame() {
        setCurrentWord(getNewWord());
        setGuessedLetter([]);
    }

    return (
        <>
            <StatusBar
                className={isGameWon ? "won" : isGameLost ? "lost" : ""}
                messages={
                    isGameOver
                        ? isGameWon
                            ? winMessagesArray
                            : isGameLost
                            ? defeatMessagesArray
                            : ""
                        : ""
                }
            />
            <section className="languages">{languageLives}</section>
            <section className="letter-column">{currentWordBox}</section>
            <section className="letters">{letterBtns}</section>
            <section className="new-game">
                <button
                    onClick={handleNewGame}
                    className={`${isGameOver ? "play-again" : ""}`}
                >
                    New Game
                </button>
            </section>
        </>
    );
}
