import { useContext, useEffect } from "react";
import { GameMatchesContext } from "../Providers/GameMatchProvider";
import { ListGroup } from "react-bootstrap";

import { FaCheck } from "react-icons/fa";
import { GameMatch } from "../ClassDefinition";

import axios from "axios";

import "./FinishedGameArea.css";

export default function FinishedGameArea() {
  return (
    <div className="FinishedGameArea">
      <ChecklistArea />
    </div>
  );
}

function CheckMark(props: { checked: boolean }) {
  const color = props.checked ? "green" : "white";
  return <FaCheck color={color} />;
}

function ChecklistArea() {
  const { gameMatches, setGameMatches } = useContext(GameMatchesContext);
  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");
    if (sessionToken != null) {
      console.log("send listMyGameMatch. sessionToken: " + sessionToken);
      axios
        .post("https://api.real-exp-kasegi.com/listMyGameMatch", {
          SessionToken: sessionToken,
        }) //リクエストを飛ばすpath
        .then((response) => {
          console.log(response.data);
          const responceMatches: Object[] = response.data.gameMatches;
          console.log(responceMatches);
          //responceMatchesをGameMatchに変換してsetGameMatches
          const convertedMatches = responceMatches.map((gm) =>
            convertResponceToGameMatch(gm)
          );
          setGameMatches(convertedMatches);
        }) //成功した場合、postsを更新する（then）
        .catch((e) => {
          console.log(e);
          console.log("履歴の取得に失敗しました");
        }); //失敗した場合(catch)
    }
  }, []);

  return gameMatches
    .sort(function (a: GameMatch, b: GameMatch) {
      if (a.createdAt > b.createdAt) return -1;
      else return 1;
    })
    .map((gameMatch) => (
      <div>
        <ChecklistOfGame gameMatch={gameMatch} />
      </div>
    ));
}

function ChecklistOfGame(props: { gameMatch: GameMatch }) {
  return (
    <div className="ChecklistOfGame">
      {props.gameMatch.createdAt.toLocaleString()}の試合
      <ListGroup>
        {props.gameMatch.checkItems.map((checkItem) => (
          <ListGroup.Item variant="dark" key={`default-${checkItem.title}`}>
            <CheckMark checked={checkItem.checked} /> {checkItem.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

function convertResponceToGameMatch(responce: any): GameMatch {
  return {
    id: responce.Id,
    checkItems: responce.CheckItems.map((item: any) => {
      return { title: item.Title, checked: item.IsChecked };
    }),
    createdAt: new Date(responce.CreatedAt),
  };
}
