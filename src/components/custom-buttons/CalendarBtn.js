import btnStyles from './BtnStyles.module.css';
import {CalendarClock } from 'lucide-react';
import {useTheme} from '../../context-api/MainProvider'

export const CalendarBtn =() =>{
    const {setMessageHandler} = useTheme()

    const onClickHandler = () => {
        setMessageHandler('This feature is not available')
    }

    return (
        <button 
            className={btnStyles['icon-btn']}
            onClick={onClickHandler}
        >
            <CalendarClock size={40} color="black" strokeWidth={2} />
        </button>
    )
}
