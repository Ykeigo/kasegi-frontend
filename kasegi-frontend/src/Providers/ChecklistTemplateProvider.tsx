import React, { createContext, useState } from "react";
import { ChecklistTemplate } from "../ClassDefinition";

type ChecklistTemplateContextType = {
  checklistTemplate: ChecklistTemplate;
  set: (ct: ChecklistTemplate) => void;
  get: () => ChecklistTemplate;
};
const defaultChecklistTemplateValue = {
  id: "",
  name: "",
  checkItems: [],
};

export const ChecklistTemplateContext =
  createContext<ChecklistTemplateContextType>({
    checklistTemplate: defaultChecklistTemplateValue,
    set: (status: ChecklistTemplate) => {},
    get: () => defaultChecklistTemplateValue,
  });

/**
 * プロバイダ (これ以下の要素で UserContext を使える)
 */
export const ChecklistTemplateProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // ユーザ情報の初期値
  const [checklistTemplate, setMyTips] = useState<ChecklistTemplate>({
    id: "hoge",
    name: "hoge",
    checkItems: ["楽しかった？", "ベストを尽くした？"],
  });

  const get = () => checklistTemplate;

  const set = (entity: ChecklistTemplate) => setMyTips(entity);

  return (
    <ChecklistTemplateContext.Provider value={{ checklistTemplate, set, get }}>
      {children}
    </ChecklistTemplateContext.Provider>
  );
};
