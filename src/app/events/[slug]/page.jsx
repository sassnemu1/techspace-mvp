"use client";

import { use } from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { eventData } from '@/data/eventData';

import './event-detail.css';


const Footer = dynamic(() => import('@/components/Footer/Footer'), {
  loading: () => null,
  ssr: true
});

export default function EventDetailPage({ params }) {
  const resolvedParams = use(params);

  const { meta, content } = eventData[resolvedParams.slug];
  const event = content

  if (!event) {
    notFound();
  }

  return (
    <main className="event-detail-page">
      {/* Hero */}
      <section className="event-detail-hero">
        <div className="event-detail-hero-bg" style={{ backgroundImage: `url(${event.image})` }}></div>
        <div className="event-detail-hero-overlay"></div>
        <div className="event-detail-hero-content">
          <div className='event-detail-hero-container-button'>
            <Link href="/events" className="event-detail-back">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Назад к событиям
            </Link>
            <span className="event-detail-badge">{event.type === 'exhibition' ? 'Выставка' : 'Мероприятие'}</span>
          </div>
          <h1 className="event-detail-title">{event.title}</h1>
          <p className="event-detail-subtitle">{event.subtitle}</p>
        </div>
      </section>

      {/* Info Bar */}
      <section className="event-info-bar">
        <div className="event-info-container">
          <div className="event-info-item">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div>
              <div className="event-info-label">Даты</div>
              <div className="event-info-value">{event.date}</div>
            </div>
          </div>

          <div className="event-info-item">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div className="event-info-label">Время</div>
              <div className="event-info-value">{event.time}</div>
            </div>
          </div>

          <div className="event-info-item">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div className="event-info-label">Место</div>
              <div className="event-info-value">{event.location}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="event-detail-content">
        <div className="event-detail-container">
          <div className="event-detail-main">
            {/* Description */}
            <div className="content-block">
              <h2 className="content-block-title">О событии</h2>
              <div className="content-block-text">
                {event.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Highlights */}
            {event.highlights && (
              <div className="content-block">
                <h2 className="content-block-title">Что вас ждет</h2>
                <div className="highlights-grid">
                  {event.highlights.map((highlight, idx) => (
                    <div key={idx} className="highlight-card">
                      <h3 className="highlight-title">{highlight.title}</h3>
                      <p className="highlight-description">{highlight.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* --- TimeLine Event -- */}
            <div className="section-subsectionEventWeek">
              <div className="section-title-subsectionEventWeek EventDetails-container-title-text">
                {event.sectionTitle}
              </div>

              {event.subsectionEventWeek && (
                <div className="subsectionEventWeek-timeline">
                  <div className="subsectionEventWeek-line" />

                  {event.subsectionEventWeek.map((eventWeek, idx) => {
                    const isLeft = idx % 2 === 0;

                    return (
                      <div
                        key={idx}
                        className={`subsectionEventWeek-item ${isLeft ? 'left' : 'right'}`}
                      >
                        <div className="subsectionEventWeek-number">
                          {idx + 1}
                        </div>

                        <div className="subsectionEventWeek-card">
                          <h3 className="subsectionEventWeek-card-title">
                            {eventWeek.title}
                          </h3>
                          <p className="subsectionEventWeek-card-description">
                            {eventWeek.description}
                          </p>
                        </div>

                        <div className="subsectionEventWeek-date">
                          {eventWeek.date}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>


            {/* ------ */}
            <div>
              <div className='EventDetails-container-title-text'>
                <p className='section-title-subsectionEventWeek'>
                  Два пути к лидерству
                </p>
              </div>

              <div className="eventBooth-card">
                <div>
                  <h2 className='section-title-text-EventDetails'>
                    AI Resident (Участник Экспо)
                  </h2>
                  <p className="eventBooth-intro">
                    Идеально для демонстрации нейросетей, софта и стартапов
                  </p>
                </div>

                <ul className="eventBooth-list">
                  <li className="eventBooth-item">
                    <span className="eventBooth-label">Стоимость:</span>
                    <span className="eventBooth-value">35 000 за 1 м²</span>
                  </li>

                  <li className="eventBooth-item">
                    <span className="eventBooth-label">Формат:</span>
                    <span className="eventBooth-value">Конструктор от 6 м² до 18 м²</span>
                  </li>

                  <li className="eventBooth-item">
                    <span className="eventBooth-label">Включено:</span>
                    <span className="eventBooth-value">
                      Аренда "чистого пола" (Clean Floor) и электропитания
                    </span>
                  </li>

                  <li className="eventBooth-item">
                    <span className="eventBooth-label">Медиа:</span>
                    <span className="eventBooth-value">
                      Слот 10 секунд на витринах Тверской (ротация 24/7)
                    </span>
                  </li>

                  <li className="eventBooth-item eventBooth-bonus">
                    <span className="eventBooth-label">BONUS:</span>
                    <span className="eventBooth-value">
                      Участие в подкасте TechProd
                    </span>
                  </li>
                </ul>
              </div>


              <div className='eventBooth-card__VIP'>
                <div>
                  <h2 className='section-title-text-EventDetails'>
                    Headliner (Хозяин Хакатона)
                  </h2>
                  <p className="eventBooth-intro">
                    Эксклюзивный слот для лидера ИИ-индустрии
                  </p>
                </div>

                <ul className="eventBooth-list">
                  <li className="eventBooth-item">
                    <span className="eventBooth-label">Стоимость:</span>
                    <span className="eventBooth-value">5 000 000 (Фикс)</span>
                  </li>

                  <li className="eventBooth-item">
                    <span className="eventBooth-label">Доминирование:</span>
                    <span className="eventBooth-value">Весь 4-й этаж в вашем распоряжении ({event.date}) для флагманского Хакатона</span>
                  </li>

                  <li className="eventBooth-item">
                    <span className="eventBooth-label">VIP Статус:</span>
                    <span className="eventBooth-value">
                      Участие в закрытой Церемонии Открытия (26.02) и презентация перед инвесторами
                    </span>
                  </li>

                  <li className="eventBooth-item">
                    <span className="eventBooth-label">Медиа:</span>
                    <span className="eventBooth-value">
                      1-минутный ролик на фасаде + Спецвыпуск подкаста подкаста TechProd с фаундером
                    </span>
                  </li>
                </ul>
              </div>

              <div className='eventBooth-technical-obespech-container'>
                <h2>Техническое обеспечение</h2>
                <p>
                  Базовая стоимость включает аренду площади. Для застройки мы рекомендуем: LED-решения от ADDREA (<a className='' href='https://addrea.com/'>https://addrea.com/</a>) -
                  визуализация кода генеративного арта на экранах любой формы. Готовые решения для рабочих мест (хакатон) и презентационных зон.
                  Полный каталог в отдельной Технической Презентации.
                </p>
              </div>

            </div>
            {/* ----- */}
          </div>

          {/* Sidebar */}
          <aside className="event-detail-sidebar">
            <div className="sidebar-sticky">
              {/* Tickets - БЕЗ ЦЕНЫ */}
              <div className="sidebar-card">
                <h3 className="sidebar-card-title">Забронировать место</h3>
                <a href={"#"} className="sidebar-cta-btn">
                  Купить билет
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              <div className="sidebar-card">
                <h3 className="sidebar-card-title">Стать участником</h3>
                <a href={"#"} className="sidebar-cta-btn">
                  Подробнее
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              {/* Share */}
              <div className="sidebar-card">
                <h3 className="sidebar-card-title">Мы в соцсетях</h3>
                <div className="share-buttons">
                  <button className="share-btn" title="VK">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.23 13.5C16.79 14.03 17.38 14.53 17.85 15.14C18.03 15.37 18.2 15.61 18.29 15.89C18.43 16.32 18.23 16.78 17.85 16.8H16.23C15.76 16.84 15.36 16.64 15.03 16.31C14.77 16.05 14.54 15.77 14.3 15.5C14.21 15.39 14.11 15.29 14 15.21C13.73 15.03 13.5 15.09 13.34 15.36C13.18 15.64 13.14 15.95 13.13 16.27C13.11 16.73 12.97 16.84 12.51 16.8C11.53 16.71 10.61 16.49 9.76 16.01C9.02 15.59 8.43 15.01 7.93 14.33C6.95 13 6.16 11.53 5.46 10.01C5.29 9.65 5.39 9.45 5.79 9.44C6.38 9.43 6.97 9.43 7.56 9.44C7.83 9.45 8 9.6 8.11 9.86C8.47 10.71 8.92 11.5 9.48 12.23C9.63 12.43 9.78 12.63 10.01 12.76C10.27 12.91 10.46 12.85 10.58 12.57C10.65 12.39 10.68 12.2 10.7 12.01C10.76 11.34 10.77 10.67 10.67 10C10.61 9.58 10.36 9.32 9.94 9.25C9.73 9.22 9.76 9.14 9.86 9.03C10.03 8.85 10.19 8.74 10.5 8.74H12.29C12.68 8.82 12.77 9 12.82 9.39L12.83 12.03C12.82 12.18 12.9 12.62 13.16 12.72C13.37 12.79 13.5 12.61 13.63 12.47C14.27 11.77 14.71 10.95 15.09 10.09C15.25 9.73 15.38 9.36 15.51 8.99C15.6 8.74 15.76 8.61 16.04 8.62L17.85 8.63C17.92 8.63 17.99 8.63 18.06 8.64C18.43 8.71 18.54 8.88 18.43 9.24C18.24 9.86 17.86 10.38 17.47 10.89C17.05 11.43 16.59 11.95 16.17 12.5C15.8 12.98 15.83 13.22 16.23 13.5Z" 
                            fill="currentColor"/>
                    </svg>
                  </button>
                  <button className="share-btn" title="Telegram">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.0069 10.4582 14.006 10.4252 13.9973 10.3938C13.9886 10.3624 13.9724 10.3337 13.95 10.31C13.89 10.26 13.81 10.28 13.74 10.29C13.65 10.31 12.25 11.24 9.52 13.08C9.12 13.35 8.76 13.49 8.44 13.48C8.08 13.47 7.4 13.28 6.89 13.11C6.26 12.91 5.77 12.8 5.81 12.45C5.83 12.27 6.08 12.09 6.55 11.9C9.47 10.63 11.41 9.79 12.38 9.39C15.16 8.23 15.73 8.03 16.11 8.03C16.19 8.03 16.38 8.05 16.5 8.15C16.6 8.23 16.63 8.34 16.64 8.42C16.63 8.48 16.65 8.66 16.64 8.8Z" 
                            fill="currentColor"/>
                    </svg>
                  </button>
                  <button className="share-btn" title="WhatsApp">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.5 8.5C16.5 8.22 16.72 8 17 8H18C18.28 8 18.5 8.22 18.5 8.5V9.5C18.5 9.78 18.28 10 18 10H17C16.72 10 16.5 9.78 16.5 9.5V8.5ZM12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10ZM12 8.5C9.79 8.5 8 10.29 8 12.5C8 14.71 9.79 16.5 12 16.5C14.21 16.5 16 14.71 16 12.5C16 10.29 14.21 8.5 12 8.5ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" 
                            fill="currentColor"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>


        <div className="event-details-footer VIP-footer">
          <div className="section-title-subsectionEventWeek">
            <p>Займите место в фундаменте</p>
          </div>

          <div className="VIP-footer-cards">
            <div className="VIP-footer-card">
              <span>1</span>
              <h3>Онлайн-бронирование</h3>
              <p>
                Для самостоятельного слота (AI-Resident) перейдите на официальный портал:{" "}
                <a href="https://techspace.moscow">www.techspace.moscow</a>
              </p>
              <p>
                В разделе Booking Engine вы увидите актуальную схему 2-го этажа и сможете
                выбрать конфигурацию стенда (6 - 18 м/кв) на неделю ИИ
              </p>
            </div>

            <div className="VIP-footer-card">
              <span>2</span>
              <h3>Прямой контакт</h3>
              <p>
                Свяжитесь с нами для согласования Хедлайнерского пакета (Хакатон) или
                сложной застройки.
              </p>
            </div>
          </div>

          <div className="event-details-footer contacts-footer">
            <div className="contacts-footer-cards">
              <div className="contacts-card">
                <h3>Технические вопросы, медиа и Застройка</h3>
                <p>Владислав Емельянов (СОО)</p>
                <p>Email: <a href="mailto:media@techspace.moscow">media@techspace.moscow</a></p>
                <p>Tel: <a href="tel:+79267675100">+7 926 767-51-00</a></p>
              </div>

              <div className="contacts-card">
                <h3>Стратегическое партнерство и Контакты</h3>
                <p>Ярослав Киселев (СЕО)</p>
                <p>Email: <a href="mailto:ceo@techspace.moscow">ceo@techspace.moscow</a></p>
                <p>Tel: <a href="tel:+79055087679">+7 905 508-76-79</a></p>
              </div>
            </div>
          </div>

          <div className='event-details-footer__sroki-bigline-container'>
              <span>Сроки: Прием заявок на неделю ИИ закрывается 12 февраля 2026 (за 14 дней до старта). После этой даты реестр передается в производство.</span>
          </div>
          <div className='event-details-footer__tags'>
              #TECHSPACEMOSCOW / #Тверская9 / #ARTIFICIAL INTELLI GENCE
          </div>

        </div>

      </section>

      <Footer />
    </main>
  );
}


