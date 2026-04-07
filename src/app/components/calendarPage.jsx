'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getRingCount } from '../utils/constants';
import '../globals.css';
import { useCalendarState } from '../hooks/useCalendarState';
import CalendarNav  from './calendarNav';
import CalendarHero from './calendarHero';
import NotesPanel from './notesPanel';
import CalendarGrid from './calendarGrid';
import CalendarLegend from './calendarLegend';


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
    const { todayKey, daysInMonth, firstDOW, prevMonthLen } = computed;

    const flipClass = isFlipping ? `flip-out-${flipDir}` : '';
    const cardClass = ['cal-card'].join(' ');
    const wrapperFlipClass = ['cal-flip-wrapper', flipClass].filter(Boolean).join(' ');


    // Open the modal for each date to take notes there or mark important stuffs
    const [modalDateKey, setModalDateKey] = useState(null);
    const openModal  = useCallback((key) => setModalDateKey(key), []);
    const closeModal = useCallback(() => setModalDateKey(null), []);


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

            {/* Main body of the calendar to show the grid of dates and handle their states */}
            <CalendarGrid
                year={year}
                month={month}
                daysInMonth={daysInMonth}
                firstDOW={firstDOW}
                prevMonthLen={prevMonthLen}
                todayKey={todayKey}
                startKey={startKey}
                endKey={endKey}
                dateNoteKeys={dateNotes.dateNoteKeys}
                onDayClick={selectDay}
                onDayDoubleClick={openModal}
            />

          </div>

          {/* CalendarLegend for better UX  */}
          <CalendarLegend />

          {/* ADDITIONAL - Adding modal that will open on double click to set notes/events for each day */}
        </div>
      </div>

    </div>
  </div>
);
}