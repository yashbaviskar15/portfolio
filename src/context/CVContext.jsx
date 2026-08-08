import { createContext, useContext, useState } from 'react';

const CVContext = createContext();

export function CVProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCV = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsOpen(true);
  };

  const closeCV = () => {
    setIsOpen(false);
  };

  return (
    <CVContext.Provider value={{ isOpen, openCV, closeCV }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
}
