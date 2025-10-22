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
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-purple-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 text-5xl animate-bounce">🎃</div>
        <div className="absolute top-40 right-40 text-4xl animate-pulse">👻</div>
        <div className="absolute bottom-20 left-40 text-5xl animate-bounce" style={{ animationDelay: '0.5s' }}>🦇</div>
        <div className="absolute bottom-40 right-20 text-4xl animate-pulse" style={{ animationDelay: '1s' }}>🕷️</div>
      </div>

      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          onClick={onToggleStats}
          variant="outline"
          size="icon"
          className="bg-orange-950/90 hover:bg-orange-900 border-orange-600 text-orange-300 hover:text-orange-200"
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

      <Card className="max-w-2xl w-full bg-black/80 backdrop-blur-sm border-4 border-orange-500 p-8 shadow-2xl shadow-orange-500/50 relative z-10">
        <div className="text-center space-y-6">
          <img 
            src={result.image} 
            alt={result.name}
            className="w-64 h-64 mx-auto object-cover rounded-xl shadow-2xl border-4 border-orange-600 shadow-orange-600/50"
          />
          
          <div>
            <h1 className="text-5xl font-game text-orange-500 mb-2 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
              Ты - {result.name}! 🎃
            </h1>
            <p className="text-xl font-body text-orange-200">{result.description}</p>
          </div>

          <div className="bg-orange-950/50 rounded-xl p-6 border border-orange-700">
            <h3 className="text-2xl font-game text-orange-400 mb-4">Твои черты:</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {result.traits.map((trait, index) => (
                <div
                  key={index}
                  className="bg-orange-900/50 border-2 border-orange-600 px-4 py-2 rounded-full font-body text-orange-100"
                >
                  ✨ {trait}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onRestart}
              className="w-full h-16 text-2xl font-game bg-gradient-to-r from-orange-600 to-red-600 hover:scale-105 transition-transform shadow-lg shadow-orange-600/50"
            >
              <Icon name="RotateCcw" size={28} className="mr-2" />
              Пройти еще раз
            </Button>

            <Button
              onClick={() => {
                const shareData = {
                  title: '🎃 Хэллоуин в Minecraft!',
                  text: `Я прошел тест и получил: ${result.name}! ${result.emoji}`,
                  url: window.location.href
                };
                
                if (navigator.share) {
                  navigator.share(shareData).catch(() => {
                    const shareText = `${shareData.text}\n${shareData.url}`;
                    navigator.clipboard.writeText(shareText);
                    alert('📋 Ссылка скопирована в буфер обмена!');
                  });
                } else {
                  const shareText = `${shareData.text}\n${shareData.url}`;
                  navigator.clipboard.writeText(shareText);
                  alert('📋 Ссылка скопирована в буфер обмена!');
                }
              }}
              variant="outline"
              className="w-full h-14 text-xl font-body border-2 border-orange-500 bg-white/95 hover:bg-orange-600 text-gray-900 hover:text-white transition-all"
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