import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type GameState = 'menu' | 'playing' | 'paused' | 'gameover';
type MenuScreen = 'main' | 'levels' | 'records' | 'achievements' | 'shop' | 'settings';

interface FallingObject {
  id: number;
  x: number;
  y: number;
  emoji: string;
  speed: number;
  points: number;
}

const GAME_EMOJIS = ['🍎', '🍊', '🍋', '🍌', '🍇', '🍓', '🍒', '🥝', '🍑', '🍈'];

export default function Index() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [menuScreen, setMenuScreen] = useState<MenuScreen>('main');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const [fallingObjects, setFallingObjects] = useState<FallingObject[]>([]);
  const [basketX, setBasketX] = useState(50);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const objectIdRef = useRef(0);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnInterval = setInterval(() => {
      const newObject: FallingObject = {
        id: objectIdRef.current++,
        x: Math.random() * 90,
        y: -5,
        emoji: GAME_EMOJIS[Math.floor(Math.random() * GAME_EMOJIS.length)],
        speed: 1 + level * 0.2,
        points: 10
      };
      setFallingObjects(prev => [...prev, newObject]);
    }, 1500 - level * 100);

    return () => clearInterval(spawnInterval);
  }, [gameState, level]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      setFallingObjects(prev => {
        return prev
          .map(obj => ({ ...obj, y: obj.y + obj.speed }))
          .filter(obj => {
            if (obj.y > 85 && obj.y < 95 && Math.abs(obj.x - basketX) < 8) {
              setScore(s => s + obj.points);
              return false;
            }
            return obj.y < 100;
          });
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameState, basketX]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('gameover');
          if (score > highScore) setHighScore(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, score, highScore]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(5, Math.min(95, x)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(5, Math.min(95, x)));
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setLevel(1);
    setFallingObjects([]);
  };

  const backToMenu = () => {
    setGameState('menu');
    setMenuScreen('main');
  };

  const renderMenu = () => {
    if (menuScreen === 'main') {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-game-orange via-game-yellow to-game-cyan p-8">
          <div className="text-center mb-12 animate-bounce-in">
            <h1 className="text-7xl font-game text-white mb-4 drop-shadow-lg">ИСКОА</h1>
            <p className="text-2xl font-body font-bold text-game-dark">Быстрая динамичная игра</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            <Button 
              onClick={startGame}
              size="lg"
              className="h-20 text-2xl font-game bg-game-yellow hover:bg-game-orange text-white shadow-2xl transform hover:scale-105 transition-all"
            >
              Выграть
            </Button>
            
            <Button 
              onClick={() => setMenuScreen('levels')}
              size="lg"
              variant="outline"
              className="h-20 text-xl font-body bg-white hover:bg-game-cyan hover:text-white border-4 border-game-dark shadow-xl transform hover:scale-105 transition-all"
            >
              <Icon name="Layers" size={28} className="mr-2" />
              Провни
            </Button>
            
            <Button 
              onClick={() => setMenuScreen('records')}
              size="lg"
              variant="outline"
              className="h-20 text-xl font-body bg-white hover:bg-game-cyan hover:text-white border-4 border-game-dark shadow-xl transform hover:scale-105 transition-all"
            >
              <Icon name="Trophy" size={28} className="mr-2" />
              Рекорды
            </Button>
            
            <Button 
              onClick={() => setMenuScreen('achievements')}
              size="lg"
              variant="outline"
              className="h-20 text-xl font-body bg-white hover:bg-game-cyan hover:text-white border-4 border-game-dark shadow-xl transform hover:scale-105 transition-all"
            >
              <Icon name="Star" size={28} className="mr-2" />
              Достижения
            </Button>
            
            <Button 
              onClick={() => setMenuScreen('shop')}
              size="lg"
              variant="outline"
              className="h-20 text-xl font-body bg-white hover:bg-game-cyan hover:text-white border-4 border-game-dark shadow-xl transform hover:scale-105 transition-all"
            >
              <Icon name="ShoppingBag" size={28} className="mr-2" />
              Магазин
            </Button>
            
            <Button 
              onClick={() => setMenuScreen('settings')}
              size="lg"
              variant="outline"
              className="h-20 text-xl font-body bg-white hover:bg-game-cyan hover:text-white border-4 border-game-dark shadow-xl transform hover:scale-105 transition-all"
            >
              <Icon name="Settings" size={28} className="mr-2" />
              Настройки
            </Button>
          </div>

          {highScore > 0 && (
            <div className="mt-8 text-2xl font-game text-white bg-game-dark px-8 py-4 rounded-full shadow-xl">
              Рекорд: {highScore} 🏆
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-game-cyan via-game-yellow to-game-orange p-8">
        <Card className="w-full max-w-2xl bg-white shadow-2xl border-4 border-game-dark">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-4xl font-game text-game-dark">
                {menuScreen === 'levels' && 'Уровни'}
                {menuScreen === 'records' && 'Рекорды'}
                {menuScreen === 'achievements' && 'Достижения'}
                {menuScreen === 'shop' && 'Магазин'}
                {menuScreen === 'settings' && 'Настройки'}
              </h2>
              <Button onClick={() => setMenuScreen('main')} variant="outline" size="lg">
                <Icon name="ArrowLeft" size={24} />
              </Button>
            </div>
            
            <div className="space-y-4 font-body text-lg text-game-dark">
              {menuScreen === 'levels' && (
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(l => (
                    <Button
                      key={l}
                      className="h-24 text-2xl font-game bg-gradient-to-br from-game-orange to-game-yellow hover:scale-110 transition-transform"
                      onClick={startGame}
                    >
                      {l}
                    </Button>
                  ))}
                </div>
              )}
              
              {menuScreen === 'records' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-game-yellow/20 rounded-lg">
                    <span className="flex items-center gap-2">
                      <Icon name="Trophy" className="text-game-orange" />
                      <strong>Лучший счет:</strong>
                    </span>
                    <span className="text-2xl font-game">{highScore}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-game-cyan/20 rounded-lg">
                    <span className="flex items-center gap-2">
                      <Icon name="Target" className="text-game-cyan" />
                      <strong>Текущий уровень:</strong>
                    </span>
                    <span className="text-2xl font-game">{level}</span>
                  </div>
                </div>
              )}
              
              {menuScreen === 'achievements' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-game-yellow/20 rounded-lg">
                    <Icon name="Star" size={32} className="text-game-orange" />
                    <div>
                      <div className="font-bold">Первая игра</div>
                      <div className="text-sm text-muted-foreground">Сыграйте первую игру</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg opacity-50">
                    <Icon name="Zap" size={32} />
                    <div>
                      <div className="font-bold">Скорострел</div>
                      <div className="text-sm text-muted-foreground">Наберите 100 очков за раунд</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg opacity-50">
                    <Icon name="Award" size={32} />
                    <div>
                      <div className="font-bold">Мастер</div>
                      <div className="text-sm text-muted-foreground">Пройдите 5 уровень</div>
                    </div>
                  </div>
                </div>
              )}
              
              {menuScreen === 'shop' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-game-orange/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">🎨</div>
                      <div>
                        <div className="font-bold">Новая тема</div>
                        <div className="text-sm text-muted-foreground">Космический стиль</div>
                      </div>
                    </div>
                    <Button className="bg-game-yellow hover:bg-game-orange">100 💎</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-game-cyan/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">⚡</div>
                      <div>
                        <div className="font-bold">Ускорение</div>
                        <div className="text-sm text-muted-foreground">+20% к скорости</div>
                      </div>
                    </div>
                    <Button className="bg-game-yellow hover:bg-game-orange">50 💎</Button>
                  </div>
                </div>
              )}
              
              {menuScreen === 'settings' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-bold">Звук</span>
                    <Button variant="outline">Вкл</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-bold">Музыка</span>
                    <Button variant="outline">Вкл</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-bold">Вибрация</span>
                    <Button variant="outline">Выкл</Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderGame = () => (
    <div className="relative w-full h-screen bg-gradient-to-b from-game-cyan to-game-yellow overflow-hidden">
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl border-2 border-game-dark">
          <span className="text-2xl font-game text-game-dark">Счет: {score}</span>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl border-2 border-game-dark">
          <span className="text-2xl font-game text-game-dark flex items-center gap-2">
            <Icon name="Clock" size={24} />
            {timeLeft}с
          </span>
        </div>
        
        <Button 
          onClick={backToMenu}
          size="lg"
          className="bg-game-orange hover:bg-game-dark text-white shadow-xl"
        >
          <Icon name="Home" size={24} />
        </Button>
      </div>

      <div 
        ref={gameAreaRef}
        className="relative w-full h-full cursor-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {fallingObjects.map(obj => (
          <div
            key={obj.id}
            className="absolute text-5xl animate-fall pointer-events-none"
            style={{
              left: `${obj.x}%`,
              top: `${obj.y}%`,
              transform: 'translateX(-50%)',
              animationDuration: `${10 / obj.speed}s`
            }}
          >
            {obj.emoji}
          </div>
        ))}

        <div
          className="absolute bottom-4 text-6xl transition-all duration-100 pointer-events-none"
          style={{
            left: `${basketX}%`,
            transform: 'translateX(-50%)'
          }}
        >
          🧺
        </div>
      </div>
    </div>
  );

  const renderGameOver = () => (
    <Dialog open={gameState === 'gameover'} onOpenChange={(open) => !open && backToMenu()}>
      <DialogContent className="max-w-md bg-gradient-to-br from-game-yellow to-game-orange border-4 border-game-dark">
        <DialogHeader>
          <DialogTitle className="text-5xl font-game text-center text-white mb-4">
            Игра окончена!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="text-4xl font-game text-game-dark mb-2">Ваш счет</div>
            <div className="text-6xl font-game text-game-orange">{score}</div>
          </div>
          
          {score === highScore && score > 0 && (
            <div className="bg-game-yellow text-white font-game text-2xl p-4 rounded-xl animate-bounce-in">
              🎉 Новый рекорд! 🎉
            </div>
          )}
          
          <div className="flex gap-3">
            <Button 
              onClick={startGame}
              size="lg"
              className="flex-1 h-16 text-xl font-game bg-game-yellow hover:bg-game-orange text-white"
            >
              <Icon name="RotateCcw" size={24} className="mr-2" />
              Заново
            </Button>
            
            <Button 
              onClick={backToMenu}
              size="lg"
              variant="outline"
              className="flex-1 h-16 text-xl font-body bg-white hover:bg-game-cyan hover:text-white border-4 border-game-dark"
            >
              <Icon name="Home" size={24} className="mr-2" />
              Меню
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {gameState === 'menu' && renderMenu()}
      {gameState === 'playing' && renderGame()}
      {gameState === 'gameover' && renderGameOver()}
    </>
  );
}
