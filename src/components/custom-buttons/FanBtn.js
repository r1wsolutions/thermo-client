import btnStyles from './BtnStyles.module.css';
import { Fan} from 'lucide-react';
import { useTheme } from '../../context-api/MainProvider';

export const FanBtn = (props) =>{
    const {requestAddress, data, setMessageHandler} = useTheme()
    
    const setFan_Handler = async () =>{
        try {
            const response = await fetch(requestAddress.directIP_toggleFan, 
                {
                    method: 'GET'
                });

            if (!response.ok) {
                console.error('Failed to update Fan:', response.status);
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
            className={`${btnStyles['icon-btn']} ${data !== null && data.fanOn ? btnStyles.active : ''}`}
            onClick={setFan_Handler}
          >
              <Fan size={40} color="black" strokeWidth={2} />
          </button>
    )
}
