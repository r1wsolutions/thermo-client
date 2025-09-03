//import { useState } from 'react'
import styles from './BtnStyles.module.css'
import { useTheme } from '../../context-api/MainProvider'

import {Spinner} from '../loaders/Spinner.js'

export const SliderBtn =(props)=>{

    const {data, setData, loading, requestAddress} = useTheme()

    //const [isOn, setIsOn] = useState(false)
    //const toggle = useState[false]

    const sliderHandler = async () =>{
        
        try {
            const response = await fetch(
                requestAddress.directIP_PowerToggle,
                { method: 'GET' }
            )

            if(response) { 
                
                const returnMessage = await response.json()

                if(returnMessage)
                {
                    console.log(returnMessage.settings.powerOn)
                
                    setData(returnMessage.settings)
                }
            }
        } catch (error) {
            console.log('error: ' + error)
            //setIsOn((prevState)=>!prevState)
        }

    }

    return(
        <div className={styles.wrapper}>
            { loading ? <Spinner /> : 
            <label className={styles.switch}>
                <input 
                    type="checkbox" 
                    checked={data?.powerOn || false}
                    onChange={sliderHandler}
                />
                <span className={styles.slider} />
            </label>}
        </div>
        

    )
}
