import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface StartScreenProps {
  questionsCount: number;
  onStart: () => void;
}

export function StartScreen({ questionsCount, onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-purple-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">🎃</div>
        <div className="absolute top-20 right-20 text-5xl animate-pulse">👻</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-bounce" style={{ animationDelay: '0.5s' }}>🦇</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-pulse" style={{ animationDelay: '1s' }}>🕷️</div>
      </div>
      
      <Card className="max-w-2xl w-full bg-black/80 backdrop-blur-sm border-4 border-orange-500 p-8 shadow-2xl shadow-orange-500/50 relative z-10">
        <div className="text-center space-y-6">
          <div className="flex justify-center gap-4 mb-4">
            <div className="text-6xl animate-bounce">🎃</div>
            <div className="text-6xl animate-bounce" style={{ animationDelay: '0.1s' }}>⛏️</div>
            <div className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>👻</div>
          </div>

          <div>
            <h1 className="text-5xl font-game text-orange-500 mb-3 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
              🎃 Хэллоуин в Minecraft! 🎃
            </h1>
            <p className="text-xl font-body text-orange-200">
              Какое жуткое существо ты в этот мрачный праздник?
            </p>
          </div>

          <div className="bg-orange-950/50 rounded-xl p-6 text-left border border-orange-700">
            <h3 className="text-xl font-game text-orange-400 mb-3">Тебя ждет:</h3>
            <ul className="space-y-2 font-body text-orange-100">
              <li className="flex items-center gap-2">
                <span className="text-2xl">🦇</span>
                {questionsCount} жутких вопросов
              </li>
              <li className="flex items-center gap-2">
                <span className="text-2xl">👻</span>
                Мрачные персонажи
              </li>
              <li className="flex items-center gap-2">
                <span className="text-2xl">🕸️</span>
                Подробное описание твоего характера
              </li>
              <li className="flex items-center gap-2">
                <span className="text-2xl">🎃</span>
                Возможность поделиться результатом
              </li>
            </ul>
          </div>

          <Button
            onClick={onStart}
            className="w-full h-16 text-2xl font-game bg-gradient-to-r from-orange-600 to-red-600 hover:scale-105 transition-transform shadow-lg shadow-orange-600/50 hover:shadow-orange-600/70"
          >
            <Icon name="Play" size={32} className="mr-2" />
            Начать тест
          </Button>
        </div>
      </Card>
    </div>
  );
}