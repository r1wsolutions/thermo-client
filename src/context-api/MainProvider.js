// MainProvider.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context for the theme
const MainContext = createContext();

// Create a provider component
export const MainProvider = ({ children }) => {
  const [data, setData] = useState(null)
  const [systemStates, setSystemStates] = useState(null)
  const [tempData, setTempData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientSetTemp, setClientSetTemp] = useState(null)
  const [message, setMessage] = useState(null)

  const setMessageHandler = (message) =>{
    console.log('setting message ', message)
    setMessage(message)
  }
   
  const values = {
    message,
    setMessageHandler,
    data,
    setData,
    tempData,
    setTempData,
    systemStates,
    setSystemStates,
    setLoading,
    clientSetTemp, 
    setClientSetTemp,
    loading,
    error,
    requestAddress: {
        directIP_PowerToggle: "/toggle-power",
        directIP_SetTemp: "/set-temp",
        directIP_toggleFan: "/toggle-fan",
        directIP_toggleAC: "/toggle-ac",
        directIP_toggleHeat_Stage1: "/toggle-heat-stage1",
        directIP_toggleHeat_Stage2: "/toggle-heat-stage2",
        getAllSettings: '/get-current-settings'
    }
  }

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        console.log('fetching settings')
        const response = await fetch(values.requestAddress.getAllSettings); // Replace with your API endpoint
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log('fetched settings:', jsonData);

        setData(jsonData.settings);
        setSystemStates(jsonData.currentSystemState);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchSettings();
  }, [values.requestAddress.getAllSettings]);

  return (
    <MainContext.Provider value={values}>
      {children}
    </MainContext.Provider>
  );
};

// Create a custom hook to use the theme context
export const useTheme = () => {
  return useContext(MainContext);
};