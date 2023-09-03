import React, { createContext, useState } from "react";
import { Checklist } from "../ClassDefinition";

type ChecklistsContextType = {
  checklists: Checklist[];
  setChecklists: (ct: Checklist[]) => void;
  getChecklists: () => Checklist[];
  addChecklist: (ct: Checklist) => void;
};
const defaultChecklistValue: Checklist[] = [
  {
    id: "sample",
    checkItems: [
      { title: "サンプル1", checked: true },
      { title: "サンプル2", checked: false },
    ],
    createdAt: new Date(),
  },
];

export const ChecklistsContext = createContext<ChecklistsContextType>({
  checklists: [],
  setChecklists: (checklists: Checklist[]) => {},
  getChecklists: () => defaultChecklistValue,
  addChecklist: (checklist: Checklist) => {},
});

/**
 * プロバイダ (これ以下の要素で UserContext を使える)
 */
export const ChecklistsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // ユーザ情報の初期値
  const [checklists, set] = useState<Checklist[]>(defaultChecklistValue);

  const getChecklists = () => checklists;

  const setChecklists = (entity: Checklist[]) => set(entity);

  const addChecklist = (entity: Checklist) =>
    setChecklists([...checklists, entity]);

  return (
    <ChecklistsContext.Provider
      value={{ checklists, setChecklists, getChecklists, addChecklist }}
    >
      {children}
    </ChecklistsContext.Provider>
  );
};
