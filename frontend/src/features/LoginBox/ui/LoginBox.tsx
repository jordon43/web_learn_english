"use client";
import { useEffect, useState } from "react";
import { useLoginUserMutation } from "@/features/LoginBox/api/loginApi";
import { useRouter } from "next/navigation";
import * as SC from "./styles";

export const LoginBox = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const [loginUserMutation, { isLoading, error, isSuccess }] =
    useLoginUserMutation();

  const sendLogin = async () => {
    try {
      await loginUserMutation({
        login: login,
        password: password,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isSuccess) router.push("/words");
  }, [isSuccess]);

  return (
    <SC.LoginFormWrapper autoComplete="off">
      {/*TODO типизировать ошибку*/}
      {error?.data ?? error?.error}
      <SC.InputLogin
        value={login}
        placeholder="Введите логин"
        variant="outlined"
        size="small"
        name="login"
        autoComplete="off"
        onChange={(e) => setLogin(e.target.value)}
      />
      <SC.InputPassword
        value={password}
        placeholder="Введите пароль"
        size="small"
        type="password"
        name="password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
      />
      <SC.ButtonSubmit
        loading={isLoading}
        disabled={isLoading}
        onClick={sendLogin}
        variant="contained"
      >
        Вход
      </SC.ButtonSubmit>
    </SC.LoginFormWrapper>
  );
};
