import {
  RestartButton,
  GeneratedWords,
  CountDownTimer,
  Results,
  UserTyping,
} from "./components";
import useEngine from "./hooks/useEngine";
import { calculateAccuracyPercentage } from "./utils/helpers";

const App = () => {
  const { words, typed, timeLeft, errors, state, restart, totalTyped } =
    useEngine();
  return (
    <>
      <CountDownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <GeneratedWords key={words} words={words} />
        <UserTyping
          className="absolute inset-0"
          userInput={typed}
          words={words}
        />
      </WordsContainer>
      <RestartButton
        onRestart={restart}
        className="mx-auto mt-10 text-slate-500"
      />
      <Results
        className="mt-10"
        state={state}
        errors={errors}
        // wordsPerMinute={50}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
      />
    </>
  );
};

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative max-w-xl mt-3 text-3xl leading-relaxed break-all">
      {children}
    </div>
  );
};

export default App;
