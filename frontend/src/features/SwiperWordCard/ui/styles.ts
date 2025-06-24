import styled from "styled-components";

export const PageWrapped = styled.div`
  display: flex;
  padding: 0 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  //height: 100%;
  height: 100vh;
`;

export const CardsWrapped = styled.div`
  gap: 20px;
  display: flex;
  //flex: 1 1 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 100%;

  > * {
    flex: 1;
    text-align: center;
  }
`;
