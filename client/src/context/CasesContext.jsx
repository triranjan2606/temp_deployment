// src/context/CasesContext.jsx
import React, { createContext, useState, useContext } from "react";

// Create Context
const CasesContext = createContext();

// Create Provider Component
export const CasesProvider = ({ children }) => {
  const [dCases,setDCases] = useState([]);

  return (
    <CasesContext.Provider value={{ dCases,setDCases }}>
      {children}
    </CasesContext.Provider>
  );
};

// Custom hook for easy usage
export const useCases = () => {
  const context = useContext(CasesContext);
  if (!context) {
    throw new Error("useCases must be used within a CasesProvider");
  }
  return context;
};