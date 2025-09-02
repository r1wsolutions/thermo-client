import styles from './BtnStyles.module.css'
import {CalendarClock } from 'lucide-react';
import {useTheme} from '../../context-api/MainProvider'

export const CalendarBtn =() =>{

    const {setMessageHandler} = useTheme()

    const onClickHandler = () => {
        setMessageHandler('this feature is not avaiable')
    }

    return (
        <button 
            className={styles.calendarBTN}
            onClick={onClickHandler}
        >
                  <CalendarClock size={72} color="black" strokeWidth={2} />
        </button>)
}