import styled from "styled-components";
import { Button, TextField } from "@mui/material";

const LoginFormWrapper = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1rem;
  width: 500px;
  //height: 500px;
  background-color: #f6f6ff;
  border-radius: 7px;
  border: 1px solid #eeeeff;
  text-align: center;
  margin: 0 auto;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  align-items: center;
`;
const InputLogin = styled(TextField)`
  width: 100%;
`;
const InputPassword = styled(TextField)`
  width: 100%;
`;
const ButtonSubmit = styled(Button)`
  width: 150px;
`;

export { ButtonSubmit, InputLogin, LoginFormWrapper, InputPassword };
