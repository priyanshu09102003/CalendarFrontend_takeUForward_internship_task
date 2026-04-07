'use client';

import React from 'react';
import '../globals.css'
import { useCalendarState } from '../hooks/useCalendarState';
import CalendarNav from './calendarNav';

export default function CalendarPage() {
  const { navigation } = useCalendarState();
  const { year, goNext, goPrev } = navigation;

  return (
    <div className="cal-shell">
      <div className="cal-card-wrapper">

        {/* It will remain at the top of the calendar to navigate from one month to another */}
        <CalendarNav year={year} onPrev={goPrev} onNext={goNext} />


      </div>
    </div>
  );
}