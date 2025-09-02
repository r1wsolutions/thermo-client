import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './BtnStyles.module.css'
import { Minus} from 'lucide-react';
import { Spinner } from '../loaders/Spinner';

import {useTheme} from '../../context-api/MainProvider'


export const DecrementTempBTN =() =>{
    const [max] = useState(80)
    const [shouldPerformAction, setShouldPerformAction] = useState(false);

    const {tempData, loading, setLoading,requestAddress, clientSetTemp, setClientSetTemp} = useTheme()
    
    const debounceTimerRef = useRef(null); // Ref to hold the debounce timer ID
    const DEBOUNCE_DELAY_MS = 3000; // 3 seconds

    // --- The function you want to execute after the debounce delay ---
    const performAction = useCallback(async (val) => {

        try {
            setLoading(true)

            const requestBody = {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({clientSetTemp: val})
                                }

            const response = await fetch(requestAddress.directIP_SetTemp, requestBody)

            if(response){
                const resBody = await response.json()

                if(resBody) {
                    setLoading(false)
                    setClientSetTemp(null)
                    console.log(resBody)
                }
            }

        } catch (error) {
            setLoading(false)
        }
    },[setLoading, requestAddress, setClientSetTemp])


    // --- Click Handler ---
    const clickHandler = () => {

        if(tempData === null) return

        if(clientSetTemp === null)
        {
            const tempVal = tempData.setTemp - 1;

            if(tempVal > max) {return}

            setClientSetTemp(tempVal)
        }else{
            const tempVal =  clientSetTemp - 1

            if(tempVal > max) return

            setClientSetTemp(tempVal)
        }
        
        // Clear any existing timer so it doesn't fire
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Set a new timer
        debounceTimerRef.current = setTimeout(() => {
            setShouldPerformAction(true);//call fetch
            debounceTimerRef.current = null; // Clear ref after action
        }, DEBOUNCE_DELAY_MS);
    };

    
    // --- Cleanup on component unmount ---
    // Important to clear the timeout if the component is unmounted
    // before the debounce timer fires, to prevent memory leaks.
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []); // Empty dependency array means this effect runs once on mount, and cleanup on unmount

    useEffect(() => {
        if (shouldPerformAction) {
            performAction(clientSetTemp);
            setShouldPerformAction(false); // Reset the flag after performing the action
        }
    }, [shouldPerformAction, performAction,clientSetTemp]);


    return <>
                {loading ? 
                <Spinner /> : 
                <button 
                    className={styles.settings_btn}
                    onClick={clickHandler}
                >
                    <Minus size={60} color="black" strokeWidth={2} />
                </button>}
            </>
}