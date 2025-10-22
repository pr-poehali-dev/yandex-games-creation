import { Question, Character } from './types';

export const questions: Question[] = [
  {
    id: 1,
    text: 'Как ты проводишь ночь?',
    options: [
      { text: 'Строю укрепления', character: 'steve' },
      { text: 'Исследую темноту', character: 'alex' },
      { text: 'Скрываюсь в тенях', character: 'creeper' },
      { text: 'Прячусь дома', character: 'villager' },
      { text: 'Наблюдаю издалека', character: 'slenderman' }
    ]
  },
  {
    id: 2,
    text: 'Что тебя пугает?',
    options: [
      { text: 'Ничего особенного', character: 'steve' },
      { text: 'Неизведанное', character: 'alex' },
      { text: 'Одиночество', character: 'creeper' },
      { text: 'Монстры', character: 'villager' },
      { text: 'Сам себя', character: 'slenderman' }
    ]
  },
  {
    id: 3,
    text: 'Как ты решаешь задачи?',
    options: [
      { text: 'Прямо и честно', character: 'steve' },
      { text: 'Креативно', character: 'alex' },
      { text: 'Взрывоопасно', character: 'creeper' },
      { text: 'Помогают друзья', character: 'villager' },
      { text: 'Молча и медленно', character: 'slenderman' }
    ]
  },
  {
    id: 4,
    text: 'Твой любимый биом?',
    options: [
      { text: 'Горы', character: 'steve' },
      { text: 'Джунгли', character: 'alex' },
      { text: 'Темный лес', character: 'creeper' },
      { text: 'Равнины', character: 'villager' },
      { text: 'Туманный лес', character: 'slenderman' }
    ]
  },
  {
    id: 5,
    text: 'Как тебя видят?',
    options: [
      { text: 'Надежным', character: 'steve' },
      { text: 'Смелым', character: 'alex' },
      { text: 'Опасным', character: 'creeper' },
      { text: 'Добрым', character: 'villager' },
      { text: 'Пугающим', character: 'slenderman' }
    ]
  },
  {
    id: 6,
    text: 'Твоя стратегия?',
    options: [
      { text: 'Сила', character: 'steve' },
      { text: 'Ловкость', character: 'alex' },
      { text: 'Внезапность', character: 'creeper' },
      { text: 'Дипломатия', character: 'villager' },
      { text: 'Страх', character: 'slenderman' }
    ]
  },
  {
    id: 7,
    text: 'Что ты ищешь?',
    options: [
      { text: 'Ресурсы', character: 'steve' },
      { text: 'Приключения', character: 'alex' },
      { text: 'Внимание', character: 'creeper' },
      { text: 'Друзей', character: 'villager' },
      { text: 'Жертв', character: 'slenderman' }
    ]
  },
  {
    id: 8,
    text: 'Твое оружие?',
    options: [
      { text: 'Меч', character: 'steve' },
      { text: 'Лук', character: 'alex' },
      { text: 'Я сам оружие', character: 'creeper' },
      { text: 'Не нужно', character: 'villager' },
      { text: 'Взгляд', character: 'slenderman' }
    ]
  },
  {
    id: 9,
    text: 'Как двигаешься?',
    options: [
      { text: 'Уверенно', character: 'steve' },
      { text: 'Быстро', character: 'alex' },
      { text: 'Скрытно', character: 'creeper' },
      { text: 'Медленно', character: 'villager' },
      { text: 'Телепортируюсь', character: 'slenderman' }
    ]
  },
  {
    id: 10,
    text: 'Что в темноте?',
    options: [
      { text: 'Работаю', character: 'steve' },
      { text: 'Охочусь', character: 'alex' },
      { text: 'Брожу', character: 'creeper' },
      { text: 'Сплю', character: 'villager' },
      { text: 'Преследую', character: 'slenderman' }
    ]
  },
  {
    id: 11,
    text: 'Твой дом?',
    options: [
      { text: 'Крепость', character: 'steve' },
      { text: 'Дом на дереве', character: 'alex' },
      { text: 'Бункер', character: 'creeper' },
      { text: 'Коттедж', character: 'villager' },
      { text: 'Нет дома', character: 'slenderman' }
    ]
  },
  {
    id: 12,
    text: 'В команде ты?',
    options: [
      { text: 'Лидер', character: 'steve' },
      { text: 'Разведчик', character: 'alex' },
      { text: 'Одиночка', character: 'creeper' },
      { text: 'Помощник', character: 'villager' },
      { text: 'Наблюдатель', character: 'slenderman' }
    ]
  },
  {
    id: 13,
    text: 'Нашел алмазы!',
    options: [
      { text: 'Делаю броню', character: 'steve' },
      { text: 'Зачаровываю', character: 'alex' },
      { text: 'Прячу', character: 'creeper' },
      { text: 'Торгую', character: 'villager' },
      { text: 'Не интересует', character: 'slenderman' }
    ]
  },
  {
    id: 14,
    text: 'Твой взгляд?',
    options: [
      { text: 'Уверенный', character: 'steve' },
      { text: 'Любопытный', character: 'alex' },
      { text: 'Безумный', character: 'creeper' },
      { text: 'Добрый', character: 'villager' },
      { text: 'Пустой', character: 'slenderman' }
    ]
  },
  {
    id: 15,
    text: 'Как украшен дом?',
    options: [
      { text: 'Функционально', character: 'steve' },
      { text: 'Экзотично', character: 'alex' },
      { text: 'Минимально', character: 'creeper' },
      { text: 'Уютно', character: 'villager' },
      { text: 'Пусто и жутко', character: 'slenderman' }
    ]
  },
  {
    id: 16,
    text: 'Твоя тактика?',
    options: [
      { text: 'В лоб', character: 'steve' },
      { text: 'Маневры', character: 'alex' },
      { text: 'Взрыв', character: 'creeper' },
      { text: 'Не дерусь', character: 'villager' },
      { text: 'Психология', character: 'slenderman' }
    ]
  },
  {
    id: 17,
    text: 'Что выращиваешь?',
    options: [
      { text: 'Все подряд', character: 'steve' },
      { text: 'Редкое', character: 'alex' },
      { text: 'Ничего', character: 'creeper' },
      { text: 'Овощи', character: 'villager' },
      { text: 'Страхи', character: 'slenderman' }
    ]
  },
  {
    id: 18,
    text: 'В пещере?',
    options: [
      { text: 'Ищу руду', character: 'steve' },
      { text: 'Исследую', character: 'alex' },
      { text: 'Скрываюсь', character: 'creeper' },
      { text: 'Не хожу', character: 'villager' },
      { text: 'Преследую', character: 'slenderman' }
    ]
  },
  {
    id: 19,
    text: 'Любимое зелье?',
    options: [
      { text: 'Силы', character: 'steve' },
      { text: 'Скорости', character: 'alex' },
      { text: 'Невидимости', character: 'creeper' },
      { text: 'Лечения', character: 'villager' },
      { text: 'Тьмы', character: 'slenderman' }
    ]
  },
  {
    id: 20,
    text: 'Главное в игре?',
    options: [
      { text: 'Победить', character: 'steve' },
      { text: 'Исследовать', character: 'alex' },
      { text: 'Быть собой', character: 'creeper' },
      { text: 'Дружить', character: 'villager' },
      { text: 'Пугать', character: 'slenderman' }
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
    image: 'https://cdn.poehali.dev/files/d2d8294a-97af-48d8-8bf7-506ba6c56cf8.png',
    isLocked: false
  },
  {
    id: 'alex',
    name: 'Алекс',
    emoji: '🗺️',
    description: 'Ты искатель приключений! Любишь исследовать мир, открывать новое и не боишься рисковать.',
    traits: ['Смелый', 'Любознательный', 'Авантюрный', 'Креативный'],
    color: 'from-orange-500 to-red-500',
    image: 'https://cdn.poehali.dev/files/a4b4d51d-0a16-495b-8cd9-3062abb874d7.png',
    isLocked: false
  },
  {
    id: 'creeper',
    name: 'Крипер',
    emoji: '💥',
    description: 'Ты загадочный и непредсказуемый! Не любишь шаблонов и всегда готов к неожиданным решениям.',
    traits: ['Непредсказуемый', 'Решительный', 'Взрывной', 'Уникальный'],
    color: 'from-green-500 to-emerald-600',
    image: 'https://cdn.poehali.dev/files/a9649e38-8c13-40ab-82a5-da993cb4dc30.png',
    isLocked: false
  },
  {
    id: 'villager',
    name: 'Житель деревни',
    emoji: '🏘️',
    description: 'Ты душа компании! Общительный, дружелюбный и всегда готов помочь другим.',
    traits: ['Дружелюбный', 'Общительный', 'Щедрый', 'Миролюбивый'],
    color: 'from-purple-500 to-pink-500',
    image: 'https://cdn.poehali.dev/files/8283c681-b9cc-4800-9653-a8628c2dc4da.png',
    isLocked: false
  },
  {
    id: 'slenderman',
    name: 'Слендермен',
    emoji: '👁️',
    description: 'Ты воплощение ужаса... Высокая тёмная фигура без лица, скрывающаяся в тумане. Твоё присутствие заставляет других оборачиваться в страхе. Ты не ходишь - ты появляешься. Безмолвный, неумолимый, вечный. Жертвы видят тебя краем глаза, но когда оборачиваются - ты уже ближе. Каждый твой шаг - это шаг в разум того, кто осмелился на тебя взглянуть.',
    traits: ['Пугающий', 'Молчаливый', 'Неумолимый', 'Загадочный', 'Телепортирующийся'],
    color: 'from-gray-900 to-black',
    image: 'https://cdn.poehali.dev/files/f495abc4-a4ae-4bdb-ab3d-f25ce902d86b.png',
    isLocked: true
  }
];
