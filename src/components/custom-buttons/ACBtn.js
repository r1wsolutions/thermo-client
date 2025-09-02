import styles from '../../App.module.css'
import {ThermometerSnowflake} from 'lucide-react';

import { useTheme } from '../../context-api/MainProvider';

export const ACBtn = (props) =>{
    const {requestAddress, data, setMessageHandler} = useTheme()
    
    const setAC_Handler = async () =>{

        try {
            const response = await fetch(requestAddress.directIP_toggleAC, 
                {
                    method: 'GET'
                });

            if (!response.ok) {
                console.error('Failed to update AC:', response.status);
                return false;
            }

            const data = await response.json();
            
            if(data.error)
            {
                throw new Error(data.error)
            }
        } catch (error) {
            setMessageHandler(error.message)
            return false;
        }
    }

    return (
        <button 
            className={`${styles.settings_btn} ${data !== null ? data.acOn ? styles.is_active : '' : ''}`}
            onClick={setAC_Handler}
          >
              <ThermometerSnowflake size={72} color="blue" strokeWidth={2} />
          </button>
    )
}