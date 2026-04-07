import React from 'react';
import DayCell from './dayCell';
import { DAYS_SHORT } from '../utils/constants';
import { toKey } from '../utils/dateUtils';


export default function CalendarGrid({
  year,
  month,
  daysInMonth,
  firstDOW,
  prevMonthLen,
  todayKey,
  startKey,
  endKey,
  dateNoteKeys,
  onDayClick,
  onDayDoubleClick,
}) {
  // Total cells rounded up to complete the last week row
  const totalCells = Math.ceil((firstDOW + daysInMonth) / 7) * 7;

  // Pre-compute neighbour month values
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear  = month === 0 ? year - 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear  = month === 11 ? year + 1 : year;

  const cells = [];

  for (let i = 0; i < totalCells; i++) {
    let day, cellYear, cellMonth, isOther;

    if (i < firstDOW) {
      // Leading fill
      day       = prevMonthLen - firstDOW + i + 1;
      cellYear  = prevYear;
      cellMonth = prevMonth;
      isOther   = true;
    } else if (i >= firstDOW + daysInMonth) {
      // Trailing fill 
      day       = i - firstDOW - daysInMonth + 1;
      cellYear  = nextYear;
      cellMonth = nextMonth;
      isOther   = true;
    } else {
      day       = i - firstDOW + 1;
      cellYear  = year;
      cellMonth = month;
      isOther   = false;
    }

    const key       = toKey(cellYear, cellMonth, day);
    const dow       = i % 7; // As we wre taking here 0 = Monday, 6 = Sunday (0 based indexed array of days)
    const isWeekend = dow === 5 || dow === 6;
    const isToday   = !isOther && key === todayKey;
    const isStart   = !isOther && key === startKey;
    const isEnd     = !isOther && key === endKey;
    const isInRange = !isOther && !!startKey && !!endKey && key > startKey && key < endKey;
    const hasNote   = !isOther && dateNoteKeys.has(key);

    cells.push(
      <DayCell
        key={`${key}-${i}`}
        dateKey={key}
        day={day}
        isOther={isOther}
        isToday={isToday}
        isWeekend={isWeekend}
        isStart={isStart}
        isEnd={isEnd}
        isInRange={isInRange}
        hasNote={hasNote}
        onClick={onDayClick}
        onDoubleClick={onDayDoubleClick}
      />
    );
  }

  return (
    <section className="cal-grid-section" aria-label="Calendar dates">

      {/* Day-of-week header */}
      <div className="dow-header" role="row" aria-label="Days of week">
        {DAYS_SHORT.map((label, i) => (
          <div
            key={label}
            className={`dow-header__cell${i >= 5 ? ' is-weekend' : ''}`}
            role="columnheader"
            aria-label={label}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Date cells grid */}
      <div
        className="days-grid"
        role="grid"
        aria-label="Calendar days"
      >
        {cells}
      </div>
    </section>
  );
}