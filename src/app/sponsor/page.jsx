'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';

import './sponsor.css';
import '../become-sponsor/become-sponsore.css';

gsap.registerPlugin();

const Footer = dynamic(() => import('@/components/Footer/Footer'), {
  loading: () => null,
  ssr: true
});

const sponsorsData = [
  { name: 'Яндекс', logo: '/assets/logos/yandex.png', tier: 'title', year: 2025 },
  { name: 'Сбер', logo: '/assets/logos/sber.png', tier: 'official', year: 2025 },
  { name: 'VK', logo: '/assets/logos/vk.png', tier: 'sprint', year: 2025 },
  { name: 'Ростелеком', logo: '/assets/logos/rostel.png', tier: 'title', year: 2025 },
  { name: 'Газпромбанк', logo: '/assets/logos/gazprom.svg', tier: 'official', year: 2025 },
  { name: 'МТС', logo: '/assets/logos/mts.svg', tier: 'sprint', year: 2025 },
];

export default function SponsorsPage() {
  const cardsRef = useRef([]);

  const handleMouseEnter = useCallback((card) => {
    gsap.to(card, { scale: 1.05, rotateY: 10, duration: 0.3, ease: "power2.out" });
    const logo = card.querySelector('.sponsor-logo');
    if (logo) gsap.to(logo, { scale: 1.15, duration: 0.3, ease: "back.out(1.7)" });
  }, []);

  const handleMouseLeave = useCallback((card) => {
    gsap.to(card, { scale: 1, rotateY: 0, duration: 0.3, ease: "power2.out" });
    const logo = card.querySelector('.sponsor-logo');
    if (logo) gsap.to(logo, { scale: 1, duration: 0.3 });
  }, []);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    cards.forEach((card) => {
      card._mouseenterHandler = () => handleMouseEnter(card);
      card._mouseleaveHandler = () => handleMouseLeave(card);
      card.addEventListener('mouseenter', card._mouseenterHandler);
      card.addEventListener('mouseleave', card._mouseleaveHandler);
    });
    return () => {
      cardsRef.current.forEach((card) => {
        if (card && card._mouseenterHandler) {
          card.removeEventListener('mouseenter', card._mouseenterHandler);
          card.removeEventListener('mouseleave', card._mouseleaveHandler);
        }
      });
    };
  }, [handleMouseEnter, handleMouseLeave]);

  return (
    <>
      <section className="sponsor-page">
        {/* 🔥 TITLE ПЕРЕД СТАТИСТИКОЙ */}
        <div className="sponsors-title-section">
          <h1 className="sponsors-main-title">Наши Спонсоры</h1>
          
          {/* ✅ ПРОСТАЯ СТАТИСТИКА */}
          <div className="sponsors-stats">
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">Партнёров</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3</div>
              <div className="stat-label">Сезона</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">150+</div>
              <div className="stat-label">Интеграций</div>
            </div>
          </div>
        </div>

        {/* СПОНСОРЫ - убрали дублирующийся заголовок */}
        <section className="sponsor-section" id="sponsors">
          <div className="sponsor-grid sponsor-grid--3">
            {sponsorsData.map((sponsor, i) => (
              <div key={sponsor.name} className="sponsor-card" ref={el => cardsRef.current[i] = el}>
                <div className="sponsor-logo-container">
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    className="sponsor-logo"
                  />
                </div>
                <h3 className="sponsor-card__title">{sponsor.name}</h3>
                <p className="sponsor-card__text">
                  {sponsor.tier === 'title' ? 'Title-партнёр' : 
                   sponsor.tier === 'official' ? 'Официальный спонсор' : 'Партнёр спринта'}
                  <br />
                  <span className="sponsor-year">{sponsor.year}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="sponsor-section">
          <div className="sponsor-contact">
            <div className="sponsor-contact__text">
              <h2 className="sponsor-section__title">Стать спонсором Techspace</h2>
            </div>
            <Link href="/become-sponsor" className="sponsor-cta sponsor-cta--primary sponsor-cta--full">
              Стать спонсором
            </Link>
          </div>
        </section>
      </section>

      <Footer />
    </>
  );
}
