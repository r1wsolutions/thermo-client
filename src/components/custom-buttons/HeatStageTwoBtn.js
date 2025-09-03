import btnStyles from './BtnStyles.module.css';
import {Heater} from 'lucide-react';
import { useTheme } from '../../context-api/MainProvider';

export const HeatStageTwoBtn = () =>{
    const {requestAddress, data, setMessageHandler} = useTheme()
    
    const setHeatStageTwoHandler = async () =>{
        try {
            const response = await fetch(requestAddress.directIP_toggleHeat_Stage2, 
                {
                    method: 'GET'
                });

            if (!response.ok) {
                setMessageHandler('Failed to update Heat Stage Two');
                return false;
            }

            const data = await response.json();
            
            if(data.error) {
                throw new Error(data.error);
            }
        } catch (error) {
            setMessageHandler(error.message);
        }
    }

    return (
        <button 
            className={`${btnStyles['icon-btn']} ${data != null && data.heatStage2_On ? btnStyles.active : ''}`}
            onClick={setHeatStageTwoHandler}
        >
            <Heater size={40} color="red" strokeWidth={2} />
            <p style={{ fontSize: '0.8rem', margin: '5px 0 0' }}>EM Heat</p>
        </button>
    )
}
