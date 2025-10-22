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
  onPrevious: () => void;
  onNext: () => void;
  onRestart: () => void;
  onToggleMusic: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export function QuestionScreen({ 
  question, 
  currentQuestion, 
  totalQuestions, 
  isMusicPlaying,
  onAnswer, 
  onPrevious,
  onNext,
  onRestart,
  onToggleMusic,
  canGoPrevious,
  canGoNext
}: QuestionScreenProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-orange-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 text-4xl animate-pulse">🕸️</div>
        <div className="absolute bottom-10 left-10 text-4xl animate-bounce">🦇</div>
      </div>
      
      <div className="fixed top-4 right-4 z-50">
        <MusicButton isMusicPlaying={isMusicPlaying} onToggle={onToggleMusic} />
      </div>

      <Card className="max-w-2xl w-full bg-black/80 backdrop-blur-sm border-4 border-orange-600 p-8 shadow-2xl shadow-orange-600/40 relative z-10">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-game text-orange-400">
                Вопрос {currentQuestion + 1} из {totalQuestions}
              </span>
              <span className="text-lg font-game text-orange-400">
                {Math.round(progress)}%
              </span>
            </div>
            
            <div className="w-full bg-orange-950/50 rounded-full h-3 overflow-hidden border border-orange-700">
              <div
                className="h-full bg-gradient-to-r from-orange-600 to-red-600 transition-all duration-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="text-center py-6">
            <h2 className="text-2xl md:text-3xl font-game text-orange-500 mb-2 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)] break-words">
              {question.text}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => onAnswer(option.character)}
                className="h-auto py-4 px-4 text-base font-body bg-white/95 hover:bg-gradient-to-r hover:from-orange-600 hover:to-red-600 border-2 border-orange-500 text-gray-900 hover:text-white transition-all hover:scale-105 shadow-lg hover:shadow-orange-500/60 hover:border-orange-400"
              >
                <div className="text-left w-full break-words font-bold">
                  {option.text}
                </div>
              </Button>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onPrevious}
              disabled={!canGoPrevious}
              variant="outline"
              className="flex-1 border-2 border-orange-500 bg-white/95 hover:bg-orange-600 text-gray-900 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Icon name="ChevronLeft" size={20} className="mr-1" />
              Назад
            </Button>

            {canGoNext && (
              <Button
                onClick={onNext}
                variant="outline"
                className="flex-1 border-2 border-orange-500 bg-white/95 hover:bg-orange-600 text-gray-900 hover:text-white transition-all"
              >
                Далее
                <Icon name="ChevronRight" size={20} className="ml-1" />
              </Button>
            )}
          </div>

          <Button
            onClick={onRestart}
            variant="outline"
            className="w-full border-2 border-orange-500 bg-white/95 hover:bg-orange-600 text-gray-900 hover:text-white transition-all"
          >
            <Icon name="Home" size={20} className="mr-2" />
            Начать заново
          </Button>
        </div>
      </Card>
    </div>
  );
}