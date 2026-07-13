import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

import TopicSelection from '@/pages/TopicSelection';
import QuizFinish from '@/pages/QuizFinish';
import QuizSetup from '@/pages/QuizSetup';
import Quiz from '@/pages/Quiz';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopicSelection />} />
        <Route path="/quiz-setup" element={<QuizSetup />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="quiz-finish" element={<QuizFinish />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;