import { useContext } from "react";
import { ChecklistsContext } from "../Providers/ChecklistProvider";
import { ListGroup } from "react-bootstrap";

import { FaCheck } from "react-icons/fa";
import { Checklist } from "../ClassDefinition";

import "./FinishedGameArea.css";

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

  return checklists.map((checklist) => (
    <div>
      <ChecklistOfGame checklist={checklist} />
    </div>
  ));
}

function ChecklistOfGame(props: { checklist: Checklist }) {
  return (
    <div className="ChecklistOfGame">
      <ListGroup>
        {props.checklist.checkItems.map((checkItem) => (
          <ListGroup.Item key={`default-${checkItem.title}`}>
            <CheckMark checked={checkItem.checked} /> {checkItem.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
