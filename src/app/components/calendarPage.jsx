'use client';

import React, { useState, useEffect } from 'react';
import { getRingCount } from '../utils/constants';
import '../globals.css';
import { useCalendarState } from '../hooks/useCalendarState';
import CalendarNav  from './calendarNav';
import CalendarHero from './calendarHero';
import NotesPanel from './notesPanel';


export default function CalendarPage() {
  const { navigation,
        animation, 
        range,     
        monthNotes,
        dateNotes,
        computed,
    } = useCalendarState();


    const { year, month, goNext, goPrev } = navigation;  
    const { isFlipping, flipDir } = animation;
    const { startKey, endKey, selectDay, clearRange } = range;

    const flipClass = isFlipping ? `flip-out-${flipDir}` : '';
    const cardClass = ['cal-card'].join(' ');
    const wrapperFlipClass = ['cal-flip-wrapper', flipClass].filter(Boolean).join(' ');


    const [ringCount, setRingCount] = useState(getRingCount());

    useEffect(() => {
    const handle = () => setRingCount(getRingCount());
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
    }, []);

  return (
  <div className="cal-shell">
    <div className="cal-card-wrapper">

      <div className="cal-spiral" aria-hidden="true">
        {Array.from({ length: ringCount }, (_, i) => (
          <div key={i} className="cal-ring" />
        ))}
      </div>

      <div className={wrapperFlipClass}>
        <CalendarNav year={year} onPrev={goPrev} onNext={goNext} />
        <div className={cardClass} role="main" aria-label="Wall calendar">
          <CalendarHero year={year} month={month} />

          <div className="cal-body">

            {/* Side panel to take and mark notes */}
            <NotesPanel
                notes={monthNotes.list}
                onUpdate={monthNotes.updateNote}
                onToggleImportant={monthNotes.toggleImportant}
                onToggleDone={monthNotes.toggleDone}
                onAdd={monthNotes.addNote}
                onDelete={monthNotes.deleteNote}
                startKey={startKey}
                endKey={endKey}
                onClearRange={clearRange}
            />

          </div>
        </div>
      </div>

    </div>
  </div>
);
}