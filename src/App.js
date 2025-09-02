
import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { OutsideTemp } from './components/weather/OutsideTemp';
import { SliderBtn } from './components/custom-buttons/SliderBtn';
import { CalendarBtn } from './components/custom-buttons/CalendarBtn';
import { FanBtn } from './components/custom-buttons/FanBtn';
import { ACBtn } from './components/custom-buttons/ACBtn';
import { HeatStageOneBtn } from './components/custom-buttons/HeatStageOneBtn';
import { HeatStageTwoBtn } from './components/custom-buttons/HeatStageTwoBtn';
import { IncrementTempBTN } from './components/custom-buttons/IncrementTempBTN';
import { DecrementTempBTN } from './components/custom-buttons/DecrementTempBTN';
import {RaspberryPiIcon } from './icons/icons';

import { useTheme } from './context-api/MainProvider';
import { HomeData } from './components/home-info/HomeData';
import { Spinner } from './components/loaders/Spinner';

import socket from './components/socketIO/socket';

function App() {
  const [tempWasSet, updateTempWasSet] = useState(false)
  const {tempData, setData, setTempData, setSystemStates, loading, clientSetTemp} = useTheme()


    useEffect(() => {
    // Handler for 'connect'
    const handleConnect = () => {
      console.log('Connected to server:', socket.id);
    };

    // Handler for 'settings'
    const handleSettings = (settings) => {
      console.log('settings from socket : ', settings);
      setData(settings);
    };

    // Handler for 'temp-settings'
    const handleTempSettings = (tempSettings) => {
      // This `tempWasSet` here will be the *latest* value from the current render.
      // Because `tempWasSet` is in the dependency array, this effect will re-run
      // when `tempWasSet` changes, thus registering a new `handleTempSettings` function
      // that closes over the fresh `tempWasSet` value, and cleaning up the old one.
      if (!tempWasSet) {
        setTempData(tempSettings);
        updateTempWasSet(true); // This causes a re-render and re-execution of useEffect
      } else {
        // Ensure tempData is fresh here if it's needed for the newTempSettings calculation.
        // If tempData might be stale, use the functional update form of setTempData
        // or ensure it's in the dependency array if you don't mind re-registering.
        console.log('temp setting were updated ', tempSettings)

        if(tempData.setTemp !== tempSettings.setTemp)
        {
          setTempData(tempSettings);
        }else{
          const newTempSettings = 
          {
            humidity: tempSettings.humidity,
            setTemp: tempData.setTemp, // tempData should be fresh here if it's a dependency
            temp: tempSettings.temp,
          };
          setTempData(newTempSettings);
        }
      }
    };

    const handleStateSettings =(stateSettings) =>{
      console.log('system-state-settings: ', stateSettings);
      setSystemStates(stateSettings)
    }

    // Register event listeners
    socket.on('connect', handleConnect);
    socket.on('settings', handleSettings);
    socket.on('temp-settings', handleTempSettings);
    socket.on('currentSystemState', handleStateSettings);

    // Cleanup function: This runs when the component unmounts OR when dependencies change
    return () => {
      console.log('Cleaning up socket listeners...');
      socket.off('connect', handleConnect);
      socket.off('settings', handleSettings);
      socket.off('temp-settings', handleTempSettings); // CRUCIAL: Add this cleanup
      socket.off('currentSystemState', handleStateSettings);
    };
  }, [setData, setTempData, tempData, tempWasSet, setSystemStates]); // Ensure all dependencies are here

  return (
    <div className={styles.App}>
      <div className={styles.wrapper}>

        <div className={styles.wrapper_2}>
          <div className={styles.top_holder}>
            <div className={styles.left_holder}>
              <OutsideTemp/>
            </div>

            <div className={styles.center_icon__holder}>
              <RaspberryPiIcon width={50} height={50} />
            </div>

            <div className={styles.right_holder}>
              <SliderBtn/>
            </div>  
          </div>
          
          
          <div className={styles.center_holder}>
            <div className={styles.left_holder}>
              <HomeData />
            </div>
  
            <div className={styles.center_icon__holder}>
              <div className={styles.temp_holder}>
                {
                  loading ? <Spinner /> :
                  <>
                    <p className={styles.temp}>
                      {tempData !== null ? tempData.setTemp : '...'}°
                    </p>
                  </>
                }
              </div>
              <div className={styles.height_bump}>
                <h1>{clientSetTemp ? `${clientSetTemp}°`: ''}</h1>
              </div>
            </div>
  
            <div className={styles.right_holder}>
              <CalendarBtn />
              <HeatStageTwoBtn />
            </div>
          </div>  
        </div>
        
        <div className={styles.buttons_holder}>
          <DecrementTempBTN />
          <IncrementTempBTN />
          <FanBtn />
          <ACBtn />
          <HeatStageOneBtn />
        </div>
      </div>
    </div>
  );
}

export default App;
