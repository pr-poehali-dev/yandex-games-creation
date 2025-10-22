import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    character: string;
  }[];
}

interface Character {
  id: string;
  name: string;
  emoji: string;
  description: string;
  traits: string[];
  color: string;
  image: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: 'Как ты проводишь свободное время?',
    options: [
      { text: 'Строю и создаю что-то новое', character: 'steve' },
      { text: 'Исследую новые места', character: 'alex' },
      { text: 'Охраняю свою территорию', character: 'creeper' },
      { text: 'Помогаю друзьям', character: 'villager' }
    ]
  },
  {
    id: 2,
    text: 'Что для тебя важнее всего?',
    options: [
      { text: 'Достижения и результаты', character: 'steve' },
      { text: 'Приключения и открытия', character: 'alex' },
      { text: 'Защита и безопасность', character: 'creeper' },
      { text: 'Общение и помощь другим', character: 'villager' }
    ]
  },
  {
    id: 3,
    text: 'Как ты решаешь проблемы?',
    options: [
      { text: 'Планирую и действую методично', character: 'steve' },
      { text: 'Ищу нестандартные решения', character: 'alex' },
      { text: 'Использую радикальные методы', character: 'creeper' },
      { text: 'Советуюсь с другими', character: 'villager' }
    ]
  },
  {
    id: 4,
    text: 'Твой идеальный день?',
    options: [
      { text: 'Работать над большим проектом', character: 'steve' },
      { text: 'Открыть новое место', character: 'alex' },
      { text: 'Быть начеку и готовым к действию', character: 'creeper' },
      { text: 'Провести время с друзьями', character: 'villager' }
    ]
  },
  {
    id: 5,
    text: 'Как тебя видят другие?',
    options: [
      { text: 'Надежный и трудолюбивый', character: 'steve' },
      { text: 'Смелый и любопытный', character: 'alex' },
      { text: 'Непредсказуемый и опасный', character: 'creeper' },
      { text: 'Дружелюбный и полезный', character: 'villager' }
    ]
  },
  {
    id: 6,
    text: 'Твоя любимая активность в игре?',
    options: [
      { text: 'Добывать ресурсы', character: 'steve' },
      { text: 'Исследовать биомы', character: 'alex' },
      { text: 'Подкрадываться незаметно', character: 'creeper' },
      { text: 'Торговать и обмениваться', character: 'villager' }
    ]
  },
  {
    id: 7,
    text: 'Какое оружие ты выберешь?',
    options: [
      { text: 'Алмазный меч', character: 'steve' },
      { text: 'Лук и стрелы', character: 'alex' },
      { text: 'Сам себе оружие', character: 'creeper' },
      { text: 'Мне не нужно оружие', character: 'villager' }
    ]
  },
  {
    id: 8,
    text: 'Твой любимый биом?',
    options: [
      { text: 'Горы - много ресурсов', character: 'steve' },
      { text: 'Джунгли - полны приключений', character: 'alex' },
      { text: 'Темный лес - загадочный', character: 'creeper' },
      { text: 'Равнины - спокойные', character: 'villager' }
    ]
  },
  {
    id: 9,
    text: 'Как ты относишься к риску?',
    options: [
      { text: 'Риск оправдан ради цели', character: 'steve' },
      { text: 'Обожаю риск и адреналин', character: 'alex' },
      { text: 'Я сам и есть риск', character: 'creeper' },
      { text: 'Предпочитаю избегать рисков', character: 'villager' }
    ]
  },
  {
    id: 10,
    text: 'Что ты делаешь ночью в Minecraft?',
    options: [
      { text: 'Копаю шахты', character: 'steve' },
      { text: 'Охочусь на мобов', character: 'alex' },
      { text: 'Брожу в темноте', character: 'creeper' },
      { text: 'Сижу дома в безопасности', character: 'villager' }
    ]
  },
  {
    id: 11,
    text: 'Твоя любимая постройка?',
    options: [
      { text: 'Замок или крепость', character: 'steve' },
      { text: 'Дом на дереве', character: 'alex' },
      { text: 'Подземный бункер', character: 'creeper' },
      { text: 'Уютный коттедж', character: 'villager' }
    ]
  },
  {
    id: 12,
    text: 'Как ты работаешь в команде?',
    options: [
      { text: 'Беру на себя роль лидера', character: 'steve' },
      { text: 'Разведываю и исследую', character: 'alex' },
      { text: 'Действую независимо', character: 'creeper' },
      { text: 'Поддерживаю всех', character: 'villager' }
    ]
  },
  {
    id: 13,
    text: 'Что ты сделаешь, найдя алмазы?',
    options: [
      { text: 'Сделаю полный сет брони', character: 'steve' },
      { text: 'Зачарую инструменты', character: 'alex' },
      { text: 'Спрячу их', character: 'creeper' },
      { text: 'Обменяю на что-то полезное', character: 'villager' }
    ]
  },
  {
    id: 14,
    text: 'Твое отношение к крипперам?',
    options: [
      { text: 'Уничтожаю на месте', character: 'steve' },
      { text: 'Обхожу стороной', character: 'alex' },
      { text: 'Мои братья', character: 'creeper' },
      { text: 'Боюсь их', character: 'villager' }
    ]
  },
  {
    id: 15,
    text: 'Как ты украшаешь свой дом?',
    options: [
      { text: 'Функционально - сундуки и верстак', character: 'steve' },
      { text: 'Экзотично - трофеи из путешествий', character: 'alex' },
      { text: 'Минималистично', character: 'creeper' },
      { text: 'Уютно - картины и цветы', character: 'villager' }
    ]
  },
  {
    id: 16,
    text: 'Твоя стратегия в PvP?',
    options: [
      { text: 'Прямая атака в лоб', character: 'steve' },
      { text: 'Тактика и маневры', character: 'alex' },
      { text: 'Внезапность и взрыв', character: 'creeper' },
      { text: 'Я не играю в PvP', character: 'villager' }
    ]
  },
  {
    id: 17,
    text: 'Что ты выращиваешь на ферме?',
    options: [
      { text: 'Все необходимое для крафта', character: 'steve' },
      { text: 'Редкие растения', character: 'alex' },
      { text: 'Ничего не выращиваю', character: 'creeper' },
      { text: 'Морковь и картошку', character: 'villager' }
    ]
  },
  {
    id: 18,
    text: 'Как ты исследуешь пещеры?',
    options: [
      { text: 'Систематически, факелами помечаю путь', character: 'steve' },
      { text: 'Иду вглубь, куда глаза глядят', character: 'alex' },
      { text: 'Бесшумно и в темноте', character: 'creeper' },
      { text: 'Я не хожу в пещеры', character: 'villager' }
    ]
  },
  {
    id: 19,
    text: 'Твое любимое зелье?',
    options: [
      { text: 'Зелье силы', character: 'steve' },
      { text: 'Зелье скорости', character: 'alex' },
      { text: 'Зелье невидимости', character: 'creeper' },
      { text: 'Зелье лечения', character: 'villager' }
    ]
  },
  {
    id: 20,
    text: 'Что для тебя главное в Minecraft?',
    options: [
      { text: 'Достичь всех целей', character: 'steve' },
      { text: 'Увидеть весь мир', character: 'alex' },
      { text: 'Быть уникальным', character: 'creeper' },
      { text: 'Играть с друзьями', character: 'villager' }
    ]
  }
];

const characters: Character[] = [
  {
    id: 'steve',
    name: 'Стив',
    emoji: '⛏️',
    description: 'Ты классический герой Minecraft! Трудолюбивый, целеустремленный и всегда готовый к новым вызовам.',
    traits: ['Трудолюбивый', 'Целеустремленный', 'Надежный', 'Практичный'],
    color: 'from-blue-500 to-cyan-500',
    image: 'https://cdn.poehali.dev/files/d2d8294a-97af-48d8-8bf7-506ba6c56cf8.png'
  },
  {
    id: 'alex',
    name: 'Алекс',
    emoji: '🗺️',
    description: 'Ты искатель приключений! Любишь исследовать мир, открывать новое и не боишься рисковать.',
    traits: ['Смелый', 'Любознательный', 'Авантюрный', 'Креативный'],
    color: 'from-orange-500 to-red-500',
    image: 'https://cdn.poehali.dev/files/a4b4d51d-0a16-495b-8cd9-3062abb874d7.png'
  },
  {
    id: 'creeper',
    name: 'Крипер',
    emoji: '💥',
    description: 'Ты загадочный и непредсказуемый! Не любишь шаблонов и всегда готов к неожиданным решениям.',
    traits: ['Непредсказуемый', 'Решительный', 'Взрывной', 'Уникальный'],
    color: 'from-green-500 to-emerald-600',
    image: 'https://cdn.poehali.dev/files/a9649e38-8c13-40ab-82a5-da993cb4dc30.png'
  },
  {
    id: 'villager',
    name: 'Житель деревни',
    emoji: '🏘️',
    description: 'Ты душа компании! Общительный, дружелюбный и всегда готов помочь другим.',
    traits: ['Дружелюбный', 'Общительный', 'Щедрый', 'Миролюбивый'],
    color: 'from-purple-500 to-pink-500',
    image: 'https://cdn.poehali.dev/files/8283c681-b9cc-4800-9653-a8628c2dc4da.png'
  }
];

export default function Index() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<Character | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log('Audio play error:', err));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleAnswer = (character: string) => {
    const newAnswers = { ...answers };
    newAnswers[character] = (newAnswers[character] || 0) + 1;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, number>) => {
    let maxCount = 0;
    let resultCharacter = 'steve';

    Object.entries(finalAnswers).forEach(([char, count]) => {
      if (count > maxCount) {
        maxCount = count;
        resultCharacter = char;
      }
    });

    const character = characters.find(c => c.id === resultCharacter);
    const finalResult = character || characters[0];
    
    setResult(finalResult);
    setShowResult(true);

    const totalTests = parseInt(localStorage.getItem('totalTests') || '0') + 1;
    localStorage.setItem('totalTests', totalTests.toString());
    
    const charCount = parseInt(localStorage.getItem(resultCharacter) || '0') + 1;
    localStorage.setItem(resultCharacter, charCount.toString());
  };

  const restart = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  const startTest = () => {
    setStarted(true);
    setCurrentQuestion(0);
  };

  if (showResult && result) {
    const totalTests = parseInt(localStorage.getItem('totalTests') || '0');
    const steveCount = parseInt(localStorage.getItem('steve') || '0');
    const alexCount = parseInt(localStorage.getItem('alex') || '0');
    const creeperCount = parseInt(localStorage.getItem('creeper') || '0');
    const villagerCount = parseInt(localStorage.getItem('villager') || '0');

    return (
      <div className={`min-h-screen bg-gradient-to-br ${result.color} flex items-center justify-center p-4`}>
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <Button
            onClick={() => setShowStats(!showStats)}
            variant="outline"
            size="icon"
            className="bg-white/90 hover:bg-white"
          >
            <Icon name="BarChart3" size={24} />
          </Button>
          <Button
            onClick={toggleMusic}
            variant="outline"
            size="icon"
            className="bg-white/90 hover:bg-white"
          >
            <Icon name={isMusicPlaying ? 'Volume2' : 'VolumeX'} size={24} />
          </Button>
        </div>

        {showStats && (
          <Card className="fixed top-20 right-4 z-40 p-6 w-80 animate-fade-in">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="BarChart3" size={20} />
              Статистика
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Всего тестов:</span>
                <span className="text-2xl font-bold text-primary">{totalTests}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>⛏️ Стив:</span>
                  <span className="font-semibold">{steveCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>🗺️ Алекс:</span>
                  <span className="font-semibold">{alexCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>💥 Крипер:</span>
                  <span className="font-semibold">{creeperCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>🏘️ Житель:</span>
                  <span className="font-semibold">{villagerCount}</span>
                </div>
              </div>
            </div>
          </Card>
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
                onClick={restart}
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

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={toggleMusic}
            variant="outline"
            size="icon"
            className="bg-white/90 hover:bg-white"
          >
            <Icon name={isMusicPlaying ? 'Volume2' : 'VolumeX'} size={24} />
          </Button>
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
                  {questions.length} интересных вопросов
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
              onClick={startTest}
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

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={toggleMusic}
          variant="outline"
          size="icon"
          className="bg-white/90 hover:bg-white"
        >
          <Icon name={isMusicPlaying ? 'Volume2' : 'VolumeX'} size={24} />
        </Button>
      </div>

      <Card className="max-w-2xl w-full bg-white/95 backdrop-blur-sm border-4 border-game-dark p-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-game text-game-dark">
                Вопрос {currentQuestion + 1} из {questions.length}
              </span>
              <span className="text-lg font-game text-game-dark">
                {Math.round(progress)}%
              </span>
            </div>
            
            <div className="w-full bg-game-dark/20 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-game-orange to-game-yellow transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="text-center py-6">
            <h2 className="text-3xl font-game text-game-dark mb-2">
              {question.text}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option.character)}
                className="h-auto py-6 px-6 text-lg font-body bg-white hover:bg-gradient-to-r hover:from-game-cyan hover:to-game-yellow border-2 border-game-dark text-game-dark hover:text-white transition-all hover:scale-105"
              >
                <div className="text-left w-full">
                  {option.text}
                </div>
              </Button>
            ))}
          </div>

          <Button
            onClick={restart}
            variant="outline"
            className="w-full border-2 border-game-dark hover:bg-game-dark/10"
          >
            <Icon name="Home" size={20} className="mr-2" />
            Начать заново
          </Button>
        </div>
      </Card>
    </div>
  );
}
