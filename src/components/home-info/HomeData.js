import { useState, useEffect } from 'react';
import styles from './HomeData.module.css'
import {Home} from 'lucide-react';
import {useTheme} from '../../context-api/MainProvider'

export const HomeData =()=>{

    const {tempData, systemStates} = useTheme()

    const [iconSize, setIconSize] = useState(40); // Default icon size

    useEffect(() => {
        const handleResize = () => {
        if (window.innerWidth < 750) {
            setIconSize(20); // Adjust size for smaller screens
        } else {
            setIconSize(40); // Default size for larger screens
        }
        };

        // Initial call to set the icon size on mount
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    const CurStatusSetting = () =>{
 
        if(systemStates !== null)
        {
            if(systemStates.AC === 'ON')
            {
                return <p className={styles.margin_none}>{'AC: ' + systemStates.AC}</p>
            }
            if(systemStates.Heat_1 === 'ON')
            {
                return <p className={styles.margin_none}>{'Heat: ' + systemStates.Heat_1}</p>
            }
            if(systemStates.Heat_2 === 'ON')
            {
                return <p className={styles.margin_none}>{'EM-Heat: ' + systemStates.Heat_2}</p>
            }
        }
        
        return <p className={styles.margin_none}>Setting: Idle</p>
        
    }

    return(
        <div className={styles.wrapper}>
            <Home size={iconSize} color="gray" strokeWidth={2} />
            <div className={styles.inside_temp__wrapper}>
                <p>INSIDE TEMP: </p>
                <p className={`${styles.margin_none} ${styles.light_background}`}>{`${tempData ? tempData.temp.toFixed(2) : '...'}°`}</p>
            </div>
            <p className={styles.margin_none}>{`${tempData ? tempData.humidity.toFixed(2) : '...'}%`}</p>
            <p className={styles.margin_none}>System Status: {systemStates !== null ? systemStates.power : 'OFF'}</p>
            <p className={styles.margin_none}>{`${systemStates !== null ? systemStates.Fan === 'ON' ? 'FAN: ' + systemStates.Fan : 'FAN: AUTO' : ''}`}</p>
            <CurStatusSetting />
        </div>
    )
}