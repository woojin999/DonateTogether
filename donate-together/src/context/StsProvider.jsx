import { createContext, useContext, useState } from "react";
import { UserProvider } from "./UserProvider";

// Context 생성
const StsContext = createContext();

// Provider 컴포넌트
export const StsProvider = ({ children }) => {
  const [boardSts, setBoardSts] = useState("list");

  return (
    <UserProvider>
      <StsContext.Provider value={{ boardSts, setBoardSts }}>
        {children}
      </StsContext.Provider>
    </UserProvider>
  );
};

// custom hook
export const useData = () => useContext(StsContext);
