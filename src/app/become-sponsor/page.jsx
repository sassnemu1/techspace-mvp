'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import './become-sponsore.css';

const Footer = dynamic(() => import('@/components/Footer/Footer'), {
  loading: () => null,
  ssr: true
});

export default function BecomeSponsorPage() {
  return (
    <>
      <section className="sponsor-page">
        {/* HERO С ФОНОМ ИЗОБРАЖЕНИЯ */}
        <div className="sponsor-hero">
          <div className="sponsor-hero__bg-overlay">
            <img
              src="/assets/become-sponsor.webp"
              alt=""
              className="sponsor-hero__bg-image"
            />
          </div>
          
          <div className="sponsor-hero__content-overlay">
            <div className="sponsor-hero__content">
              <p className="sponsor-hero__eyebrow">Для стратегических партнёров</p>
              <h1 className="sponsor-hero__title">
                Стать Спонсором <span className="sponsor-hero__title-accent">Techspace</span>
              </h1>
              <p className="sponsor-hero__subtitle">
                Закрытая платформа для лидеров рынка, которые хотят войти в экосистему суверенных технологий
                и получить прямой доступ к основателям, продуктам и живым демонстрациям.
              </p>

              <div className="sponsor-hero__cta-row">
                <Link href="#formats" className="sponsor-cta sponsor-cta--primary">
                  Форматы партнёрства
                </Link>
                <Link href="#contact" className="sponsor-cta sponsor-cta--ghost">
                  Связаться с командой
                </Link>
              </div>

              <div className="sponsor-hero__meta">
                <div className="sponsor-hero__meta-item">
                  <span className="sponsor-hero__meta-label">Аудитория</span>
                  <span className="sponsor-hero__meta-value">C‑level, инвесторы, госструктуры</span>
                </div>
                <div className="sponsor-hero__meta-item">
                  <span className="sponsor-hero__meta-label">Формат</span>
                  <span className="sponsor-hero__meta-value">Живые демонстрации + закрытые сессии</span>
                </div>
                <div className="sponsor-hero__meta-item">
                  <span className="sponsor-hero__meta-label">Фокус</span>
                  <span className="sponsor-hero__meta-value">Носимые технологии, AR, индустриальные решения</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Остальные секции остаются ТЕМ ЖЕ */}
        {/* ЦЕННОСТЬ ДЛЯ СПОНСОРОВ */}
        <section className="sponsor-section" id="value" style={{marginBottom: '120px'}}>
          <div className="sponsor-section__header">
            <h2 className="sponsor-section__title">Почему брендам выгодно участвовать</h2>
            <p className="sponsor-section__subtitle">
              Спонсорство — это не логотип на баннере, а роль соавтора технологической сцены.
              Каждое интеграционное решение проектируется под задачи партнёра.
            </p>
          </div>

          <div className="sponsor-grid sponsor-grid--3">
            {/* ... контент тот же ... */}
            <div className="sponsor-card">
              <h3 className="sponsor-card__title">Доступ к первым лицам</h3>
              <p className="sponsor-card__text">
                Закрытые форматы с участием C‑level, инвесторов и представителей государства: ужины,
                камерные презентации, приватные демо‑комнаты.
              </p>
            </div>
            <div className="sponsor-card">
              <h3 className="sponsor-card__title">Живая демонстрация технологий</h3>
              <p className="sponsor-card__text">
                Интеграция бренда в сценарий: AR‑активации, product‑storytelling,
                нативные появление в ключевых моментах вечера.
              </p>
            </div>
            <div className="sponsor-card">
              <h3 className="sponsor-card__title">Сильный имидж и PR</h3>
              <p className="sponsor-card__text">
                Позиционирование бренда как партнёра суверенных технологий и новых носимых интерфейсов,
                с фокусом на долгосрочную повестку.
              </p>
            </div>
          </div>
        </section>

      {/* ФОРМАТЫ ПАРТНЁРСТВА */}
      <section className="sponsor-section" id="formats">
        <div className="sponsor-section__header sponsor-section__header--split">
          <div>
            <h2 className="sponsor-section__title">Форматы партнёрства</h2>
            <p className="sponsor-section__subtitle">
              Несколько уровней участия — от тайтл‑партнёра гала‑ужина до точечной интеграции
              в AR‑сценарий и спонсорства отдельных спринтов.
            </p>
          </div>
          <div className="sponsor-section__note">
            <p>
              Детальная структура пакетов, стоимость и технические требования доступны в закрытом досье
              для потенциальных партнёров.
            </p>
          </div>
        </div>

        <div className="sponsor-grid sponsor-grid--3">
          <div className="sponsor-tier">
            <p className="sponsor-tier__badge">Премиум</p>
            <h3 className="sponsor-tier__title">Title‑партнёр</h3>
            <p className="sponsor-tier__desc">
              Максимальная видимость бренда во всех точках контакта: вечер, AR‑слой, коммуникация до и после события.
            </p>
            <ul className="sponsor-tier__list">
              <li>Брендинг ключевых зон и AR‑сцен</li>
              <li>Выделенный блок в основном сценарии вечера</li>
              <li>Приоритетный доступ к встречам с основателями</li>
            </ul>
          </div>

          <div className="sponsor-tier sponsor-tier--accent">
            <p className="sponsor-tier__badge">Рекомендуем</p>
            <h3 className="sponsor-tier__title">Официальный спонсор</h3>
            <p className="sponsor-tier__desc">
              Сбалансированный пакет для брендов, которые хотят быть внутри повестки и при этом
              сохранить фокус на конкретных продуктах.
            </p>
            <ul className="sponsor-tier__list">
              <li>Брендинг отдельных зон и digital‑носителей</li>
              <li>Нативные интеграции в AR‑опыт гостей</li>
              <li>Квота на приглашения и приватные встречи</li>
            </ul>
          </div>

          <div className="sponsor-tier">
            <p className="sponsor-tier__badge">Точечная интеграция</p>
            <h3 className="sponsor-tier__title">Партнёр спринта</h3>
            <p className="sponsor-tier__desc">
              Участие в рамках конкретного 7‑дневного спринта или отдельного блока программы.
            </p>
            <ul className="sponsor-tier__list">
              <li>Брендинг спринта и коммуникации внутри недели</li>
              <li>Совместные активности с командами и менторами</li>
              <li>Гибкая кастомизация под задачи партнёра</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ПРОФИЛЬ АУДИТОРИИ + ВИЗУАЛ */}
      <section className="sponsor-section sponsor-section--inverse">
        <div className="sponsor-section__header">
          <h2 className="sponsor-section__title">Кого вы встретите на площадке</h2>
          <p className="sponsor-section__subtitle">
            Аудитория отбирается вручную: участники, для которых инновации — не презентация,
            а рабочий инструмент и предмет стратегических решений.
          </p>
        </div>

        <div className="sponsor-audience">
          <div className="sponsor-audience__list">
            <div className="sponsor-audience__item">
              <span className="sponsor-audience__label">Инвесторы</span>
              <p className="sponsor-audience__text">
                Фонды и частные инвесторы с фокусом на deep‑tech, hardware и инфраструктурные решения.
              </p>
            </div>
            <div className="sponsor-audience__item">
              <span className="sponsor-audience__label">Бизнес</span>
              <p className="sponsor-audience__text">
                Корпорации, ищущие партнёров для пилотов, внедрения и совместных R&amp;D‑проектов.
              </p>
            </div>
            <div className="sponsor-audience__item">
              <span className="sponsor-audience__label">Госструктуры</span>
              <p className="sponsor-audience__text">
                Представители госорганов, отвечающие за цифровую трансформацию и технологический суверенитет.
              </p>
            </div>
          </div>

          <div className="sponsor-audience__visual">
            <div className="sponsor-audience__glass">
              <img
                src="https://images.pexels.com/photos/155907/pexels-photo-155907.jpeg"
                alt="Stage and audience"
                className="sponsor-audience__image"
              />
              <div className="sponsor-audience__tag">Живые демонстрации · AR · Манеж</div>
            </div>
          </div>
        </div>
      </section>

      {/* КОНТАКТ / CTA */}
      <section className="sponsor-section" id="contact">
        <div className="sponsor-contact">
          <div className="sponsor-contact__text">
            <h2 className="sponsor-section__title">Получить спонсорское досье</h2>
            <p className="sponsor-section__subtitle">
              Оставьте контакты, и команда вышлет актуальное досье по формату, пакетам спонсорства
              и доступным интеграциям, а также предложит слот для личного созвона.
            </p>
            <ul className="sponsor-contact__bullets">
              <li>PDF‑презентация форматов и сценариев интеграции</li>
              <li>Актуальные даты, квоты и условия участия</li>
              <li>Возможность кастомизации пакета под ваши задачи</li>
            </ul>
          </div>

          <form className="sponsor-contact__form">
            <div className="sponsor-form__row">
              <div className="sponsor-form__field">
                <label>Имя и компания</label>
                <input type="text" placeholder="Например: Анна, TechCorp" />
              </div>
              <div className="sponsor-form__field">
                <label>Рабочая почта</label>
                <input type="email" placeholder="name@company.com" />
              </div>
            </div>

            <div className="sponsor-form__field">
              <label>Роль / интерес</label>
              <input type="text" placeholder="Инвестор, партнёр, корпорация, медиа..." />
            </div>

            <div className="sponsor-form__field">
              <label>Комментарий</label>
              <textarea
                rows={3}
                placeholder="Кратко опишите задачи, которые вы хотите решить через участие."
              />
            </div>

            <button type="submit" className="sponsor-cta sponsor-cta--primary sponsor-cta--full">
              Отправить запрос на партнёрство
            </button>

            <p className="sponsor-form__hint">
              Отправляя форму, вы подтверждаете согласие на обработку данных и получение
              информационных материалов о мероприятии.
            </p>
          </form>
        </div>
      </section>
    </section>

    <Footer />

    </>
  );
}
