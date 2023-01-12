export default function Answer(props) {

    let color = "#F5F7FB"
    if (props.evaluate && props.answer === props.option.answer)
        color = "#94D7A2"
    else if (props.evaluate && props.option.selected && props.answer !== props.option.answer)
        color = "#F8BCBC"
    else if (props.option.selected)
        color = "#D6DBF5"

    const styles = {
        backgroundColor: color,
        border: props.option.selected || (props.evaluate && props.answer === props.option.answer) ? "none" : "0.794239px solid #4D5B9E",
        opacity: !(props.answer === props.option.answer) && props.evaluate ? 0.5 : 1
    }

    return (
        <button className="answer" style={styles}
            disabled={props.evaluate}
            onClick={() => props.handleAnswer(props.quizId, props.option.id)}>{props.option.answer}</button>
    )
}