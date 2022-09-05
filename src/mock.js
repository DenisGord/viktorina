export const questions = [
  {
    qustion: "Сколько лет Андрею Шандановину",
    answers: [
      { answer: 21, right: false },
      { answer: 22, right: false },
      { answer: 23, right: true },
      { answer: 24, right: false }
    ]
  },
  {
    qustion: "Что открыл Андрей в морозовке",
    answers: [
      { answer: "Банку пива", right: true },
      { answer: "Баскетбол", right: false },
      { answer: "Америку", right: false },
      { answer: "КВН", right: false }
    ]
  },
  {
    qustion: "Каких букв нет в имени Андрей",
    answers: [
      { answer: "А", right: false },
      { answer: "Г", right: true },
      { answer: "Д", right: false },
      { answer: "Н", right: false }
    ]
  },
  {
    qustion:
      "Какого цвета футблока, была на Андрее на вечеринке в конезаводе, где были Денис Юля и Никита ",
    answers: [
      { answer: "Белая", right: false },
      { answer: "Черная", right: true },
      { answer: "Серая", right: false },
      { answer: "Синяя", right: false }
    ]
  },
  {
    qustion: "Кто нарисован слева от Андрея, на его третьей фотографии в вк",
    answers: [
      { answer: "Кот", right: false },
      { answer: "Собака", right: false },
      { answer: "Белка", right: false },
      { answer: "Лиса", right: true }
    ]
  },
  {
    qustion: "Сколько подарков у Андрея в вк",
    answers: [
      { answer: "60", right: false },
      { answer: "73", right: false },
      { answer: "80", right: true },
      { answer: "87", right: false }
    ]
  },
  {
    qustion:
      'Сколько сообщений пропустил Андрей в группе "Круги ДНД" пока был на корпаротиве',
    answers: [
      { answer: "290", right: false },
      { answer: "291", right: false },
      { answer: "292", right: true },
      { answer: "293", right: false }
    ]
  },
  {
    qustion:
      "Какого числа опубликована самая первая фотография Андрея в инстаграме",
    answers: [
      { answer: "25 мая 2016", right: true },
      { answer: "26 мая 2016", right: false },
      { answer: "25 мая 2015", right: false },
      { answer: "24 мая 2016", right: false }
    ]
  },
  {
    qustion: "Что набито на левой груди у Андрея (по мнению Дениса) ",
    answers: [
      { answer: "Плутон", right: false },
      { answer: "Юпитер", right: false },
      { answer: "Венера", right: false },
      { answer: "Сатурн", right: true }
    ]
  },
  {
    qustion: "Какое слово Андрей скажет далее",
    media: {
      question: "https://www.veed.io/embed/5e799004-3a75-4ef7-8a22-e22c79555a1d",
      answer: 'https://www.veed.io/embed/e0975bab-fc3c-459e-994b-cdd9db48bc53',
      type: 'video',
    },
    answers: [
      { answer: "Бля", right: true },
      { answer: "Сука", right: false },
      { answer: "Ебать", right: false },
      { answer: "Охуеть", right: false }
    ]
  },
];

export const newQuestion = [
  {
    question: "Хотите увидеть вопросы к следующей викториен?",
 
    answers: [
      { answer: "хуй вам", points: "20" },
      { answer: "не покажу", points: "30" },
      { answer: "целуй залупу", points: "40" },
      { answer: "любовь спасет мир", points: "10" }
    ]
  },

];

export const superGame = {
  title: 'Расставьте соответствие',
  questions: [
    { qustion: 'Пенис', answer: '1' },
    { qustion: 'Кирилл', answer: '5' },
    { qustion: 'Побрито', answer: '4' },
    { qustion: 'Андрей', answer: '2' },
    { qustion: 'Никита', answer: '3' },
  ],
  answers: [
    'Гордюшин', 'Мандановин', "Пивченко", "Гудым", "Кончнев"
  ]
}

export const hints = ["звонок другу", "50 на 50", "70 на 30"];
