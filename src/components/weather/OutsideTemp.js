import { useCallback, useEffect, useState } from 'react';
import styles from './OutsideTemp.module.css'

export const OutsideTemp = ({ zip = "20871" }) => {
  const [tempF, setTempF] = useState(null);
  const [error, setError] = useState(null);

  const fetchTemp = useCallback(async () => {
    try {
      const geoRes = await fetch(`https://api.zippopotam.us/us/${zip}`);
      const geoData = await geoRes.json();
      const { latitude, longitude } = geoData.places[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();
      const tempC = weatherData.current_weather.temperature;

      setTempF((tempC * 9) / 5 + 32);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Couldn't get temperature.");
    }
  }, [zip]);

  useEffect(() => {
    fetchTemp();

    const interval = setInterval(fetchTemp, 300000);

    return () => clearInterval(interval);
  }, [fetchTemp]);

  return (
    <div className={styles.OutsideTemp}>
      {error ? error : tempF !== null ? `${tempF.toFixed(1)}°F @${zip}` : 'Loading...'}
    </div>
  );
};
