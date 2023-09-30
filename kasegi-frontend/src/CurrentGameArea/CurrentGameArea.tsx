import { useContext, useState, FormEvent, ChangeEvent } from "react";
import { GameStatusContext } from "../Providers/GameStatusProvider";
import { ChecklistTemplateContext } from "../Providers/ChecklistTemplateProvider";
import { GameStatus, CheckItem } from "../ClassDefinition";
import ListGroup from "react-bootstrap/ListGroup";

import "./CurrentGameArea.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { GameMatchesContext } from "../Providers/GameMatchProvider";
import axios from "axios";
import { GameMatch } from "../ClassDefinition";

export default function CurrentGameArea() {
  return (
    <div className="CurrentGameArea">
      <div>今日も経験値を稼ごう！</div>
      <div className="MyTips">
        <ChecklistArea />
      </div>
    </div>
  );
}

function ChecklistArea() {
  const { gameStatus } = useContext(GameStatusContext);

  if (gameStatus === GameStatus.Checking) return <CheckingArea />;
  else
    return (
      <div>
        {/*項目リスト（チェックできない）があるところ*/}
        <ObjectiveList />
        {/*進ボタンがあるところ*/}
        <StatusButton />
      </div>
    );
}

function ObjectiveList() {
  const { checklistTemplate } = useContext(ChecklistTemplateContext);

  return (
    <ListGroup>
      {checklistTemplate.checkItems.map((item) => (
        <ListGroup.Item key={`default-${item}`}>{item}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}

function NextStatus(status: GameStatus) {
  if (status === GameStatus.Idle) return GameStatus.InGame;
  else if (status === GameStatus.InGame) return GameStatus.Checking;
  else if (status === GameStatus.Checking) return GameStatus.Idle;
  else return GameStatus.Idle;
}

function StatusButton() {
  const { gameStatus, setGameStatus } = useContext(GameStatusContext);

  const params = new Map<GameStatus, [string, string]>([
    [GameStatus.Idle, ["primary", "start!"]],
    [GameStatus.InGame, ["danger", "finish!"]],
  ]);
  const currentStatusParams = params.get(gameStatus);
  return (
    <Button
      variant={currentStatusParams?.[0]}
      onClick={() => setGameStatus(NextStatus(gameStatus))}
    >
      {currentStatusParams?.[1]}
    </Button>
  );
}

function CheckingArea() {
  const { addGameMatch } = useContext(GameMatchesContext);
  const { checklistTemplate } = useContext(ChecklistTemplateContext);
  const { setGameStatus } = useContext(GameStatusContext);

  // controlled formにするためにstateを定義
  // 参考:https://qiita.com/jinto/items/ac851f8eeb0514438890
  const initialCheckItemStates = new Map<string, boolean>();
  checklistTemplate.checkItems.map((item) =>
    initialCheckItemStates.set(item, false)
  );

  const [checkListItemValues, setCheckListItemValues] = useState(
    initialCheckItemStates
  );

  const handleChange =
    (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setCheckListItemValues(
        checkListItemValues.set(key, event.target.checked)
      );
      console.log(key, event.target.checked);
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // stateで管理していた値を取得
    console.log("testValue", checkListItemValues);
    //checkItemsを保存
    const items: CheckItem[] = Array.from(checkListItemValues.entries()).map(
      (item) => {
        return { title: item[0], checked: item[1] };
      }
    );
    const mathToCreate = {
      id: "hoge",
      checkItems: items,
      createdAt: new Date(),
    };
    addGameMatch(mathToCreate);
    //リモートに保存
    createGameMatchRemote(mathToCreate);
    // リセット
    setCheckListItemValues(initialCheckItemStates);
    console.log("reseted to ", initialCheckItemStates);
    setGameStatus(GameStatus.Idle);
  };

  return (
    <div className="ChecklistLikeBootstrapList">
      <Form onSubmit={handleSubmit}>
        {checklistTemplate.checkItems.map((item) => (
          <div key={`default-${item}`} className="mb-3">
            <Form.Check // prettier-ignore
              type="checkbox"
              id={`checkItem-${item}`} // idがなんで必要なのかはわからん bootstrapのページのコピペ
              label={`${item}`}
              onChange={handleChange(item)}
            />
          </div>
        ))}
        <Button variant="warning" type="submit">
          exp!
        </Button>
      </Form>
    </div>
  );
}

function createGameMatchRemote(match: GameMatch) {
  const sessionToken = localStorage.getItem("sessionToken");
  if (sessionToken != "") {
    console.log("send listMyGameMatch. sessionToken: " + sessionToken);
    //match.checkItemsをTitleとIsCheckedに変換
    axios
      .post("https://api.real-exp-kasegi.com/createMyGameMatch", {
        SessionToken: sessionToken,
        GameMatch: {
          GameId: "hoge",
          CheckItems: match.checkItems.map((item) => {
            return { Title: item.title, IsChecked: item.checked };
          }),
        },
      }) //リクエストを飛ばすpath
      .then((response) => {
        console.log(response.data);
        console.log(JSON.stringify(response.data));

        //setChecklists(response.data);
      }) //成功した場合、postsを更新する（then）
      .catch(() => {
        console.log("通信に失敗しました");
      }); //失敗した場合(catch)
  }
}
