import * as SC from "./styles";
import React from "react";

type TrueChangeWrappedProps = {
  children?: React.ReactNode;
  active: boolean;
};

export const TrueChangeItem = (props: TrueChangeWrappedProps) => {
  return <SC.TrueChangeWrapped>Знаю</SC.TrueChangeWrapped>;
};
