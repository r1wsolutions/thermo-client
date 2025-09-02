import styles from '../../App.module.css'
import {ThermometerSun} from 'lucide-react';

import { useTheme } from '../../context-api/MainProvider';

export const HeatStageOneBtn = (props) =>{
    const {requestAddress, data, setMessageHandler} = useTheme()
    
    const setHeatStageOneHandler = async () =>{

        try {
            const response = await fetch(requestAddress.directIP_toggleHeat_Stage1, 
                {
                    method: 'GET'
                });

            if (!response.ok) {
            console.error('Failed to update fan:', response.status);
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
            className={`${styles.settings_btn} ${data != null ? data.heatStage1_On ? styles.is_active : '' : ''}`}
            onClick={setHeatStageOneHandler}
          >
            <ThermometerSun size={72} color="red" strokeWidth={2} />
          </button>
    )
}