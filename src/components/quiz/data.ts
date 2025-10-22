import { Question, Character } from './types';

export const questions: Question[] = [
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

export const characters: Character[] = [
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
