"use client";

import React, { useRef, useEffect, useState } from "react";
import "./SevenDaySprint.css";

const sprintDays = [
  {
    id: 1,
    day: "ЧЕТВЕРГ",
    title: "ЗАПУСК",
    subtitle: "(ЗОЛОТОЙ КРУГ)",
    time: "18:00 – 22:00",
    access: "Закрытые двери",
    audience: "Титаны, Инвесторы, Государственные чиновники",
    description:
      "Гранд-открытие темы недели. Красная дорожка, шампанское и Term Sheets. Самое эксклюзивное нетворк-событие Москвы.",
    accent: "#f7d774",
  },
  {
    id: 2,
    day: "ПЯТНИЦА",
    title: "ТЯГА",
    subtitle: "(ФОКУС B2B)",
    time: "10:00 – 22:00",
    access: null,
    audience: "Корпоративные скауты, Партнеры, Профессионалы индустрии",
    description:
      "Технические разборы, B2B-контракты, деловые встречи и корпоративные питчинги.",
    accent: "#bdbdbd",
  },
  {
    id: 3,
    day: "СБ/ВС",
    title: "ВОЛНА",
    subtitle: "(ПУБЛИКА И ТАЛАНТЫ)",
    time: "10:00 – 22:00",
    access: null,
    audience: "Горожане, ВУЗы, Техно-энтузиасты",
    description:
      "Образовательные воркшопы, хакатоны, массовые активности и публичная узнаваемость бренда.",
    accent: "#bdbdbd",
  },
  {
    id: 4,
    day: "ПН–СР",
    title: "УРОЖАЙ",
    subtitle: "(ЗАКРЫТИЕ)",
    time: "Стандартные часы",
    access: null,
    audience: "Частные переговоры",
    description:
      "Конвертация лидов в подписанные контракты. Работа с партнёрами в закрытом режиме.",
    accent: "#bdbdbd",
  },
  {
    id: 5,
    day: "СРЕДА",
    title: "ПЕРЕКЛЮЧЕНИЕ",
    subtitle: null,
    time: "22:00",
    access: null,
    audience: "Техническая команда",
    description:
      "Полный демонтаж экспозиции. Подготовка пространства к новому спринту.",
    accent: "#9e9e9e",
  },
];

export default function SevenDaySprint() {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [lineVisible, setLineVisible] = useState(false);
  const itemRefs = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            if (index !== undefined) {
              setVisibleItems((prev) => new Set([...prev, parseInt(index)]));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const lineObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLineVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    itemRefs.current.forEach((ref) => ref && observer.observe(ref));
    if (lineRef.current) lineObserver.observe(lineRef.current);

    return () => {
      observer.disconnect();
      lineObserver.disconnect();
    };
  }, []);

  return (
    <section className="seven-day-sprint">
      <div className="seven-day-sprint__header">
        <h2 className="seven-day-sprint__title">7-ДНЕВНЫЙ ИННОВАЦИОННЫЙ СПРИНТ</h2>
        <p className="seven-day-sprint__lead">
          Еженедельный цикл инноваций — премиальная программа для лидеров рынка и инвесторов.
        </p>
      </div>

      <div className="seven-day-sprint__timeline-wrap">
        <div
          ref={lineRef}
          className={`seven-day-sprint__line ${lineVisible ? "visible" : ""}`}
          aria-hidden="true"
        />

        {sprintDays.map((d, index) => (
          <div
            className="seven-day-sprint__item"
            key={d.id}
            ref={(el) => (itemRefs.current[index] = el)}
            data-index={index}
            aria-label={d.title}
          >
            <div
              className={`seven-day-sprint__dot ${visibleItems.has(index) ? "visible" : ""}`}
              style={{ borderColor: d.accent }}
            />

            <article
              className={`seven-day-sprint__card ${visibleItems.has(index) ? "visible" : ""}`}
              role="article"
              tabIndex={0}
            >
              <div className="seven-day-sprint__meta">
                <div className="seven-day-sprint__day">{d.day}</div>
                <div className="seven-day-sprint__time">{d.time}</div>
              </div>

              <h3 className="seven-day-sprint__card-title">
                {d.title}
                {d.subtitle && <span className="seven-day-sprint__card-sub">{d.subtitle}</span>}
              </h3>

              {d.access && <div className="seven-day-sprint__chip">{d.access}</div>}

              <div className="seven-day-sprint__aud">
                <strong>Аудитория:</strong> {d.audience}
              </div>

              <p className="seven-day-sprint__desc">{d.description}</p>
            </article>
          </div>
        ))}
      </div>

      <div className="seven-day-sprint__footer-note">
        Каждую среду в 22:00 — переключение; к утру четверга — новая экспозиция.
      </div>
    </section>
  );
}
