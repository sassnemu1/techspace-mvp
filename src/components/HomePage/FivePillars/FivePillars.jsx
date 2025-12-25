"use client";

import { useState } from "react";
import './FivePillars.css';

const pillars = [
  {
    id: 1,
    title: "ИИ И НЕЙРОСЕТИ",
    subtitle: "(МОЗГ)",
    icon: "🧠",
    focus: "Большие языковые модели (LLM), Компьютерное зрение и Предиктивная аналитика.",
    goal: "Разработка суверенного кода, который будет управлять российской автоматизацией и независимостью данных.",
  },
  {
    id: 2,
    title: "РЕАЛЬНОСТЬ: AR/VR/GAMEDEV",
    subtitle: "(ЗРЕНИЕ)",
    icon: "👁️",
    focus: "Метавселенные, Иммерсивное образование и GameDev.",
    goal: "Выход за рамки развлечений к промышленному применению и интерфейсам нового поколения (Kizo).",
  },
  {
    id: 3,
    title: "FINTECH И КРИПТО",
    subtitle: "(ЭКОНОМИКА)",
    icon: "💰",
    focus: "Блокчейн, Цифровой банкинг, Инфраструктура майнинга и DeFi.",
    goal: "Построение финансовой архитектуры будущего, независимой от внешнего давления.",
  },
  {
    id: 4,
    title: "РОБОТОТЕХНИКА И ЖЕЛЕЗО",
    subtitle: "(ТЕЛО)",
    icon: "🤖",
    focus: "Промышленная автоматизация, БПЛА (Дроны) и Тяжелое машиностроение.",
    goal: "Реиндустриализация через хай-тек оборудование. От заводских цехов до неба.",
  },
  {
    id: 5,
    title: "МЕДИА ТЕХ",
    subtitle: "(ГОЛОС)",
    icon: "🎤",
    focus: "Стриминговые технологии, Инфраструктура подкастов и Цифровое влияние.",
    goal: "Контроль нарратива через превосходные технологии вещания и создание контента.",
  },
];

export default function FivePillars() {
  const [active, setActive] = useState(null);

  const circlePositions = [
    { top: '37%', left: '50%', transform: 'translate(-50%, -50%)' },
    { top: '42%', right: '37%' },
    { bottom: '36%', right: '39%' },
    { bottom: '36%', left: '39%' },
    { top: '42%', left: '37%' },
  ];

  const cardPositions = [
    { top: '2%', left: '20%', transform: 'translateX(-50%)' },
    { top: '-5%', right: '15%' },
    { top: '45%', right: '5%' },
    { bottom: '-3%', right: '40%' },
    { bottom: '15%', left: '5%' },
  ];

  return (
    <div className="five-pillars-container">
      <div className="five-pillars-header">
        <h1 className="five-pillars-title">5 СТОЛПОВ СУВЕРЕНИТЕТА</h1>
        <p className="five-pillars-subtitle">Полный Охват Экосистемы</p>
      </div>

      <div className="five-pillars-content">
        <div className="center-circle">ЦЕЛЬ</div>

        {pillars.map((pillar, i) => (
          <div
            key={pillar.id}
            className={`pillar-circle ${active === i ? 'active' : ''}`}
            style={circlePositions[i]}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            {pillar.id}
          </div>
        ))}

        {pillars.map((pillar, i) => (
          <div
            key={`card-${pillar.id}`}
            className={`pillar-card ${active === i ? 'active' : ''}`}
            style={cardPositions[i]}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <h3 className="pillar-card-title">
              {String(pillar.id).padStart(2, '0')}. {pillar.title}
            </h3>
            <p className="pillar-card-subtitle">{pillar.subtitle}</p>
            <p className="pillar-card-text">
              <strong>Фокус:</strong> {pillar.focus}
            </p>
            <p className="pillar-card-text">
              <strong>Цель:</strong> {pillar.goal}
            </p>
          </div>
        ))}
      </div>

      <div className="five-pillars-quote">
        <p>"Пять Направлений. Одна Суверенная Цель."</p>
      </div>
    </div>
  );
}
