import React, { useEffect, useState } from 'react';
import styles from './MissedTimer.module.css';

const MissedTimer = ({handleTimeDuration , selectedTime={selectedTime}}) => {
    // console.log("selectedTime" , selectedTime)
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (selectedTime && selectedTime.hours !== null) setHours(selectedTime.hours);
    if (selectedTime && selectedTime.minutes !== null) setMinutes(selectedTime.minutes);
    if (selectedTime && selectedTime.seconds !== null) setSeconds(selectedTime.seconds);
  }, [selectedTime]);

  const pad = (val) => String(val).padStart(2, '0');

  const handleChange = (unit, increment) => {
    if (unit === 'hours') {
      setHours((prev) => (prev + increment + 13) % 13);
    } else if (unit === 'minutes') {
      setMinutes((prev) => (prev + increment + 60) % 60);
    } else {
      setSeconds((prev) => (prev + increment + 60) % 60);
    }
  };

  const handleKey = (e, unit) => {
    if (e.key === 'ArrowUp') handleChange(unit, 1);
    if (e.key === 'ArrowDown') handleChange(unit, -1);
  };

  return (
    <div className={styles.container}>
      <p className={styles.label}>Missed chat timer</p>
      <div className={styles.picker}>
        {/* Hours */}
        <div className={styles.column}>
          <div className={styles.faded}>{pad((hours + 12) % 13)}</div>
          <input
            className={styles.input}
            value={pad(hours)}
            onKeyDown={(e) => handleKey(e, 'hours')}
            readOnly
          />
          <div className={styles.faded}>{pad((hours + 1) % 13)}</div>
        </div>

        <div className={styles.separator}>:</div>

        {/* Minutes */}
        <div className={styles.column}>
          <div className={styles.faded}>{pad((minutes + 59) % 60)}</div>
          <input
            className={styles.input}
            value={pad(minutes)}
            onKeyDown={(e) => handleKey(e, 'minutes')}
            readOnly
          />
          <div className={styles.faded}>{pad((minutes + 1) % 60)}</div>
        </div>

        <div className={styles.separator}>:</div>

        {/* Seconds */}
        <div className={styles.column}>
          <div className={styles.faded}>{pad((seconds + 59) % 60)}</div>
          <input
            className={styles.input}
            value={pad(seconds)}
            onKeyDown={(e) => handleKey(e, 'seconds')}
            readOnly
          />
          <div className={styles.faded}>{pad((seconds + 1) % 60)}</div>
        </div>
      </div>

      <button className={styles.save} onClick={() => handleTimeDuration(hours , minutes , seconds)}>Save</button>
    </div>
  );
};

export default MissedTimer;
