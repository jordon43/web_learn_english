"use client";
import { LoginBox } from "@/features/LoginBox/ui/LoginBox";
import styled from "styled-components";

const Page = () => {
  return (
    <MainWrapper>
      <LoginBox />
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-wrap: wrap;
  align-items: center;
  //justify-items: center;
`;

export default Page;
