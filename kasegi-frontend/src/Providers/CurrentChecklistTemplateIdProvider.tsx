import React, { createContext, useState } from "react";

type CurrentChecklistTemplateIdContextType = {
  currentChecklistTemplateId: string;
  setCurrentChecklistTemplateId: (currentChecklistTemplateId: string) => void;
  getCurrentChecklistTemplateId: () => string;
};

export const CurrentChecklistTemplateIdContext =
  createContext<CurrentChecklistTemplateIdContextType>({
    currentChecklistTemplateId: "",
    setCurrentChecklistTemplateId: (currentChecklistTemplateId: string) => {},
    getCurrentChecklistTemplateId: () => "",
  });

/**
 * プロバイダ (これ以下の要素で UserContext を使える)
 */
export const CurrentChecklistTemplateIdProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // ユーザ情報の初期値
  const [currentChecklistTemplateId, set] = useState<string>("");

  const getCurrentChecklistTemplateId = () => currentChecklistTemplateId;

  const setCurrentChecklistTemplateId = (entity: string) => set(entity);

  return (
    <CurrentChecklistTemplateIdContext.Provider
      value={{
        currentChecklistTemplateId,
        setCurrentChecklistTemplateId,
        getCurrentChecklistTemplateId,
      }}
    >
      {children}
    </CurrentChecklistTemplateIdContext.Provider>
  );
};
