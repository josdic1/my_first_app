import { useContext } from 'react';
import { AppContext } from "../contexts/AppContext"; 

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

