import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface UnlockModalProps {
  characterName: string;
  onWatchAd: () => void;
  onClose: () => void;
}

export function UnlockModal({ characterName, onWatchAd, onClose }: UnlockModalProps) {
  const isUnlocked = localStorage.getItem('unlocked_slenderman') === 'true';

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
      <Card className="max-w-md w-full bg-gradient-to-br from-orange-900 to-black border-4 border-orange-500 p-8 shadow-2xl shadow-orange-500/50">
        <div className="text-center space-y-6">
          <div className="text-6xl animate-bounce">👻</div>
          
          <div>
            <h2 className="text-3xl font-game text-orange-500 mb-3 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
              {isUnlocked ? 'Ваш результат готов!' : 'Секретный персонаж!'}
            </h2>
            {!isUnlocked && (
              <>
                <p className="text-lg text-orange-200 mb-3">
                  🎃 Хотите разблокировать секретного персонажа <span className="font-bold text-orange-400">Слендермена</span>?
                </p>
                <p className="text-sm text-orange-300">
                  Посмотрите короткую рекламу и откройте жуткого героя!
                </p>
              </>
            )}
            {isUnlocked && (
              <p className="text-lg text-orange-200">
                Вы прошли тест! Узнайте свой результат: <span className="font-bold text-orange-400">{characterName}</span>
              </p>
            )}
          </div>

          <div className="space-y-3">
            {!isUnlocked && (
              <Button
                onClick={onWatchAd}
                className="w-full h-14 text-xl font-game bg-gradient-to-r from-orange-600 to-red-600 hover:scale-105 transition-transform shadow-lg shadow-orange-600/50"
              >
                <Icon name="Play" size={24} className="mr-2" />
                Посмотреть рекламу
              </Button>
            )}

            <Button
              onClick={onClose}
              className={!isUnlocked ? "w-full border-2 border-orange-600 hover:bg-orange-950/30 text-orange-300" : "w-full h-14 text-xl font-game bg-gradient-to-r from-orange-600 to-red-600 hover:scale-105 transition-transform shadow-lg shadow-orange-600/50"}
              variant={!isUnlocked ? "outline" : "default"}
            >
              {isUnlocked ? 'Посмотреть результат' : 'Может позже'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}