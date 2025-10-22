import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { MusicButton } from './MusicButton';

interface StartScreenProps {
  questionsCount: number;
  isMusicPlaying: boolean;
  onStart: () => void;
  onToggleMusic: () => void;
}

export function StartScreen({ questionsCount, isMusicPlaying, onStart, onToggleMusic }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="fixed top-4 right-4 z-50">
        <MusicButton isMusicPlaying={isMusicPlaying} onToggle={onToggleMusic} />
      </div>

      <Card className="max-w-2xl w-full bg-white/95 backdrop-blur-sm border-4 border-game-dark p-8">
        <div className="text-center space-y-6">
          <div className="flex justify-center gap-4 mb-4">
            <div className="text-6xl animate-bounce">🎮</div>
            <div className="text-6xl animate-bounce" style={{ animationDelay: '0.1s' }}>⛏️</div>
            <div className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎯</div>
          </div>

          <div>
            <h1 className="text-5xl font-game text-game-dark mb-3">
              Какой ты персонаж Minecraft?
            </h1>
            <p className="text-xl font-body text-game-dark/80">
              Пройди тест и узнай, кто ты в мире Майнкрафт!
            </p>
          </div>

          <div className="bg-game-dark/5 rounded-xl p-6 text-left">
            <h3 className="text-xl font-game text-game-dark mb-3">Тебя ждет:</h3>
            <ul className="space-y-2 font-body text-game-dark/80">
              <li className="flex items-center gap-2">
                <span className="text-2xl">📝</span>
                {questionsCount} интересных вопросов
              </li>
              <li className="flex items-center gap-2">
                <span className="text-2xl">🎭</span>
                Уникальные персонажи
              </li>
              <li className="flex items-center gap-2">
                <span className="text-2xl">✨</span>
                Подробное описание твоего характера
              </li>
              <li className="flex items-center gap-2">
                <span className="text-2xl">📤</span>
                Возможность поделиться результатом
              </li>
            </ul>
          </div>

          <Button
            onClick={onStart}
            className="w-full h-16 text-2xl font-game bg-gradient-to-r from-game-orange to-game-yellow hover:scale-105 transition-transform"
          >
            <Icon name="Play" size={32} className="mr-2" />
            Начать тест
          </Button>
        </div>
      </Card>
    </div>
  );
}
