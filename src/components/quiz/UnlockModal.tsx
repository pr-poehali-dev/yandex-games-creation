import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface UnlockModalProps {
  characterName: string;
  onWatchAd: () => void;
  onClose: () => void;
}

export function UnlockModal({ characterName, onWatchAd, onClose }: UnlockModalProps) {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <Card className="max-w-md w-full bg-gradient-to-br from-orange-900 via-red-900 to-black border-4 border-orange-500 p-8 shadow-2xl shadow-orange-500/60 animate-fade-in">
        <div className="text-center space-y-6">
          <div className="flex justify-center items-center gap-3 text-5xl animate-pulse">
            <span>🎃</span>
            <span className="text-6xl">🎁</span>
            <span>👻</span>
          </div>
          
          <div className="bg-black/40 rounded-lg p-4 border-2 border-orange-400">
            <h2 className="text-3xl font-game text-orange-400 mb-3 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
              🔥 Секретная награда! 🔥
            </h2>
            <p className="text-lg text-orange-200 mb-3">
              Разблокируй <span className="font-bold text-red-400 animate-pulse">СЛЕНДЕРМЕНА</span> - самого жуткого персонажа!
            </p>
            <p className="text-sm text-orange-300">
              👁️ Посмотри рекламу и получи доступ навсегда!
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onWatchAd}
              className="w-full h-16 text-lg font-game bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 hover:scale-105 transition-transform shadow-lg shadow-orange-600/60 animate-pulse flex items-center justify-center"
            >
              <Icon name="Gift" size={24} className="mr-2 flex-shrink-0" />
              <span className="break-words">Посмотреть рекламу</span>
            </Button>

            <Button
              onClick={onClose}
              variant="outline"
              className="w-full h-auto py-3 border-2 border-orange-500 bg-white/95 hover:bg-orange-600 text-gray-900 hover:text-white transition-all"
            >
              <span className="break-words text-center">Показать результат: <span className="font-bold">{characterName}</span></span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}