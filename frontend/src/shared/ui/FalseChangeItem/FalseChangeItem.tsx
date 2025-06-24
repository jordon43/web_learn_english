import * as SC from "./styles";
import React from "react";

type TrueChangeWrappedProps = {
  children?: React.ReactNode;
  active: boolean;
};

export const FalseChangeItem = (props: TrueChangeWrappedProps) => {
  return (
    <SC.FalseChangeWrapped>Не знаю, убрать для повтора</SC.FalseChangeWrapped>
  );
};
