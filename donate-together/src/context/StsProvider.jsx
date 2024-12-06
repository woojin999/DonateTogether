import { createContext, useContext, useState } from 'react';

// Context 생성
const StsContext = createContext();

// Provider 컴포넌트
export const StsProvider = ({ children }) => {
  const [boardSts, setBoardSts] = useState("list");

  return (
    <StsContext.Provider value={{ boardSts, setBoardSts }}>
      {children}
    </StsContext.Provider>
  );
};

// custom hook
export const useData = () => useContext(StsContext);
