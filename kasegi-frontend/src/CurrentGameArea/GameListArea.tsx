import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useContext, useEffect } from "react";

import ReactModal from "react-modal";
import { ChecklistTemplateContext } from "../Providers/ChecklistTemplateProvider";
import { CurrentChecklistTemplateIdContext } from "../Providers/CurrentChecklistTemplateIdProvider";

//https://reactcommunity.org/react-modal/

export default function GameList() {
  return (
    <div className="ChecklistTemplateSelecter">
      ゲームを選択
      <GameListSelect />
      <GameListModal />
    </div>
  );
}

function GameListSelect() {
  const { checklistTemplates, getChecklistTemplateById } = useContext(
    ChecklistTemplateContext
  );
  const { setCurrentChecklistTemplateId } = useContext(
    CurrentChecklistTemplateIdContext
  );

  useEffect(() => {
    setCurrentChecklistTemplateId(checklistTemplates[0].id);
  }, []);

  return (
    <Form.Select
      aria-label="Default select example"
      onChange={(e) => {
        console.log("e.target.value", e.target.value);
        setCurrentChecklistTemplateId(e.target.value);
        console.log(getChecklistTemplateById(e.target.value));
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
  const [isModalOpen, setIsOpen] = React.useState(true);

  function handleCloseModal() {
    setIsOpen(false);
  }
  return (
    <div className="AddChecklistTemplateButtonAndModal">
      <Button onClick={() => setIsOpen(true)}>ゲームを追加</Button>

      <ReactModal
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
        <p>Modal Content</p>
      </ReactModal>
    </div>
  );
}
