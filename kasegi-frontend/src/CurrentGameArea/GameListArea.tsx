import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, { useContext, useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

import ReactModal from "react-modal";
import { ChecklistTemplateContext } from "../Providers/ChecklistTemplateProvider";
import { CurrentChecklistTemplateIdContext } from "../Providers/CurrentChecklistTemplateIdProvider";
import { ChecklistTemplate } from "../ClassDefinition";
import "./GameListArea.css";

import axios from "axios";

//https://reactcommunity.org/react-modal/

export default function GameList() {
  const { setCurrentChecklistTemplateId } = useContext(
    CurrentChecklistTemplateIdContext
  );
  const { checklistTemplates, setChecklistTemplate } = useContext(
    ChecklistTemplateContext
  );
  useEffect(() => {
    async function loadChecklistTemplates() {
      const loadedChecklistTemplates = await sendListChecklistTemplateRequest();
      const saveToLocal = (cts: ChecklistTemplate[]) => {
        setChecklistTemplate(cts);
        setCurrentChecklistTemplateId(cts[0].id);
      };
      saveToLocal(loadedChecklistTemplates);
    }
    loadChecklistTemplates();
  }, []);

  console.log(checklistTemplates);
  return (
    <div className="ChecklistTemplateSelecter">
      ゲームを選択
      <GameListSelect />
      <GameListModal />
    </div>
  );
}

function GameListSelect() {
  const { setCurrentChecklistTemplateId } = useContext(
    CurrentChecklistTemplateIdContext
  );
  const { checklistTemplates, getChecklistTemplateById } = useContext(
    ChecklistTemplateContext
  );

  return (
    <Form.Select
      aria-label="Default select example"
      onChange={(e) => {
        setCurrentChecklistTemplateId(e.target.value);
      }}
    >
      {checklistTemplates.map((template) => (
        <option key={template.id} value={template.id}>
          {template.name}
        </option>
      ))}
    </Form.Select>
  );
}

function GameListModal() {
  const [isModalOpen, setIsOpen] = React.useState(false);

  function handleCloseModal() {
    setIsOpen(false);
  }
  return (
    <div className="AddChecklistTemplateButtonAndModal">
      <Button onClick={() => setIsOpen(true)}>ゲームを追加</Button>

      <ReactModal
        className="Modal"
        overlayClassName="Overlay"
        onRequestClose={
          () => handleCloseModal()
          /* Function that will be run when the modal is requested
       to be closed (either by clicking on overlay or pressing ESC).
       Note: It is not called if isOpen is changed by other means. */
        }
        isOpen={
          isModalOpen
          /* Boolean describing if the modal should be shown or not. */
        }
      >
        {/*<CreateChecklistTemplateForm />*/}
        <InputForm setIsOpen={(isOpenToBe) => setIsOpen(isOpenToBe)} />
      </ReactModal>
    </div>
  );
}

function getUniqueStr(strong: number = 1000) {
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
}

type Inputs = {
  checklistTemplateTitle: string;
  checkItemTitles: { title: string }[];
};

function InputForm(props: { setIsOpen: (isOpen: boolean) => void }) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "checkItemTitles", // unique name for your Field Array
  });

  const { addChecklistTemplate } = useContext(ChecklistTemplateContext);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    const checklistTemplateToCreate: ChecklistTemplate = {
      id: getUniqueStr(),
      name: data.checklistTemplateTitle,
      checkItems: data.checkItemTitles.map(({ title }) => title),
    };

    addChecklistTemplate(checklistTemplateToCreate);
    sendCreateChecklistTemplateRequest(checklistTemplateToCreate);
    props.setIsOpen(false);
  };

  console.log(watch("checklistTemplateTitle")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form.Label>目標タイトル</Form.Label>
      <Form.Control
        type="text"
        {...register("checklistTemplateTitle", { required: true })}
      />
      {/* errors will return when field validation fails  */}
      {errors.checklistTemplateTitle && <span>目標タイトルは必須です</span>}

      <div className="CheckItemsToCreate">
        <div>
          <Form.Label>目標項目名</Form.Label>
        </div>
        {fields.map((field, index) => (
          <div>
            <Form.Label>項目{index + 1}</Form.Label>
            <Form.Control
              type="text"
              key={field.id} // important to include key with field's id
              {...register(`checkItemTitles.${index}.title`, {
                required: true,
              })}
            />
          </div>
        ))}
        <div>{errors.checkItemTitles && <span>項目名は必須です</span>}</div>
        <Button variant="secondary" onClick={() => append({ title: "" })}>
          +項目を追加
        </Button>
      </div>

      <Button type="submit">目標を作成</Button>
    </form>
  );
}

async function sendCreateChecklistTemplateRequest(
  checklistTemplate: ChecklistTemplate
) {
  const sessionToken = localStorage.getItem("sessionToken");
  return axios
    .post("https://api.real-exp-kasegi.com/createMyChecklistTemplate", {
      SessionToken: sessionToken,
      ChecklistTemplate: {
        GameTitleId: "unused",
        TemplateName: checklistTemplate.name,
        CheckItems: checklistTemplate.checkItems.map((item) => {
          return { Title: item, IsChecked: false };
        }),
      },
    }) //リクエストを飛ばすpath
    .then((response) => {
      console.log(response.data);
    }) //成功した場合、postsを更新する（then）
    .catch((e) => {
      console.log(e);
      console.log("履歴の取得に失敗しました");
      return [];
    }); //失敗した場合(catch)
}

async function sendListChecklistTemplateRequest() {
  const sessionToken = localStorage.getItem("sessionToken");
  return axios
    .post("https://api.real-exp-kasegi.com/listMyChecklistTemplate", {
      SessionToken: sessionToken,
    }) //リクエストを飛ばすpath
    .then((response) => {
      const responceChecklistTemplates: Object[] =
        response.data.checklistTemplate;
      // フロントの型に変換して保存
      const convertedChecklistTemplates = responceChecklistTemplates.map((ct) =>
        convertResponceToChecklistTemplates(ct)
      );
      return convertedChecklistTemplates;
    }) //成功した場合、postsを更新する（then）
    .catch((e) => {
      console.log(e);
      console.log("履歴の取得に失敗しました");
      return [];
    }); //失敗した場合(catch)
}

function convertResponceToChecklistTemplates(
  responceObject: any
): ChecklistTemplate {
  return {
    id: responceObject.Id,
    name: responceObject.TemplateName,
    checkItems: responceObject.CheckItems.map((item: any) => {
      return item.Title;
    }),
  };
}
