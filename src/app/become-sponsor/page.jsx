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
      <section className="become-sponsor-page">
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
              <h1 className="sponsor-hero__title">
                Techspace  <span className="sponsor-hero__title-accent">Партнерство</span>
              </h1>
              <p className="sponsor-hero__subtitle">
                Пространство для демонстрации технологий, тестирования гипотез и встреч с инвесторами. <br />Локация: Москва, 500 метров от Кремля
              </p>

              <div className="sponsor-hero__cta-row">
                <Link href="#concept" className="sponsor-cta sponsor-cta--primary">
                  Концепция
                </Link>
                <Link href="#economics" className="sponsor-cta sponsor-cta--ghost">
                  Экономика
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* КОНЦЕПЦИЯ */}
        <section className="sponsor-section sponsor-section sponsor-section--1300" id="concept">
          <div className="sponsor-section__header">
            <h2 className="sponsor-section__title">Концепция. Новая Выставочная Модель</h2>
            <p className="sponsor-section__subtitle">
              Традиционные выставки статичны. Мы создаем динамичный формат 7-дневных технологических спринтов.
            </p>
          </div>

          <div className="sponsor-grid sponsor-grid--3">
            <div className="sponsor-card">
              <h3 className="sponsor-card__title">Хаб ( Networking )</h3>
              <p className="sponsor-card__text">
                Вы получаете доступ к закрытому сообществу и профильным экспертам и инвесторам.
              </p>
            </div>
            <div className="sponsor-card">
              <h3 className="sponsor-card__title">Витрина ( Showroom )</h3>
              <p className="sponsor-card__text">
                Вы показываете продукт реальному трафику на Тверской.
              </p>
            </div>
            <div className="sponsor-card">
              <h3 className="sponsor-card__title">Полигон ( Testbed )</h3>
              <p className="sponsor-card__text">
                Вы тестируете гипотезы и собираете обратную связь от пользователей.
              </p>
            </div>
          </div>
        </section>

        {/* ЭКОНОМИКА ПАРТНЁРСТВА */}
        <section className="sponsor-section sponsor-section--economics sponsor-section--1300" id="economics">
          <div className="sponsor-section__header">
            <h2 className="sponsor-section__title">Экономика партнерства <span className="sponsor-hero__title-accent">(Ценность ROI)</span></h2>
          </div>

          <div className="sponsor-grid sponsor-grid--economics">
            <div className="economics-item">
              <div className="economics-number">100 <span className="economics-unit">млн ₽</span></div>
              <div className="economics-label">Рыночная стоимость</div>
              <p className="economics-text">
                Аналогичный набор активов (Наружная реклама на Тверской + Стенд и Спикерство в Манеже + Федеральный PR)
              </p>
            </div>

            <div className="economics-item economics-item--advantage">
              <div className="economics-number">30 <span className="economics-unit">млн ₽</span></div>
              <div className="economics-label">Ваше преимущество</div>
              <p className="economics-text">
                Цена входа сейчас - скидка 70%. Партнеры-основатели на этапе запуска
              </p>
            </div>

            <div className="economics-item">
              <div className="economics-number">+40%</div>
              <div className="economics-label">Рост стоимости</div>
              <p className="economics-text">
                После открытия (26 февраля 2026) стоимость контрактов будет пересмотрена
              </p>
            </div>
          </div>

          <div className="sponsor-cta-group economics-cta">
            <Link href="#tiers" className="sponsor-cta sponsor-cta--primary sponsor-cta--large">
              Забронировать место по пре-цене
            </Link>
            <p className="sponsor-cta-group__note">
              Лимитированные слоты для основателей
            </p>
          </div>
        </section>

        {/* СТРАТЕГИЧЕСКОЕ ПАРТНЕРСТВО - УЛУЧШЕННАЯ СЕКЦИЯ */}
<section className="sponsor-section sponsor-section--partnership sponsor-section--1300" id="partnership">
  <div className="partnership-container">
    {/* ГЛАВНЫЙ ЗАГОЛОВОК */}
    <div className="partnership-header">
      <h2 className="partnership-title">
        TECHSPACE MOSCOW
        <span className="partnership-accent">СТРАТЕГИЧЕСКОЕ ПАРТНЕРСТВО 2026</span>
      </h2>
      <p className="partnership-subtitle">
        Интеграция бренда в Акселерационный выставочный комплекс в самом сердце столицы
      </p>
    </div>

    {/* PROBLEM-SOLUTION БЛОК */}
    <div className="partnership-problem-solution">
      <div className="problem-solution-card">
        <div className="ps-header">
          <h3 className="ps-title">ДОМИНИРОВАНИЕ В ЦЕНТРЕ МОСКВЫ</h3>
        </div>
        
        <div className="ps-content">
          <div className="ps-item">
            <span className="ps-label">Контекст</span>
            <p className="ps-text">
              Тверская 9 — локация с трафиком <strong>500 000+</strong> целевых посетителей в год 
              и <strong>3млн+</strong> визуальных контактов ежемесячно. 500м от Кремля.
            </p>
          </div>

          <div className="ps-item ps-item--problem">
            <span className="ps-label ps-label--problem">Проблема</span>
            <p className="ps-text">
              В историческом центре запрещена статичная наружная реклама. Бренды не могут заявить о себе.
            </p>
          </div>

          <div className="ps-item ps-item--solution">
            <span className="ps-label ps-label--solution">Решение</span>
            <p className="ps-text">
              Techspace управляет <strong>единственным легальным программируемым медиафасадом</strong> 
              на "Золотой миле" (<strong>12 витрин</strong>).
            </p>
          </div>
        </div>
      </div>

      {/* ПРЕДЛОЖЕНИЕ */}
      <div className="partnership-offer">
        <div className="offer-card">
          <h3 className="offer-title">Предложение</h3>
          <p className="offer-text">
            Не покупка рекламного времени, а <strong>стратегическое партнерство</strong>, 
            интегрирующее бренд в архитектуру города и федеральную технологическую повестку.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* СИСТЕМА GATEKEEPER */}
        <section className="sponsor-section sponsor-section--1300" id="gatekeeper">
          <div className="sponsor-section__header">
            <h2 className="sponsor-section__title">Доступ к рекламному инвентарю</h2>
            <p className="sponsor-section__subtitle sponsor-section__subtitle--accent">
              <strong>Система "Gatekeeper"</strong> — уникальное преимущество держателей годовых пакетов
            </p>
          </div>

          <div className="sponsor-grid sponsor-grid--2">
            <div className="sponsor-card sponsor-card--feature">
              <div className="feature-lock">
                {/* <span className="feature-lock__icon">🔒</span> */}
                <h3 className="feature-lock__title">Правило Gatekeeper</h3>
              </div>
              <p className="sponsor-card__text sponsor-card__text--large">
                Внешние бренды <strong>не могут купить рекламу на фасаде "с улицы"</strong>. Доступ к инвентарю имеют <strong>только держатели годовых пакетов</strong>.
              </p>
            </div>

            <div className="sponsor-card sponsor-card--feature">
              <div className="feature-marketplace">
                {/* <span className="feature-marketplace__icon">🛒</span> */}
                <h3 className="feature-marketplace__title">Закрытый маркетплейс</h3>
              </div>
              <p className="sponsor-card__text sponsor-card__text--large">
                Партнеры могут докупать дополнительные слоты (Spot Buys) для поддержки своих запусков:
              </p>
              <ul className="feature-list">
                <li><strong>Pulse (10 секунд)</strong> — короткие вспышки для анонсов</li>
                <li><strong>Store (30 секунд)</strong> — стандартные рекламные ролики</li>
                <li><strong>Takeover (24 часа)</strong> — полное доминирование экрана</li>
              </ul>
            </div>
          </div>

          <div className="sponsor-grid sponsor-grid--1">
            <div className="sponsor-card sponsor-card--protocol">
              <div className="feature-protocol">
                {/* <span className="feature-protocol__icon">🖥️</span> */}
                <h3 className="feature-protocol__title">Протокол Чистого Экрана</h3>
              </div>
              <p className="sponsor-card__text sponsor-card__text--large">
                В момент платного показа <strong>Футер (нижняя плашка с логотипами) полностью скрывается</strong>, отдавая бренду <strong>100% площади экрана</strong> для максимального воздействия.
              </p>
            </div>
          </div>

          <div className="sponsor-cta-group">
            <Link href="#tiers" className="sponsor-cta sponsor-cta--primary sponsor-cta--large">
              Получить доступ к инвентарю
            </Link>
            <p className="sponsor-cta-group__note">
              Эксклюзивно для держателей пакетов Титан, Медиум, Смолл
            </p>
          </div>
        </section>

        {/* ПАКЕТЫ ПАРТНЁРСТВА */}
        <section className="sponsor-section sponsor-section--inverse" id="tiers">
          <div className="sponsor-section__header">
            <h2 className="sponsor-section__title">Пакеты партнёрства 2026</h2>
            <p className="sponsor-section__subtitle">
              Три уровня участия с чёткой иерархией, эксклюзивностью и гарантированной отдачей
            </p>
          </div>

          <div className="sponsor-grid sponsor-grid--3">
            {/* ТИТАН Tier 1 */}
            <div className="sponsor-tier sponsor-tier--titan">
              <p className="sponsor-tier__badge sponsor-tier__badge--premium">🏆 Генеральный партнёр</p>
              <h3 className="sponsor-tier__title">Пакет "Титан" (Tier 1)</h3>
              <div className="sponsor-tier__price">30 000 000 ₽/год</div>
              <div className="sponsor-tier__limit">Лимит: <strong>2 партнёра</strong></div>

              <ul className="sponsor-tier__list">
                <li><strong>Федеральный PR (20 февраля):</strong> Включение бренда в заголовок официального пресс-релиза ТАСС об открытии хаба</li>
                <li><strong>Медиа-фасад (24/7):</strong> Футер: Логотип заблокирован в центральной позиции на всех окнах (поверх любого контента). Гарантированный слот: 30-секундный полноэкранный ролик каждые 10 минут (Футер скрывается)</li>
                <li><strong>Манеж (25 ноября):</strong> Эксклюзивный стенд 50 м² ("Компактный остров"). Статус Keynote-спикера на церемонии открытия</li>
                <li><strong>Эксклюзив:</strong> Блокировка товарной категории (конкуренты не смогут стать партнёрами)</li>
              </ul>

              <Link href="#contact" className="sponsor-cta sponsor-cta--primary sponsor-cta--full">
                Стать Титаном
              </Link>
            </div>

            {/* МЕДИУМ Tier 2 */}
            <div className="sponsor-tier sponsor-tier--medium">
              <p className="sponsor-tier__badge sponsor-tier__badge--recommended">⭐ Стратегический партнёр</p>
              <h3 className="sponsor-tier__title">Пакет "Медиум" (Tier 2)</h3>
              <div className="sponsor-tier__price">20 000 000 ₽/год</div>
              <div className="sponsor-tier__limit">Лимит: <strong>4 партнёра</strong></div>

              <ul className="sponsor-tier__list">
                <li><strong>Манеж (25 ноября):</strong> Стенд 25 м² ("Якорный угол") в зоне высокого трафика, участие в панельной дискуссии</li>
                <li><strong>Медиа-фасад:</strong> Футер: Вторичная позиция логотипа (слева/справа) с постоянной видимостью. Гарантированный слот: 15-секундный полноэкранный ролик каждые 10 минут</li>
                <li><strong>Присутствие в хабе:</strong> Возможность брендирования зоны Акселератора (20 м²) на 3-м этаже в профильные недели</li>
              </ul>

              <Link href="#contact" className="sponsor-cta sponsor-cta--primary sponsor-cta--full">
                Выбрать Медиум
              </Link>
            </div>

            {/* СМОЛЛ Tier 3 */}
            <div className="sponsor-tier">
              <p className="sponsor-tier__badge">⚡ Инновационный партнёр</p>
              <h3 className="sponsor-tier__title">Пакет "Смолл" (Tier 3)</h3>
              <div className="sponsor-tier__price">10 000 000 ₽/год</div>
              <div className="sponsor-tier__limit">Лимит: <strong>6 партнёров</strong></div>

              <ul className="sponsor-tier__list">
                <li><strong>Манеж (25 ноября):</strong> Стенд 10 м² ("Стандарт") в инновационном ряду</li>
                <li><strong>Медиа-фасад:</strong> Футер: Логотип в нижней полосе (третичная позиция). Гарантированный слот: 10-секундный полноэкранный ролик каждые 10 минут</li>
                <li><strong>Статус:</strong> Официальное упоминание как Инновационного партнёра на сайте и в материалах</li>
              </ul>

              <Link href="#contact" className="sponsor-cta sponsor-cta--primary sponsor-cta--full">
                Подробнее
              </Link>
            </div>
          </div>
        </section>

        {/* КОНТАКТ / CTA */}
        <section className="sponsor-section sponsor-section--1300" id="contact">
          <div className="sponsor-contact sponsor-contact--modern">
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

            <form className="sponsor-contact__form sponsor-contact__form--modern">
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

              <button type="submit" className="sponsor-cta sponsor-cta--primary sponsor-cta--full sponsor-cta--modern">
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
