import React from 'react';
import { RING_COUNT } from '../utils/constants';

export default function CalendarNav({ year, onPrev, onNext }) {
  return (
    <>

    {/* Navigation between months */}
      <div className="cal-spiral" aria-hidden="true">
        {Array.from({ length: RING_COUNT }, (_, i) => (
          <div key={i} className="cal-ring" />
        ))}
      </div>

      <nav className="cal-nav" aria-label="Calendar navigation">
        <button className="cal-nav__btn" onClick={onPrev} aria-label="Previous month">
          ‹
        </button>

        <span className="cal-nav__title">{year} Calendar</span>

        <button className="cal-nav__btn" onClick={onNext} aria-label="Next month">
          ›
        </button>
      </nav>
    </>
  );
}