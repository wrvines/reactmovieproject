import React, { useState, createContext, useEffect } from "react";
export const ThemeContext = createContext();

export default function ThemeContextProvider(props) {
  //set up my global state
  const [darkMode, setDarkMode] = useState(true);

  //have to get value from localStorage when page loads
  useEffect(() => {
    const theme = localStorage.getItem("darkMode1");

    //stores everything as a string, needs to be boolean
    //use JSON.parse to fix if value is not a string
    //all values in localStorage are stored as strings
    setDarkMode(JSON.parse(theme));
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
