import { useContext } from "react";
import { ChecklistsContext } from "../Providers/ChecklistProvider";
import { ListGroup } from "react-bootstrap";

import { FaCheck } from "react-icons/fa";

export default function FinishedGameArea() {
  return (
    <div className="FinishedGameArea">
      <ChecklistArea />
    </div>
  );
}

function CheckMark(props: { checked: boolean }) {
  const color = props.checked ? "green" : "grey";
  return <FaCheck color={color} />;
}

function ChecklistArea() {
  const { checklists } = useContext(ChecklistsContext);

  return (
    <ListGroup>
      {checklists.map((checklist) =>
        checklist.checkItems.map((checkItem) => (
          <ListGroup.Item key={`default-${checkItem.title}`}>
            <CheckMark checked={checkItem.checked} /> {checkItem.title}
          </ListGroup.Item>
        ))
      )}
    </ListGroup>
  );
}
