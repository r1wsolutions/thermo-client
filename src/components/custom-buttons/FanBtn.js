import styles from '../../App.module.css'
import {Fan} from 'lucide-react';
 
import { useTheme } from '../../context-api/MainProvider';

export const FanBtn = (props) =>{
    const {requestAddress, data, setMessageHandler} = useTheme()
    
    const setFanHandler = async () =>{

        try {
            const response = await fetch(requestAddress.directIP_toggleFan, 
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
            className={`${styles.settings_btn} ${data !== null ? data.fanOn ? styles.is_active : '' : ''}`}
            onClick={setFanHandler}
        >
            <Fan size={72} color="green" strokeWidth={2} />
        </button>
    )
}