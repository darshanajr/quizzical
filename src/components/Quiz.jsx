import Answer from "./Answer"

export default function Quiz(props) {
    const answerElements = props.quiz.options.map(option => (
        <Answer key={option.id} option={option}
            answer={props.quiz.answer}
            handleAnswer={props.handleAnswer}
            quizId={props.quiz.id}
            evaluate={props.evaluate} />
    ))

    return (
        <section className="quiz">
            <h1 className="question">{props.quiz.question}</h1>
            <div className="answers">
                {answerElements}
            </div>
            <hr />
        </section>
    )
}