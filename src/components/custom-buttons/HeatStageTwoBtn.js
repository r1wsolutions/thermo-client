import styles from '../../App.module.css'
import {Heater} from 'lucide-react';

import { useTheme } from '../../context-api/MainProvider';

export const HeatStageTwoBtn = () =>{
    const {requestAddress, data, setMessageHandler} = useTheme()
    
    const setHeatStageOneHandler = async () =>{

        try {
            const response = await fetch(requestAddress.directIP_toggleHeat_Stage2, 
                {
                    method: 'GET'
                });

            if (!response.ok) {
                setMessageHandler('Failed to update fan')
                return false;
            }

            const data = await response.json();
            
            if(data.error)
            {
                throw new Error(data.error)
            }
            
        } catch (error) {
            setMessageHandler(error.message)
        }
    }

    return (
        <button 
            className={`${styles.em_heat__btn} ${data != null ? data.heatStage2_On ? styles.is_active : '' : ''}`}
            onClick={setHeatStageOneHandler}
          >
            <Heater size={40} color="red" strokeWidth={2} />
            <p className={styles.em_heat__text} >EM Heat</p>
          </button>
    )
}