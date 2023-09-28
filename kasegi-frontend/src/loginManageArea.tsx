import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import Button from "react-bootstrap/Button";

export default function LoginManageArea() {
  const initialLoginResponce: {
    "redirect-url": string;
  } = {
    "redirect-url": "",
  };
  const [loginResponce, setLoginResponce] = useState(initialLoginResponce);

  const initialGoogleCallbackResponce: {
    email: string;
    message: string;
    sessionToken: string;
  } = {
    email: "",
    message: "",
    sessionToken: "",
  };
  const [googleCallbackResponce, setGoogleCallbackResponce] = useState(
    initialGoogleCallbackResponce
  );

  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const code = query.get("code");

  useEffect(() => {
    if (code == null) {
      axios
        .get(
          "https://api.real-exp-kasegi.com/auth?redirectUrl=http://localhost:3000",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        ) //リクエストを飛ばすpath
        .then((response) => {
          console.log(response.data);
          console.log(JSON.stringify(response.data));
          setLoginResponce(response.data);
        }) //成功した場合、postsを更新する（then）
        .catch(() => {
          console.log("通信に失敗しました");
        }); //失敗した場合(catch)
    } else {
      axios
        .get(
          "https://api.real-exp-kasegi.com/google/callback?redirectUrl=http://localhost:3000&code=" +
            code,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        ) //リクエストを飛ばすpath
        .then((response) => {
          console.log(response.data);
          console.log(JSON.stringify(response.data));
          setGoogleCallbackResponce(response.data);

          window.localStorage.setItem(
            "sessionToken",
            response.data.sessionToken
          );
        }) //成功した場合、postsを更新する（then）
        .catch(() => {
          console.log("通信に失敗しました");
        }); //失敗した場合(catch)

      console.log(googleCallbackResponce);
    }
  }, []);

  if (code == null) {
    return (
      <div className="LoginArea">
        code is {code}
        <LoginButton googleAuthorizeUrl={loginResponce["redirect-url"]} />
      </div>
    );
  } else {
    return (
      <div className="LoginArea">hello {googleCallbackResponce["email"]}</div>
    );
  }
}

function LoginButton(props: { googleAuthorizeUrl: string }) {
  return (
    <div className="LoginButton">
      <Button
        href={props.googleAuthorizeUrl}
        variant="primary"
        size="lg"
        active
      >
        Login
      </Button>
    </div>
  );
}
