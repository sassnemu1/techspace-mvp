import './AccessProtocolSection.css'

export default function AccessProtocolSection({ id = "access-protocol" }) {
  return (
    <section id={id} className="protocol-section">
      <div className="protocol-container">
        <div className="protocol-right">
          <div className="protocol-badge">
            <span className="protocol-badge-dot" />
            <span>Кураторский доступ · Только по отбору</span>
          </div>

          <h2 className="protocol-title">
            ПРОТОКОЛ ДОСТУПА
          </h2>

          <p className="protocol-subtitle">
            Путь на Тверскую 9 от цифровой заявки до онбординга.
          </p>

          <p className="protocol-intro">
            Мы придерживаемся строгой политики кураторства. Не каждый заявитель получает место
            на площадке: в Techspace попадают только команды, соответствующие по уровню
            инновационности, жизнеспособности и вкладу в Национальную Стратегию.
          </p>

          <div className="protocol-timeline">
            <div className="protocol-timeline-line" />

            <div className="protocol-steps">

              <div className="protocol-step">
                <div className="protocol-step-header">
                  <span className="protocol-step-tag">ШАГ 01</span>
                  <h3 className="protocol-step-title">ПОДАЧА ЗАЯВКИ</h3>
                </div>
                <p className="protocol-step-text">
                  Подача цифровой заявки через официальный портал Techspace. Формируется
                  единое досье проекта для оценки Экспертным Советом.
                </p>
                <ul className="protocol-step-list">
                  <li>Технические спецификации проекта.</li>
                  <li>Уровень готовности прототипа (TRL).</li>
                  <li>Портфолио и трек‑рекорд команды.</li>
                </ul>
              </div>

              <div className="protocol-step">
                <div className="protocol-step-header">
                  <span className="protocol-step-tag">ШАГ 02</span>
                  <h3 className="protocol-step-title">ЭКСПЕРТНАЯ ПРОВЕРКА</h3>
                </div>
                <p className="protocol-step-meta">Сроки рассмотрения: 3–7 дней.</p>
                <p className="protocol-step-text">
                  Внутренний Экспертный Совет анализирует заявку, архитектуру продукта
                  и бизнес‑модель.
                </p>
                <p className="protocol-step-text">
                  Критерий прост: мы отсеиваем «воздух». Нас интересуют работающие прототипы,
                  масштабируемый код и подтверждённая промышленная полезность.
                </p>
              </div>

              <div className="protocol-step">
                <div className="protocol-step-header">
                  <span className="protocol-step-tag">ШАГ 03</span>
                  <h3 className="protocol-step-title">АККРЕДИТАЦИЯ · «ЗОЛОТОЙ БИЛЕТ»</h3>
                </div>
                <p className="protocol-step-text">
                  Одобренные участники получают уникальный Цифровой ID (промо‑код) — персональный
                  ключ доступа в экосистему Techspace.
                </p>
                <p className="protocol-step-text">
                  Цифровой ID открывает бронирование инвентаря стендов и доступ к закрытому
                  разделу сайта с эксклюзивными ресурсами, методологиями и гайдами по интеграции.
                </p>
              </div>

              <div className="protocol-step">
                <div className="protocol-step-header">
                  <span className="protocol-step-tag">ШАГ 04</span>
                  <h3 className="protocol-step-title">ИНТЕГРАЦИЯ</h3>
                </div>
                <p className="protocol-step-text">
                  Подписание контракта и оплата закрепляют статус резидента Techspace.
                </p>
                <p className="protocol-step-text">
                  Команда проходит онбординг с дизайн‑отделом Techspace: концепция стенда
                  адаптируется под креативную политику «Стены. Пол. Потолок», чтобы ваш
                  продукт работал как часть общей экспозиционной машины.
                </p>
              </div>

              <div className="protocol-step protocol-step--accent">
                <h3 className="protocol-step-title">ФИНАЛЬНЫЙ ПРИНЦИП</h3>
                <p className="protocol-step-text">
                  «Фильтр строгий. Награда бесконечна». Путь на Тверскую 9 открыт только тем,
                  чьи технологии усиливают суверенную цифровую инфраструктуру страны.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
