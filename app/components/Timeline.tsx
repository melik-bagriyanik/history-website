'use client';

import React, { useState } from 'react';
import styles from './Timeline.module.css';

interface TimelineProps {
  onCenturyChange: (century: number) => void;
  selectedCentury: number;
}

export default function Timeline({ onCenturyChange, selectedCentury }: TimelineProps) {
  // Generate array of centuries from -30 to 21
  const centuries = Array.from({ length: 52 }, (_, i) => i - 30);
  
  // Format century for display
  const formatCentury = (century: number) => {
    const absYear = Math.abs(century);
    if (century < 0) {
      return `${absYear}. yüzyıl MÖ`;
    } else {
      return `${absYear}. yüzyıl`;
    }
  };

  // Format year range for the selected century
  const formatYearRange = (century: number) => {
    const startYear = century * 100;
    const endYear = startYear + 99;
    if (century < 0) {
      return `MÖ ${Math.abs(endYear)} - MÖ ${Math.abs(startYear)}`;
    } else {
      return `${startYear} - ${endYear}`;
    }
  };

  // Handle previous century button click
  const handlePrevCentury = () => {
    if (selectedCentury > -30) {
      onCenturyChange(selectedCentury - 1);
    }
  };

  // Handle next century button click
  const handleNextCentury = () => {
    if (selectedCentury < 21) {
      onCenturyChange(selectedCentury + 1);
    }
  };

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineHeader}>
        <button 
          onClick={handlePrevCentury}
          disabled={selectedCentury <= -30}
          className={styles.navigationButton}
        >
          &#8592; Önceki Yüzyıl
        </button>
        <div className={styles.timelineInfo}>
          <h2>{formatCentury(selectedCentury)}</h2>
          <p>{formatYearRange(selectedCentury)}</p>
        </div>
        <button 
          onClick={handleNextCentury}
          disabled={selectedCentury >= 21}
          className={styles.navigationButton}
        >
          Sonraki Yüzyıl &#8594;
        </button>
      </div>
      <div className={styles.timelineTrack}>
        <input
          type="range"
          min={-30}
          max={21}
          value={selectedCentury}
          onChange={(e) => onCenturyChange(Number(e.target.value))}
          className={styles.timelineSlider}
        />
        <div className={styles.centuryMarkers}>
          {centuries.filter((_, i) => i % 5 === 0).map((century) => (
            <div 
              key={century}
              className={styles.centuryMarker}
              style={{ 
                left: `${((century + 30) / 51) * 100}%`,
                fontWeight: century === selectedCentury ? 'bold' : 'normal'
              }}
            >
              {century < 0 ? `${Math.abs(century)} MÖ` : century}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 