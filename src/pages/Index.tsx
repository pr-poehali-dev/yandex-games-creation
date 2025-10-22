import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  points: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

type GameState = 'menu' | 'playing' | 'paused' | 'gameover';

export default function Index() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [level, setLevel] = useState(1);
  const [balls, setBalls] = useState<Ball[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [playerY, setPlayerY] = useState(50);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const ballIdRef = useRef(0);
  const particleIdRef = useRef(0);
  const [yandexSDK, setYandexSDK] = useState<any>(null);

  useEffect(() => {
    const initYandexSDK = async () => {
      if (typeof window !== 'undefined' && (window as any).YaGames) {
        try {
          const sdk = await (window as any).YaGames.init();
          setYandexSDK(sdk);
          
          const player = await sdk.getPlayer();
          const savedScore = await player.getData(['bestScore']);
          if (savedScore.bestScore) {
            setBestScore(savedScore.bestScore);
          }
        } catch (error) {
          console.log('Yandex SDK not available, running in standalone mode');
        }
      }
    };

    initYandexSDK();
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnInterval = setInterval(() => {
      const colors = ['#FF6B35', '#F7931E', '#4ECDC4', '#FFE66D', '#A8E6CF'];
      const newBall: Ball = {
        id: ballIdRef.current++,
        x: 95,
        y: Math.random() * 90 + 5,
        vx: -(2 + level * 0.3),
        vy: (Math.random() - 0.5) * 2,
        radius: 20 + Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        points: 10
      };
      setBalls(prev => [...prev, newBall]);
    }, 1200 - level * 80);

    return () => clearInterval(spawnInterval);
  }, [gameState, level]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      setBalls(prev => {
        return prev
          .map(ball => ({
            ...ball,
            x: ball.x + ball.vx,
            y: ball.y + ball.vy
          }))
          .filter(ball => {
            if (ball.x < 15 && Math.abs(ball.y - playerY) < 15) {
              createParticles(ball.x, ball.y, 20, ball.color);
              setScore(s => {
                const newScore = s + ball.points;
                if (newScore > bestScore) {
                  setBestScore(newScore);
                  saveScoreToYandex(newScore);
                }
                return newScore;
              });
              return false;
            }
            return ball.x > -5;
          });
      });

      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.2,
            life: p.life - 1
          }))
          .filter(p => p.life > 0)
      );
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameState, playerY, bestScore]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    if (score > 0 && score % 100 === 0) {
      setLevel(l => l + 1);
      showAd();
    }
  }, [score]);

  const saveScoreToYandex = async (newScore: number) => {
    if (yandexSDK) {
      try {
        const player = await yandexSDK.getPlayer();
        await player.setData({ bestScore: newScore });
        
        if (yandexSDK.getLeaderboards) {
          const leaderboard = await yandexSDK.getLeaderboards();
          await leaderboard.setLeaderboardScore('best_score', newScore);
        }
      } catch (error) {
        console.log('Failed to save score to Yandex');
      }
    }
  };

  const showAd = () => {
    if (yandexSDK && yandexSDK.adv) {
      yandexSDK.adv.showFullscreenAdv({
        callbacks: {
          onClose: () => setGameState('playing'),
          onError: () => setGameState('playing')
        }
      });
      setGameState('paused');
    }
  };

  const createParticles = (x: number, y: number, count: number, color: string) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 30 + Math.random() * 20,
        color
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPlayerY(Math.max(5, Math.min(95, y)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (gameState !== 'playing' || !gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    setPlayerY(Math.max(5, Math.min(95, y)));
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setLevel(1);
    setBalls([]);
    setParticles([]);
    setPlayerY(50);
  };

  const endGame = () => {
    setGameState('gameover');
    showAd();
  };

  const pauseGame = () => {
    setGameState('paused');
  };

  const resumeGame = () => {
    setGameState('playing');
  };

  const showLeaderboard = async () => {
    if (yandexSDK && yandexSDK.getLeaderboards) {
      try {
        const leaderboard = await yandexSDK.getLeaderboards();
        await leaderboard.getLeaderboardEntries('best_score', { quantityTop: 10 });
      } catch (error) {
        console.log('Leaderboard not available');
      }
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-game-cyan via-game-yellow to-game-orange flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white/95 backdrop-blur-sm border-4 border-game-dark p-8">
          <div className="text-center space-y-6">
            <div>
              <h1 className="text-6xl font-game text-game-dark mb-2">ЛОВЕЦ</h1>
              <p className="text-xl font-body text-game-dark/80">Лови шары и набирай очки!</p>
            </div>

            {bestScore > 0 && (
              <div className="bg-gradient-to-r from-game-orange to-game-yellow text-white px-6 py-4 rounded-xl">
                <div className="text-sm font-body">Лучший результат</div>
                <div className="text-4xl font-game">{bestScore}</div>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={startGame}
                className="w-full h-16 text-2xl font-game bg-gradient-to-r from-game-orange to-game-yellow hover:scale-105 transition-transform"
              >
                <Icon name="Play" size={32} className="mr-2" />
                Играть
              </Button>

              <Button
                onClick={showLeaderboard}
                variant="outline"
                className="w-full h-14 text-xl font-body border-2 border-game-dark hover:bg-game-cyan hover:text-white"
              >
                <Icon name="Trophy" size={24} className="mr-2" />
                Рекорды
              </Button>
            </div>

            <div className="bg-game-dark/10 rounded-lg p-4 text-left">
              <h3 className="font-game text-game-dark mb-2">Как играть:</h3>
              <ul className="space-y-1 font-body text-sm text-game-dark/80">
                <li>• Управляй платформой мышкой или пальцем</li>
                <li>• Лови летящие шары</li>
                <li>• Каждый пойманный шар = 10 очков</li>
                <li>• С каждым уровнем игра ускоряется</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (gameState === 'gameover') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white/95 backdrop-blur-sm border-4 border-game-dark p-8">
          <div className="text-center space-y-6">
            <h2 className="text-5xl font-game text-game-dark">ИГРА ОКОНЧЕНА</h2>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-game-orange to-game-yellow text-white px-6 py-4 rounded-xl">
                <div className="text-sm font-body">Твой результат</div>
                <div className="text-5xl font-game">{score}</div>
              </div>

              {score === bestScore && score > 0 && (
                <div className="bg-game-cyan text-white px-6 py-3 rounded-xl animate-bounce-in">
                  <div className="text-xl font-game">🏆 НОВЫЙ РЕКОРД! 🏆</div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white border-2 border-game-dark rounded-lg p-3">
                  <div className="text-sm font-body text-game-dark/70">Уровень</div>
                  <div className="text-2xl font-game text-game-dark">{level}</div>
                </div>
                <div className="bg-white border-2 border-game-dark rounded-lg p-3">
                  <div className="text-sm font-body text-game-dark/70">Рекорд</div>
                  <div className="text-2xl font-game text-game-dark">{bestScore}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={startGame}
                className="w-full h-16 text-2xl font-game bg-gradient-to-r from-game-orange to-game-yellow hover:scale-105 transition-transform"
              >
                <Icon name="RotateCcw" size={28} className="mr-2" />
                Играть еще
              </Button>

              <Button
                onClick={() => setGameState('menu')}
                variant="outline"
                className="w-full h-14 text-xl font-body border-2 border-game-dark"
              >
                <Icon name="Home" size={24} className="mr-2" />
                В меню
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-game-dark">
              <span className="text-2xl font-game text-game-dark">🎯 {score}</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-game-dark">
              <span className="text-2xl font-game text-game-dark">⏱️ {timeLeft}s</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-game-dark">
              <span className="text-2xl font-game text-game-dark">📊 LVL {level}</span>
            </div>
          </div>

          <Button
            onClick={pauseGame}
            variant="outline"
            size="lg"
            className="bg-white/90 backdrop-blur-sm border-2 border-game-dark"
          >
            <Icon name="Pause" size={24} />
          </Button>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-4 border-game-dark overflow-hidden">
          <div
            ref={gameAreaRef}
            className="relative bg-gradient-to-b from-sky-200 to-blue-100 aspect-[4/3] cursor-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {balls.map(ball => (
              <div
                key={ball.id}
                className="absolute rounded-full shadow-lg transition-none pointer-events-none"
                style={{
                  left: `${ball.x}%`,
                  top: `${ball.y}%`,
                  width: `${ball.radius * 2}px`,
                  height: `${ball.radius * 2}px`,
                  backgroundColor: ball.color,
                  transform: 'translate(-50%, -50%)',
                  border: '3px solid rgba(255,255,255,0.5)'
                }}
              />
            ))}

            {particles.map(p => (
              <div
                key={p.id}
                className="absolute w-2 h-2 rounded-full pointer-events-none"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  backgroundColor: p.color,
                  opacity: p.life / 50
                }}
              />
            ))}

            <div
              className="absolute left-0 w-12 h-24 bg-gradient-to-r from-game-orange to-game-yellow rounded-r-full shadow-xl border-4 border-white transition-none"
              style={{
                top: `${playerY}%`,
                transform: 'translateY(-50%)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                🎯
              </div>
            </div>
          </div>
        </Card>

        {gameState === 'paused' && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="max-w-sm w-full bg-white/95 border-4 border-game-dark p-8">
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-game text-game-dark">ПАУЗА</h2>
                
                <div className="space-y-3">
                  <Button
                    onClick={resumeGame}
                    className="w-full h-16 text-2xl font-game bg-gradient-to-r from-game-orange to-game-yellow"
                  >
                    <Icon name="Play" size={28} className="mr-2" />
                    Продолжить
                  </Button>

                  <Button
                    onClick={() => setGameState('menu')}
                    variant="outline"
                    className="w-full h-14 text-xl font-body border-2 border-game-dark"
                  >
                    <Icon name="Home" size={24} className="mr-2" />
                    В меню
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
