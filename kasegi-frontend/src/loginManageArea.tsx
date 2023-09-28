import { useEffect, useState } from "react";
import axios from "axios";
//import { useLocation } from "react-router-dom";

import Button from "react-bootstrap/Button";

export default function LoginManageArea() {
  /*
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const name = query.get("name");
  */
  return (
    <div className="FinishedGameArea">
      <LoginButton />
    </div>
  );
}

function LoginButton() {
  const loginResponce: {
    "redirect-url": string;
  } = {
    "redirect-url": "",
  };
  const [posts, setPosts] = useState(loginResponce);
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
    <div className="LoginButton">
      <Button href={posts["redirect-url"]} variant="primary" size="lg" active>
        Login
      </Button>
    </div>
  );
}
