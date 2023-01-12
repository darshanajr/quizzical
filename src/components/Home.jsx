import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate()

    function handleStartQuiz() {
        navigate("/quizzes")
    }

    return (
        <div className="home-content">
            <h1 className="home-title">Quizzical</h1>
            <p className="home-description">Lets evaluate your IQ</p>
            <button className="home-start-button" onClick={handleStartQuiz}>Start Quiz</button>
        </div>
    )
}