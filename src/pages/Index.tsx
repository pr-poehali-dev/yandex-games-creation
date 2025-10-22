import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface BodyPart {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  angularVelocity: number;
  width: number;
  height: number;
  color: string;
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

type Tool = 'punch' | 'hammer' | 'bat' | 'kick' | 'explosion';

export default function Index() {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [selectedTool, setSelectedTool] = useState<Tool>('punch');
  const [bodyParts, setBodyParts] = useState<BodyPart[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);
  const comboTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initialParts: BodyPart[] = [
      { id: 'head', x: 50, y: 20, vx: 0, vy: 0, angle: 0, angularVelocity: 0, width: 60, height: 60, color: '#FF6B35' },
      { id: 'body', x: 50, y: 45, vx: 0, vy: 0, angle: 0, angularVelocity: 0, width: 50, height: 70, color: '#F7931E' },
      { id: 'leftArm', x: 30, y: 50, vx: 0, vy: 0, angle: 0, angularVelocity: 0, width: 35, height: 15, color: '#4ECDC4' },
      { id: 'rightArm', x: 70, y: 50, vx: 0, vy: 0, angle: 0, angularVelocity: 0, width: 35, height: 15, color: '#4ECDC4' },
      { id: 'leftLeg', x: 40, y: 75, vx: 0, vy: 0, angle: 0, angularVelocity: 0, width: 20, height: 50, color: '#FFE66D' },
      { id: 'rightLeg', x: 60, y: 75, vx: 0, vy: 0, angle: 0, angularVelocity: 0, width: 20, height: 50, color: '#FFE66D' },
    ];
    setBodyParts(initialParts);
  }, []);

  useEffect(() => {
    const physicsLoop = setInterval(() => {
      setBodyParts(prev => prev.map(part => {
        let newVY = part.vy + 0.5;
        let newVX = part.vx * 0.98;
        let newY = part.y + newVY;
        let newX = part.x + newVX;
        const newAngle = part.angle + part.angularVelocity;
        let newAngularVelocity = part.angularVelocity * 0.95;

        if (newY > 85) {
          newY = 85;
          newVY = newVY * -0.4;
          newAngularVelocity = (Math.random() - 0.5) * 10;
        }

        if (newX < 5) {
          newX = 5;
          newVX = newVX * -0.5;
        }
        if (newX > 95) {
          newX = 95;
          newVX = newVX * -0.5;
        }

        return {
          ...part,
          x: newX,
          y: newY,
          vx: newVX,
          vy: newVY,
          angle: newAngle,
          angularVelocity: newAngularVelocity
        };
      }));

      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.3,
            life: p.life - 1
          }))
          .filter(p => p.life > 0)
      );
    }, 1000 / 60);

    return () => clearInterval(physicsLoop);
  }, []);

  const createParticles = (x: number, y: number, count: number, color: string) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10 - 5,
        life: 30 + Math.random() * 20,
        color
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  const applyForce = (partId: string, fx: number, fy: number, torque: number) => {
    setBodyParts(prev => prev.map(part => {
      if (part.id === partId) {
        const points = getToolPoints();
        const hitScore = Math.floor(Math.sqrt(fx * fx + fy * fy) * 2);
        setScore(s => s + hitScore);
        setCombo(c => c + 1);
        
        if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
        comboTimerRef.current = setTimeout(() => setCombo(0), 1000);

        createParticles(part.x, part.y, 15, part.color);

        return {
          ...part,
          vx: part.vx + fx,
          vy: part.vy + fy,
          angularVelocity: part.angularVelocity + torque
        };
      }
      return part;
    }));
  };

  const getToolPoints = () => {
    switch (selectedTool) {
      case 'punch': return 10;
      case 'hammer': return 25;
      case 'bat': return 35;
      case 'kick': return 20;
      case 'explosion': return 50;
      default: return 10;
    }
  };

  const handlePartClick = (partId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    let force = 1;
    let torque = (Math.random() - 0.5) * 20;
    
    switch (selectedTool) {
      case 'punch':
        force = 8;
        break;
      case 'hammer':
        force = 15;
        torque *= 2;
        break;
      case 'bat':
        force = 20;
        torque *= 3;
        break;
      case 'kick':
        force = 12;
        break;
      case 'explosion':
        force = 25;
        setBodyParts(prev => prev.map(part => ({
          ...part,
          vx: part.vx + (Math.random() - 0.5) * 30,
          vy: part.vy - Math.random() * 20,
          angularVelocity: part.angularVelocity + (Math.random() - 0.5) * 40
        })));
        createParticles(50, 50, 40, '#FF6B35');
        setScore(s => s + 100);
        return;
    }

    const angle = Math.random() * Math.PI * 2;
    const fx = Math.cos(angle) * force;
    const fy = Math.sin(angle) * force - 5;
    
    applyForce(partId, fx, fy, torque);
  };

  const handleMouseDown = (partId: string, e: React.MouseEvent) => {
    if (selectedTool === 'punch' || selectedTool === 'kick') {
      setIsDragging(partId);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setBodyParts(prev => prev.map(part => {
        if (part.id === isDragging) {
          return { ...part, x, y, vx: 0, vy: 0 };
        }
        return part;
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const resetRagdoll = () => {
    const initialParts: BodyPart[] = [
      { id: 'head', x: 50, y: 20, vx: 0, vy: 0, angle: 0, angularVelocity: 0, width: 60, height: 60, color: '#FF6B35' },
      { id: 'body', x: 50, y: 45, vx: 0, vy: 0, angle: 0, angularVelocity: 0, width: 50, height: 70, color: '#F7931E' },
      { id: 'leftArm', x: 30, y: 50, vx: 0, vy: 0, angle: 0, angularVelocity: 0, width: 35, height: 15, color: '#4ECDC4' },
      { id: 'rightArm', x: 70, y: 50, vx: 0, vy: 0, angle: 0, angularVelocity: 0, width: 35, height: 15, color: '#4ECDC4' },
      { id: 'leftLeg', x: 40, y: 75, vx: 0, vy: 0, angle: 0, angularVelocity: 0, width: 20, height: 50, color: '#FFE66D' },
      { id: 'rightLeg', x: 60, y: 75, vx: 0, vy: 0, angle: 0, angularVelocity: 0, width: 20, height: 50, color: '#FFE66D' },
    ];
    setBodyParts(initialParts);
    setParticles([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-6xl font-game text-white drop-shadow-2xl mb-2">
            СЛОМАЙ СПРУНКА
          </h1>
          <p className="text-2xl font-body text-white/90 font-bold">Ragdoll Physics Game</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
          <Card className="lg:col-span-3 bg-white/95 backdrop-blur-sm border-4 border-game-dark overflow-hidden">
            <div 
              ref={canvasRef}
              className="relative bg-gradient-to-b from-sky-300 to-green-200 aspect-[4/3] cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div className="absolute inset-0">
                {bodyParts.map(part => (
                  <div
                    key={part.id}
                    className="absolute transition-none cursor-pointer hover:brightness-110"
                    style={{
                      left: `${part.x}%`,
                      top: `${part.y}%`,
                      width: `${part.width}px`,
                      height: `${part.height}px`,
                      transform: `translate(-50%, -50%) rotate(${part.angle}deg)`,
                      backgroundColor: part.color,
                      borderRadius: part.id === 'head' ? '50%' : '8px',
                      border: '3px solid #1A1A2E',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                    }}
                    onMouseDown={(e) => handleMouseDown(part.id, e)}
                    onClick={(e) => handlePartClick(part.id, e)}
                  >
                    {part.id === 'head' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 bg-white rounded-full border-2 border-black"></div>
                          <div className="w-3 h-3 bg-white rounded-full border-2 border-black"></div>
                        </div>
                      </div>
                    )}
                  </div>
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
              </div>

              <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl border-2 border-game-dark">
                  <span className="text-3xl font-game text-game-dark">
                    💥 {score}
                  </span>
                </div>

                {combo > 1 && (
                  <div className="bg-game-orange text-white px-6 py-3 rounded-full shadow-xl border-2 border-white animate-bounce-in">
                    <span className="text-2xl font-game">
                      COMBO x{combo}!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-4 border-game-dark p-4">
            <h3 className="text-2xl font-game text-game-dark mb-4 text-center">
              Инструменты
            </h3>
            
            <div className="space-y-3">
              <Button
                onClick={() => setSelectedTool('punch')}
                className={`w-full h-16 text-lg font-body ${
                  selectedTool === 'punch'
                    ? 'bg-game-orange text-white'
                    : 'bg-gray-100 text-game-dark hover:bg-game-cyan hover:text-white'
                }`}
              >
                <span className="text-3xl mr-3">👊</span>
                Кулак
              </Button>

              <Button
                onClick={() => setSelectedTool('kick')}
                className={`w-full h-16 text-lg font-body ${
                  selectedTool === 'kick'
                    ? 'bg-game-orange text-white'
                    : 'bg-gray-100 text-game-dark hover:bg-game-cyan hover:text-white'
                }`}
              >
                <span className="text-3xl mr-3">🦵</span>
                Пинок
              </Button>

              <Button
                onClick={() => setSelectedTool('hammer')}
                className={`w-full h-16 text-lg font-body ${
                  selectedTool === 'hammer'
                    ? 'bg-game-orange text-white'
                    : 'bg-gray-100 text-game-dark hover:bg-game-cyan hover:text-white'
                }`}
              >
                <span className="text-3xl mr-3">🔨</span>
                Молоток
              </Button>

              <Button
                onClick={() => setSelectedTool('bat')}
                className={`w-full h-16 text-lg font-body ${
                  selectedTool === 'bat'
                    ? 'bg-game-orange text-white'
                    : 'bg-gray-100 text-game-dark hover:bg-game-cyan hover:text-white'
                }`}
              >
                <span className="text-3xl mr-3">🏏</span>
                Бита
              </Button>

              <Button
                onClick={() => setSelectedTool('explosion')}
                className={`w-full h-16 text-lg font-body ${
                  selectedTool === 'explosion'
                    ? 'bg-game-orange text-white'
                    : 'bg-gray-100 text-game-dark hover:bg-game-cyan hover:text-white'
                }`}
              >
                <span className="text-3xl mr-3">💣</span>
                Взрыв
              </Button>

              <div className="pt-4 border-t-2 border-gray-200">
                <Button
                  onClick={resetRagdoll}
                  className="w-full h-14 bg-gradient-to-r from-game-yellow to-game-orange hover:from-game-orange hover:to-game-yellow text-white font-game text-lg"
                >
                  <Icon name="RotateCcw" size={24} className="mr-2" />
                  Сбросить
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/95 backdrop-blur-sm border-4 border-game-dark p-6 text-center">
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-xl font-game text-game-dark">Лучший счет</div>
            <div className="text-3xl font-game text-game-orange">{score}</div>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-4 border-game-dark p-6 text-center">
            <div className="text-4xl mb-2">🔥</div>
            <div className="text-xl font-game text-game-dark">Макс. комбо</div>
            <div className="text-3xl font-game text-game-cyan">{combo}</div>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-4 border-game-dark p-6 text-center">
            <div className="text-4xl mb-2">⚡</div>
            <div className="text-xl font-game text-game-dark">Подсказка</div>
            <div className="text-sm font-body text-game-dark">Жми или тащи!</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
