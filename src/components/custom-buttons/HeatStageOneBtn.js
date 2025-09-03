import btnStyles from './BtnStyles.module.css';
import { Flame} from 'lucide-react';
import { useTheme } from '../../context-api/MainProvider';

export const HeatStageOneBtn = (props) =>{
    const {requestAddress, data, setMessageHandler} = useTheme()
    
    const setHeatStageOne_Handler = async () =>{
        try {
            const response = await fetch(requestAddress.directIP_toggleHeatStageOne, 
                {
                    method: 'GET'
                }); 

            if (!response.ok) {
                console.error('Failed to update Heat Stage One:', response.status);
                return false;
            }

            const data = await response.json();
            
            if(data.error) {
                throw new Error(data.error)
            }
        } catch (error) {
            setMessageHandler(error.message)
            return false;
        }
    }

    return (
        <button 
            className={`${btnStyles['icon-btn']} ${data !== null && data.heatStageOneOn ? btnStyles.active : ''}`}
            onClick={setHeatStageOne_Handler}
          >
              <Flame size={40} color="orange" strokeWidth={2} />
          </button>
    )
}
