import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";

import ReactModal from "react-modal";

//https://reactcommunity.org/react-modal/

export default function GameList() {
  return (
    <div className="GameSelecter">
      <GameListSelect />
      <GameListModal />
    </div>
  );
}

function GameListSelect() {
  return (
    <Form.Select aria-label="Default select example">
      <option>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
  );
}

function GameListModal() {
  const [isModalOpen, setIsOpen] = React.useState(true);

  function handleCloseModal() {
    setIsOpen(false);
  }
  return (
    <div className="AddGameButtonAndModal">
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
