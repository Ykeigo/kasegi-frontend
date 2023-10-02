import React, { createContext, useState } from "react";
import { ChecklistTemplate } from "../ClassDefinition";

type ChecklistTemplateContextType = {
  checklistTemplates: ChecklistTemplate[];
  setChecklistTemplate: (ct: ChecklistTemplate[]) => void;
  getChecklistTemplate: () => ChecklistTemplate[];
  getChecklistTemplateById: (id: string) => ChecklistTemplate;
};
const defaultChecklistTemplateValue = {
  id: "",
  name: "",
  checkItems: [],
};

export const ChecklistTemplateContext =
  createContext<ChecklistTemplateContextType>({
    checklistTemplates: [defaultChecklistTemplateValue],
    setChecklistTemplate: (entities: ChecklistTemplate[]) => {},
    getChecklistTemplate: () => [defaultChecklistTemplateValue],
    getChecklistTemplateById: (id: string) => defaultChecklistTemplateValue,
  });

/**
 * プロバイダ (これ以下の要素で UserContext を使える)
 */
export const ChecklistTemplateProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // ユーザ情報の初期値
  const [checklistTemplates, setMyTips] = useState<ChecklistTemplate[]>([
    {
      id: "hoge",
      name: "hoge",
      checkItems: ["楽しかった？", "ベストを尽くした？"],
    },
    {
      id: "sample2",
      name: "sample2",
      checkItems: ["サンプル1", "サンプル2"],
    },
  ]);

  const getChecklistTemplate = () => checklistTemplates;

  const getChecklistTemplateById = (id: string) =>
    checklistTemplates.find((ct) => ct.id === id) ??
    defaultChecklistTemplateValue;

  const setChecklistTemplate = (entities: ChecklistTemplate[]) =>
    setMyTips(entities);

  return (
    <ChecklistTemplateContext.Provider
      value={{
        checklistTemplates,
        setChecklistTemplate,
        getChecklistTemplate,
        getChecklistTemplateById,
      }}
    >
      {children}
    </ChecklistTemplateContext.Provider>
  );
};
