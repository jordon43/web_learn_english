export type positionCardXY = {
  x: number;
  y: number;
};

export type positionCard = "left" | "right" | "center"

export type positionCardWithoutCenter = Omit<positionCard, ''>

