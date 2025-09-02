import styles from './MessageWindow.module.css'
import {XIcon} from 'lucide-react'

import { useTheme } from '../context-api/MainProvider'


const MessageWindow = () =>{

    const {message, setMessageHandler} = useTheme()

    const closeWindowHandler = () =>{
        setMessageHandler(null)
    }

    return(
        <>
            {message ?
                <div className={styles.message_window__wrapper}>
                    <div className={styles.top_bar}>
                        <button
                            className={styles.close_btn}
                            onClick={closeWindowHandler}
                        >
                            <XIcon color='red' width={32} height={32}/>
                        </button>
                    </div>
                    <div className={styles.message_widow}>
                        <p className={styles.message}>{message}</p>
                    </div>
                </div>:
                <div></div>
            }
        </>
        
    )
}

export default MessageWindow