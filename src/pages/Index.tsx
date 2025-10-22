import { useState, useEffect, useRef } from 'react';
import { questions, characters } from '@/components/quiz/data';
import { StartScreen } from '@/components/quiz/StartScreen';
import { QuestionScreen } from '@/components/quiz/QuestionScreen';
import { ResultScreen } from '@/components/quiz/ResultScreen';
import { Character } from '@/components/quiz/types';

export default function Index() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<Character | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log('Audio play error:', err));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleAnswer = (character: string) => {
    const newAnswers = { ...answers };
    newAnswers[character] = (newAnswers[character] || 0) + 1;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, number>) => {
    let maxCount = 0;
    let resultCharacter = 'steve';

    Object.entries(finalAnswers).forEach(([char, count]) => {
      if (count > maxCount) {
        maxCount = count;
        resultCharacter = char;
      }
    });

    const character = characters.find(c => c.id === resultCharacter);
    const finalResult = character || characters[0];
    
    setResult(finalResult);
    setShowResult(true);

    const totalTests = parseInt(localStorage.getItem('totalTests') || '0') + 1;
    localStorage.setItem('totalTests', totalTests.toString());
    
    const charCount = parseInt(localStorage.getItem(resultCharacter) || '0') + 1;
    localStorage.setItem(resultCharacter, charCount.toString());
  };

  const restart = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  const startTest = () => {
    setStarted(true);
    setCurrentQuestion(0);
  };

  if (showResult && result) {
    const totalTests = parseInt(localStorage.getItem('totalTests') || '0');
    const steveCount = parseInt(localStorage.getItem('steve') || '0');
    const alexCount = parseInt(localStorage.getItem('alex') || '0');
    const creeperCount = parseInt(localStorage.getItem('creeper') || '0');
    const villagerCount = parseInt(localStorage.getItem('villager') || '0');

    return (
      <ResultScreen
        result={result}
        showStats={showStats}
        isMusicPlaying={isMusicPlaying}
        totalTests={totalTests}
        steveCount={steveCount}
        alexCount={alexCount}
        creeperCount={creeperCount}
        villagerCount={villagerCount}
        onRestart={restart}
        onToggleStats={() => setShowStats(!showStats)}
        onToggleMusic={toggleMusic}
      />
    );
  }

  if (!started) {
    return (
      <StartScreen
        questionsCount={questions.length}
        isMusicPlaying={isMusicPlaying}
        onStart={startTest}
        onToggleMusic={toggleMusic}
      />
    );
  }

  const question = questions[currentQuestion];

  return (
    <QuestionScreen
      question={question}
      currentQuestion={currentQuestion}
      totalQuestions={questions.length}
      isMusicPlaying={isMusicPlaying}
      onAnswer={handleAnswer}
      onRestart={restart}
      onToggleMusic={toggleMusic}
    />
  );
}
