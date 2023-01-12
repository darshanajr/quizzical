import Home from "./components/Home"
import Quizzes from "./components/Quizzes"
import { Route, Routes } from 'react-router-dom';

export default function App() {

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="quizzes" element={<Quizzes />} />
    </Routes>
  )
}
