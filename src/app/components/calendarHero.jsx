import React from 'react';
import { MONTHS, MONTH_IMAGES } from '../utils/constants';


export default function CalendarHero({ year, month }) {
  const imgSrc    = MONTH_IMAGES[month];
  const monthName = MONTHS[month].toUpperCase();

  return (
    <div className="cal-hero" role="img" aria-label={`${MONTHS[month]} ${year}`}>

      {/* Background photo */}
      <img
        className="cal-hero__img"
        src={imgSrc}
        alt={`${MONTHS[month]} scenery`}
        loading="eager"
      />

      {/* Dark gradient overlay */}
      <div className="cal-hero__overlay" aria-hidden="true" />


      {/* Wave shape */}
      <svg
        className="cal-hero__wave"
        viewBox="0 0 900 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >

        {/* Blue wave */}
        <path
          d="M0 80 L0 40 Q220 0 450 28 Q680 56 900 18 L900 80 Z"
          fill="#1a9ed9"
        />

        {/* White wave layered above */}
        <path
          d="M0 80 L0 56 Q200 26 390 46 Q580 66 900 36 L900 80 Z"
          fill="white"
        />
      </svg>

      {/* Month + year badge (bottom-right) */}
      <div className="cal-hero__badge">
        <div className="cal-hero__year">{year}</div>
        <div className="cal-hero__month">{monthName}</div>
      </div>
    </div>
  );
}