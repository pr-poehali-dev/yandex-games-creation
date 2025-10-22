import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Question } from './types';
import { MusicButton } from './MusicButton';

interface QuestionScreenProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  isMusicPlaying: boolean;
  onAnswer: (character: string) => void;
  onRestart: () => void;
  onToggleMusic: () => void;
}

export function QuestionScreen({ 
  question, 
  currentQuestion, 
  totalQuestions, 
  isMusicPlaying,
  onAnswer, 
  onRestart,
  onToggleMusic
}: QuestionScreenProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="fixed top-4 right-4 z-50">
        <MusicButton isMusicPlaying={isMusicPlaying} onToggle={onToggleMusic} />
      </div>

      <Card className="max-w-2xl w-full bg-white/95 backdrop-blur-sm border-4 border-game-dark p-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-game text-game-dark">
                Вопрос {currentQuestion + 1} из {totalQuestions}
              </span>
              <span className="text-lg font-game text-game-dark">
                {Math.round(progress)}%
              </span>
            </div>
            
            <div className="w-full bg-game-dark/20 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-game-orange to-game-yellow transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="text-center py-6">
            <h2 className="text-3xl font-game text-game-dark mb-2">
              {question.text}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => onAnswer(option.character)}
                className="h-auto py-6 px-6 text-lg font-body bg-white hover:bg-gradient-to-r hover:from-game-cyan hover:to-game-yellow border-2 border-game-dark text-game-dark hover:text-white transition-all hover:scale-105"
              >
                <div className="text-left w-full">
                  {option.text}
                </div>
              </Button>
            ))}
          </div>

          <Button
            onClick={onRestart}
            variant="outline"
            className="w-full border-2 border-game-dark hover:bg-game-dark/10"
          >
            <Icon name="Home" size={20} className="mr-2" />
            Начать заново
          </Button>
        </div>
      </Card>
    </div>
  );
}
