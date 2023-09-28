import "./App.css";
import CurrentGameArea from "./CurrentGameArea/CurrentGameArea";
import FinishedGameArea from "./FinishedGameArea/FInishedGameArea";
import { GameStatusProvider } from "./Providers/GameStatusProvider";
import { ChecklistTemplateProvider } from "./Providers/ChecklistTemplateProvider";
import { ChecklistsProvider } from "./Providers/ChecklistProvider";

import { useEffect, useState } from "react";

import axios from "axios";
import { LoginUserProvider } from "./Providers/LoginUserProvider";
import LoginManageArea from "./loginManageArea";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.real-exp-kasegi.com/auth", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }) //リクエストを飛ばすpath
      .then((response) => {
        console.log(response.data);
        console.log(JSON.stringify(response.data));
        setPosts(response.data);
      }) //成功した場合、postsを更新する（then）
      .catch(() => {
        console.log("通信に失敗しました");
      }); //失敗した場合(catch)

    console.log(posts);
  }, []);

  return (
    <LoginUserProvider>
      <ChecklistTemplateProvider>
        <ChecklistsProvider>
          <GameStatusProvider>
            <div className="App">
              posts: {JSON.stringify(posts)}
              <LoginManageArea />
              <CurrentGameArea />
              <FinishedGameArea />
            </div>
          </GameStatusProvider>
        </ChecklistsProvider>
      </ChecklistTemplateProvider>
    </LoginUserProvider>
  );
}

export default App;
