"use client";

import { useRef, useState, useEffect } from "react";
// import Link from "next/link";
import "./ContentSection.css";

export default function ContentSection({ id }) {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const stats = [
    { value: "50", label: "Недель" },
    { value: "1", label: "Миссия" },
    { value: "∞", label: "Возможностей" },
  ];

  const features = [
    { id: 1, title: "ПРЯМОЙ ДОСТУП К ТИТАНАМ", description: "Находитесь в одном пространстве с Яндексом, Росатомом и Альфа-Банком. Наши «Титаны-Партнеры» не просто спонсируют, они ищут таланты. Ваш стенд попадает на их радары для поглощения, партнерства и интеграции.", icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
        <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" fill="currentColor"/>
      </svg>
    ) },
    { id: 2, title: "ЧЕТВЕРГ: КРУГ ИНВЕСТОРОВ", description: "Каждый четверг с 18:00 до 22:00 двери закрыты для публики. Вход только для Аккредитованных Инвесторов, Венчурных Фондов и Госчиновников. Это время, когда обсуждаются условия сделок и подписываются контракты.", icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <circle cx="8" cy="8" r="2" fill="currentColor"/>
      <circle cx="16" cy="8" r="2" fill="currentColor"/>
      <circle cx="12" cy="16" r="2" fill="currentColor"/>
      <line x1="8" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2"/>
      <line x1="16" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2"/>
      <line x1="8" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="2"/>
    </svg>
    ) },
    { id: 3, title: "ГОСУДАРСТВЕННАЯ ВАЛИДАЦИЯ", description: "Расположенный в 500 метрах от центра власти, Techspace является витриной Национального Суверенитета. Участие здесь сигнализирует городу и федеральным властям, что ваша технология — серьезный актив для государства.", icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M6 2H14L20 8V22H6V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="16" r="2" fill="currentColor"/>
      </svg>

    ) },
    { id: 4, title: "МЕДИА МАШИНА", description: "Вы получаете не просто стенд, вы получаете голос. Участники получают освещение через наш внутренний медиа-хаус — подкасты, прямые эфиры и цифровой фасад — транслируя ваши инновации на миллионную аудиторию.", icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L9 9L2 12L9 15L12 22L15 15L22 12L15 9L12 2Z" fill="currentColor"/>
      </svg>
    ) },
  ];

  return (
    <section ref={sectionRef} id={id} className="about-section">
      <div className="about-container">
        <div className="about-image-column">
          <div className="about-image-wrapper">
            <div className="about-image-badge"><span>Est. 2024</span></div>
            <div className="about-image">
              <img src="/assets/floor/floor-1.webp" alt="ART-Space Exhibition" loading={isMobile ? "lazy" : "eager"} />
              <div className="about-image-overlay" />
            </div>
            <div className="about-image-decoration"><div className="about-image-decoration-line"/></div>
          </div>
        </div>

        <div className="about-content-column">
          <div className="about-header">
            <span className="about-label">О пространстве</span>
            <h2 className="about-title">Tech-Space</h2>
            <p className="about-description">
              ЖИВАЯ ЛАБОРАТОРИЯ РОССИИ Techspace — это радикальный отказ от статичных выставок. Мы создали 4-уровневую вертикальную машину инноваций в самом сердце «Золотой Мили» Москвы.
            </p>
            <p>
              Здесь нет пыльных экспонатов. В режиме 7-дневных спринтов здесь рождаются продукты, которые определят 2030 год. Мы объединяем мощь государственных гигантов с дерзостью наших собственных стартапов .
            </p>
            <p>
              От квантовых вычислений до агро-ботов — это место, где код обретает физическую форму.
            </p>
          </div>

          <div className="about-stats">
            {stats.map((stat, index) => (
              <div key={index} className="about-stat-item">
                <div className="about-stat-value">{stat.value}</div>
                <div className="about-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="about-header">
            <h2 className="about-description-h2">ВЫ ПОКУПАЕТЕ НЕ МЕТРЫ.<br />ВЫ ПОКУПАЕТЕ ИСТОРИЮ.</h2>
            <br />
            <p className="about-description">
              Участие в Techspace — это не договор аренды. Это вступление в самую эксклюзивную технологическую экосистему России.
            </p>
            <p>Мы курируем состав участников, чтобы гарантировать, что только серьезные игроки делят площадку с Титанами.</p>
            <p>Каждый участник становится частью элитного круга, где рождаются стратегические альянсы.</p>
          </div>

          

          {/* <div className="about-cta">
            <Link href="/events" className="about-cta-button">
              <span>Смотреть выставки</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <div className="about-location-info">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
              </svg>
              <span>Москва, Тверская 9</span>
            </div>
          </div> */}
        </div>

        
      </div>
      <div className="about-features">
            {features.map(f => (
              <div key={f.id} className="about-feature-card">
                <div className="about-feature-content">
                  <h3 className="about-feature-title">{f.title}</h3>
                  <div className="about-feature-icon">{f.icon}</div>
                </div>
                <p className="about-feature-description">{f.description}</p>
              </div>
            ))}
          </div>
    </section>
  );
}
