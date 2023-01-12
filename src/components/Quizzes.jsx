import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Quiz from "./Quiz"

export default function Quizzes() {
    const [quizzes, setQuizzes] = useState([])
    const [next, setNext] = useState(0)
    const [evaluate, setEvaluate] = useState(false)
    const [correctCount, setCorrectCount] = useState(0)

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(res => setQuizzes(cleanQuizzes(res.results)))

        setEvaluate(false)
    }, [next])

    function cleanQuizzes(quizArray) {
        return quizArray.map(quiz => ({
            id: nanoid(),
            question: quiz.question,
            answer: quiz.correct_answer,
            options: prepareAnswerArray(quiz.correct_answer, quiz.incorrect_answers)
        }))
    }

    function prepareAnswerArray(correct_answer, incorrect_answers) {
        const randomIndex = Math.floor(Math.random() * 4)
        const newAnswerArray = []
        const options = [...incorrect_answers]

        for (let i = 0; i < 4; i++) {
            if (i === randomIndex)
                newAnswerArray.push({ answer: correct_answer, selected: false, id: nanoid() })
            else
                newAnswerArray.push({ answer: options.pop(), selected: false, id: nanoid() })
        }

        return newAnswerArray
    }

    function handleAnswer(quizId, answerId) {
        setQuizzes(prevQuizzes => prevQuizzes.map(quiz => {
            const updatedQuiz = { ...quiz }

            if (quiz.id === quizId) {
                const options = quiz.options.map(option => option.id === answerId ? { ...option, selected: true } : { ...option, selected: false })
                updatedQuiz.options = options
            }

            return updatedQuiz
        }))
    }

    function handleEvaluate() {
        setEvaluate(true)
        quizzes.forEach(quiz => {
            const answer = quiz.options.find(option => option.selected && quiz.answer === option.answer)
            if (answer)
                setCorrectCount(prevVal => prevVal + 1)
        })
    }

    function handleNext() {
        setNext(prevVal => prevVal + 1)
    }

    const quizElements = quizzes.map(quiz => (
        <Quiz key={quiz.id} quiz={quiz} handleAnswer={handleAnswer} evaluate={evaluate} />
    ))

    let content = <button onClick={handleEvaluate} className="bottom-button">Check Answers</button>
    if (evaluate)
        content = <React.Fragment>
            <h2 className="result">You scored {correctCount}/5 correct answers</h2>
            <button onClick={handleNext} className="bottom-button">Play Again</button>
        </React.Fragment>

    return (
        <div className="quizzes">
            {quizElements}
            <div className="quizzes-bottom">
                {content}
            </div>
        </div>
    )
}