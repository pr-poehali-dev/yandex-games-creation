import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Character } from './types';
import { StatsPanel } from './StatsPanel';
import { MusicButton } from './MusicButton';

interface ResultScreenProps {
  result: Character;
  showStats: boolean;
  isMusicPlaying: boolean;
  totalTests: number;
  steveCount: number;
  alexCount: number;
  creeperCount: number;
  villagerCount: number;
  onRestart: () => void;
  onToggleStats: () => void;
  onToggleMusic: () => void;
}

export function ResultScreen({ 
  result, 
  showStats, 
  isMusicPlaying,
  totalTests, 
  steveCount, 
  alexCount, 
  creeperCount, 
  villagerCount,
  onRestart,
  onToggleStats,
  onToggleMusic
}: ResultScreenProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${result.color} flex items-center justify-center p-4`}>
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          onClick={onToggleStats}
          variant="outline"
          size="icon"
          className="bg-white/90 hover:bg-white"
        >
          <Icon name="BarChart3" size={24} />
        </Button>
        <MusicButton isMusicPlaying={isMusicPlaying} onToggle={onToggleMusic} />
      </div>

      {showStats && (
        <StatsPanel
          totalTests={totalTests}
          steveCount={steveCount}
          alexCount={alexCount}
          creeperCount={creeperCount}
          villagerCount={villagerCount}
        />
      )}

      <Card className="max-w-2xl w-full bg-white/95 backdrop-blur-sm border-4 border-game-dark p-8">
        <div className="text-center space-y-6">
          <img 
            src={result.image} 
            alt={result.name}
            className="w-64 h-64 mx-auto object-cover rounded-xl shadow-2xl"
          />
          
          <div>
            <h1 className="text-5xl font-game text-game-dark mb-2">Ты - {result.name}!</h1>
            <p className="text-xl font-body text-game-dark/80">{result.description}</p>
          </div>

          <div className="bg-game-dark/5 rounded-xl p-6">
            <h3 className="text-2xl font-game text-game-dark mb-4">Твои черты:</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {result.traits.map((trait, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-game-dark px-4 py-2 rounded-full font-body text-game-dark"
                >
                  ✨ {trait}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onRestart}
              className="w-full h-16 text-2xl font-game bg-gradient-to-r from-game-orange to-game-yellow hover:scale-105 transition-transform"
            >
              <Icon name="RotateCcw" size={28} className="mr-2" />
              Пройти еще раз
            </Button>

            <Button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Какой ты персонаж Minecraft?',
                    text: `Я прошел тест и получил: ${result.name}! ${result.emoji}`,
                    url: window.location.href
                  });
                }
              }}
              variant="outline"
              className="w-full h-14 text-xl font-body border-2 border-game-dark hover:bg-white"
            >
              <Icon name="Share2" size={24} className="mr-2" />
              Поделиться результатом
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
