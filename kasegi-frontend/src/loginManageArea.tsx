import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, Navbar } from "react-bootstrap";

import "./loginManageArea.css";

type LoginResponce = {
  "redirect-url": string;
};
const initialLoginResponce: LoginResponce = {
  "redirect-url": "",
};

type GoogleCallbackResponce = {
  email: string;
  message: string;
  sessionToken: string;
};

export default function LoginHeader() {
  return (
    <Navbar className="header" bg="dark" variant="dark">
      <LoginManageArea />
    </Navbar>
  );
}

function LoginManageArea() {
  const navigate = useNavigate();
  const [loginResponce, setLoginResponce] = useState(initialLoginResponce);
  const [emailForShow, setEmailForShow] = useState("");

  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const code = query.get("code");
  const sessionToken = window.localStorage.getItem("sessionToken");

  useEffect(() => {
    async function fetchData() {
      async function fetchUserId() {
        try {
          if (sessionToken != null) {
            const emailResponce = await sendGetUserId(sessionToken);
            console.log("emailResponce: " + emailResponce);
            setEmailForShow(emailResponce);
            return emailResponce;
          } else {
            console.log("sessionToken is null");
            return "";
          }
        } catch {
          // userIdがとれなかったらsessionTokenを削除し、デフォルト画面に戻すためにリロード
          window.localStorage.removeItem("sessionToken");
          navigate("/");
          window.location.reload();
          throw new Error("sessionToken expired. reload it.");
        }
      }

      const email = await fetchUserId();

      console.log(email);
      console.log("fetchUserId completed");
      if (email != "") console.log("current logging in :" + email);
      else if (code == null) {
        const r = await sendGetLoginUrl();
        setLoginResponce(r);
      } else {
        const r = await sendVerifyAuthCode(code);
        window.localStorage.setItem("sessionToken", r.sessionToken);
        //ユーザー情報を取得し、URLのセッショントークンを消すためにリロード
        navigate("/");
        window.location.reload();
      }
    }
    fetchData();
  }, []);

  if (sessionToken != null && emailForShow != "") {
    return <Navbar.Brand>hello {emailForShow}</Navbar.Brand>;
  } else {
    return <LoginButton googleAuthorizeUrl={loginResponce["redirect-url"]} />;
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
//api.real-exp-kasegi.com/google/callback?redirectUrlhttp://localhost:3000/&code=4/0AfJohXm26DtSAv1lCkPXZLNnEAKvAOzXAeWqxAgKZK74iZm5M-CdQmEa1w8rVYQvuqBW1w

async function sendGetLoginUrl(): Promise<LoginResponce> {
  console.log(
    "sending " +
      "https://api.real-exp-kasegi.com/auth?redirectUrl=" +
      window.location.href.split("?")[0].slice(0, -1) //最後の/を削除　TODO:なんで/があると動かないかわからない
  );
  return await axios
    .get(
      "https://api.real-exp-kasegi.com/auth?redirectUrl=" +
        window.location.href.split("?")[0].slice(0, -1), //最後の/を削除　TODO:なんで/があると動かないかわからない,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ) //リクエストを飛ばすpath
    .then((response) => {
      console.log(response.data);
      console.log(JSON.stringify(response.data));
      return response.data;
    }) //成功した場合、postsを更新する（then）
    .catch((e) => {
      console.log("通信に失敗しました");
      throw e;
    }); //失敗した場合(catch)
}

async function sendVerifyAuthCode(
  code: string
): Promise<GoogleCallbackResponce> {
  console.log(
    "sending " +
      "https://api.real-exp-kasegi.com/google/callback?redirectUrl=" +
      window.location.href.split("?")[0].slice(0, -1) + //最後の/を削除　TODO:なんで/があると動かないかわからない
      "&code=" +
      code
  );
  return axios
    .get(
      "https://api.real-exp-kasegi.com/google/callback?redirectUrl=" +
        window.location.href.split("?")[0].slice(0, -1) + //最後の/を削除　TODO:なんで/があると動かないかわからない
        "&code=" +
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
      return response.data;
    }) //成功した場合、postsを更新する（then）
    .catch((e) => {
      console.log("通信に失敗しました");
      throw e;
    }); //失敗した場合(catch)
}

async function sendGetUserId(sessionToken: String): Promise<string> {
  return axios
    .post("https://api.real-exp-kasegi.com/getMyUser", {
      SessionToken: sessionToken,
    }) //リクエストを飛ばすpath
    .then((response) => {
      console.log(response.data);
      console.log(JSON.stringify(response.data));
      return response.data.user[0].email;
    }) //成功した場合、postsを更新する（then）
    .catch((e) => {
      console.log("通信に失敗しました" + e.message);
      throw e;
    }); //失敗した場合(catch)
}
