import { useState, useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import {
  toKey, todayKey, normaliseRange, getDaysInMonth, getFirstDOW,
} from '../utils/dateUtils';

export function useCalendarState(){

    //Navigation - Helps in the navigation/flipping between months and pages and years
    const now = new Date();
    const[year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
 
    const [flipDir,    setFlipDir]    = useState(null);
    const [isFlipping, setIsFlipping] = useState(false);

    const navigate = useCallback((dir) => {
        if (isFlipping) return;
        setFlipDir(dir);
        setIsFlipping(true);
        playFlipSound();
    
        setTimeout(() => {
        setMonth((m) => {
            const next = m + (dir === 'next' ? 1 : -1);
            if (next > 11) { setYear((y) => y + 1); return 0; }
            if (next < 0)  { setYear((y) => y - 1); return 11; }
            return next;
        });
        setTimeout(() => { setIsFlipping(false); setFlipDir(null); }, 380);
        }, 340);
    }, [isFlipping]);
    
    const goNext = useCallback(() => navigate('next'), [navigate]);
    const goPrev = useCallback(() => navigate('prev'), [navigate]);

}