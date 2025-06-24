import styled from "styled-components";
import { Box } from "@mui/material";

export const RootLangWrapped = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const SoundButton = styled.button`
  background-color: transparent;
  top: 0;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #a82a6d;
    //background-color: #f4f4f4;
    //border-color: #555;
  }

  &:active {
    transform: scale(0.95);
  }

  //svg {
  //    color: #333;
  //}
`;

export const Wrapper = styled.div`
  position: relative;
  min-height: 300px;
  min-width: 200px;
  max-width: 300px;
  max-height: 300px;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    transition: all 0.3s ease;
    transform: scale(1.02);
  }
`;

export const MessageBox = styled.div<{ revealed: boolean }>`
  border-radius: 10px;
  //background-color: ${({ revealed }) => (revealed ? "#f0f0f0" : "#d1d1d1")};
  //color: ${({ revealed }) => (revealed ? "#000" : "transparent")};
  //text-shadow: ${({ revealed }) => (revealed ? "none" : "0 0 8px #333")};
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const SavedStar = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;

  //svg {
  //    color: gold;
  //}
  //
  //&:hover svg {
  //    color: orange;
  //}

  &:active {
    transform: scale(0.95);
  }
`;
