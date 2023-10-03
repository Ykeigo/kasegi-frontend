import React, { createContext, useState } from "react";
import { ChecklistTemplate } from "../ClassDefinition";

type ChecklistTemplateContextType = {
  checklistTemplates: ChecklistTemplate[];
  setChecklistTemplate: (ct: ChecklistTemplate[]) => void;
  addChecklistTemplate: (ct: ChecklistTemplate) => void;
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
    addChecklistTemplate: (ct: ChecklistTemplate) => {},
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
  const [checklistTemplates, setChecklistTemplates] = useState<
    ChecklistTemplate[]
  >([
    {
      id: "hoge",
      name: "サンプル1（ゲームとか）",
      checkItems: ["楽しかった？", "ベストを尽くした？"],
    },
    {
      id: "sample2",
      name: "サンプル2",
      checkItems: ["サンプル1", "サンプル2"],
    },
  ]);

  const getChecklistTemplate = () => checklistTemplates;

  const getChecklistTemplateById = (id: string) =>
    checklistTemplates.find((ct) => ct.id === id) ??
    defaultChecklistTemplateValue;

  const setChecklistTemplate = (entities: ChecklistTemplate[]) =>
    setChecklistTemplates(entities);

  const addChecklistTemplate = (ct: ChecklistTemplate) =>
    setChecklistTemplates([...checklistTemplates, ct]);

  return (
    <ChecklistTemplateContext.Provider
      value={{
        checklistTemplates,
        setChecklistTemplate,
        addChecklistTemplate,
        getChecklistTemplate,
        getChecklistTemplateById,
      }}
    >
      {children}
    </ChecklistTemplateContext.Provider>
  );
};
