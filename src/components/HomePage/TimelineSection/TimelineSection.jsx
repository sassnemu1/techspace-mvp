"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import './TimelineSection.css';

export default function TimelineSection({ 
  id = "timeline-section",
  label = "Календарь событий",
  title = "Выставки 2026",
  subtitle = "Исследуйте наши предстоящие выставки и культурные события",
  exhibitions = []
}) {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!exhibitions || exhibitions.length === 0) return null;

  return (
    <section ref={sectionRef} id={id} className="timeline-section">
      <div className="timeline-container">
        <div className="timeline-header">
          {label && <span className="timeline-label">{label}</span>}
          {title && <h2 className="timeline-title">{title}</h2>}
          {subtitle && <p className="timeline-subtitle">{subtitle}</p>}
        </div>

        <div className="timeline-progress"></div>

        <div className="timeline-list">
          {exhibitions.map((exhibition, index) => (
            <div 
              key={exhibition.id || index}
              className={`timeline-item ${index % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`}
            >
              <div className="timeline-date">
                <span className="timeline-date-text">{exhibition.dates}</span>
                {exhibition.year && <span className="timeline-year">{exhibition.year}</span>}
              </div>

              <div className="timeline-dot">
                <div className="timeline-dot-inner"></div>
                <div className="timeline-dot-pulse"></div>
              </div>

              <div className="timeline-card">
                <div className="timeline-card-background">
                  {exhibition.image 
                    ? <img src={exhibition.image} alt={exhibition.title} className="timeline-card-bg-image" /> 
                    : <div className="timeline-card-bg-placeholder"></div>}
                  <div className="timeline-card-bg-overlay"></div>
                </div>

                <div className="timeline-content">
                  <h3 className="timeline-card-title">{exhibition.title}</h3>
                  {exhibition.description && <p className="timeline-card-description">{exhibition.description}</p>}
                  {exhibition.link && (
                    <Link href={exhibition.link} className="timeline-card-button" target="_blank">
                      Подробнее
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
