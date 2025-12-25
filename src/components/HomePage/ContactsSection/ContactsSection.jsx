import './ContactsSection.css'

export default function ContactsSection({ id = "contacts-section" }) {
  return (
    <section id={id} className="contacts-section">
      <div className="contacts-container">
        <div className="contacts-header">
          <div className="contacts-badge">
            <span className="contacts-badge-dot" />
            <span>FOR THE KONTACTS PAGE</span>
          </div>

          <h2 className="contacts-title">
            ПРИСОЕДИНЯЙТЕСЬ К ЭКОСИСТЕМЕ
          </h2>

          <p className="contacts-subtitle">
            Ядро лидерства Techspace и ключевые точки входа.
          </p>
        </div>

        <div className="contacts-grid">
          {/* Ядро лидерства */}
          <div className="contacts-column">
            <h3 className="contacts-column-title">Ядро лидерства</h3>

            <div className="contacts-person">
              <div className="contacts-person-header">
                <span className="contacts-person-name">ЯРОСЛАВ КИСЕЛЕВ</span>
                <span className="contacts-person-role">CEO &amp; Founder</span>
              </div>
              <p className="contacts-person-focus">
                Фокус: Стратегия и общее руководство.
              </p>
              <a
                href="mailto:ceo@techspace.moscow"
                className="contacts-person-email"
              >
                ceo@techspace.moscow
              </a>
            </div>

            <div className="contacts-person">
              <div className="contacts-person-header">
                <span className="contacts-person-name">МАРКИН ДМИТРИЙ</span>
                <span className="contacts-person-role">
                  Creative Director &amp; Partnerships
                </span>
              </div>
              <p className="contacts-person-focus">
                Фокус: Спонсорство (Титаны), GR и акселераторы.
              </p>
              <a
                href="mailto:partners@techspace.moscow"
                className="contacts-person-email"
              >
                partners@techspace.moscow
              </a>
            </div>

            <div className="contacts-person">
              <div className="contacts-person-header">
                <span className="contacts-person-name">ТИМУР</span>
                <span className="contacts-person-role">Director of Sales</span>
              </div>
              <p className="contacts-person-focus">
                Фокус: Бронирование участников, аренда стендов и коммерческие запросы.
              </p>
              <a
                href="mailto:sales@techspace.moscow"
                className="contacts-person-email"
              >
                sales@techspace.moscow
              </a>
            </div>

            <div className="contacts-person">
              <div className="contacts-person-header">
                <span className="contacts-person-name">ВЛАДИСЛАВ</span>
                <span className="contacts-person-role">
                  Head of Brand &amp; Media
                </span>
              </div>
              <p className="contacts-person-focus">
                Фокус: PR, комьюнити, пресса и медиа‑студия.
              </p>
              <a
                href="mailto:media@techspace.moscow"
                className="contacts-person-email"
              >
                media@techspace.moscow
              </a>
            </div>
          </div>

          {/* Общие каналы */}
          <div className="contacts-column contacts-column--secondary">
            <h3 className="contacts-column-title">Общие каналы</h3>

            <div className="contacts-block">
              <div className="contacts-block-label">Web</div>
              <a
                href="https://techspace.moscow"
                target="_blank"
                rel="noreferrer"
                className="contacts-block-value"
              >
                techspace.moscow
              </a>
            </div>

            <div className="contacts-block">
              <div className="contacts-block-label">Адрес</div>
              <div className="contacts-block-value">
                ул. Тверская, 9
              </div>
            </div>

            <div className="contacts-block">
              <div className="contacts-block-label">Telegram</div>
              <a
                href="https://t.me/techspace_official"
                target="_blank"
                rel="noreferrer"
                className="contacts-block-value"
              >
                @techspace_official
              </a>
            </div>

            <div className="contacts-quote">
              «Будущее не ждет. И вы не должны.»
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
