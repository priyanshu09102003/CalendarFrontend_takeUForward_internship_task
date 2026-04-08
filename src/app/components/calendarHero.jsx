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

        {/* Thin white wave above */}
          <path
              d="M0 80 L0 34 Q220 0 450 28 Q680 56 900 18 L900 80 Z"
              fill="white"
            />
            
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#a8d8f0" />
            <stop offset="40%"  stopColor="#4a9ae4" />
            <stop offset="100%" stopColor="#0f5fa8" />
          </linearGradient>
          <filter id="waveShadow" x="0%" y="-20%" width="100%" height="150%">
            <feDropShadow dx="0" dy="-4" stdDeviation="5" floodColor="rgba(0,0,0,0.3)" />
          </filter>
        </defs>
        

        {/* Blue gradient wave */}
        <path
          d="M0 80 L0 40 Q220 0 450 28 Q680 56 900 8 L900 80 Z"
          fill="url(#waveGrad)"
        />

        {/* White wave to make the blue wave structure*/}
        <path
          d="M0 80 L0 56 Q200 26 390 46 Q580 66 900 36 L900 80 Z"
          fill="white"
          filter="url(#waveShadow)"
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