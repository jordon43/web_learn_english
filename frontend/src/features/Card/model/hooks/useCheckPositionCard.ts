import { RefObject, useEffect, useRef, useState } from "react";
import { positionCardXY } from "@/shared/types/ui";
import { CARD_INTERVAL_ACTION } from "@/features/Card/model/constants";

type useCheckPositionCardResult = {
  currentCardPosition?: RefObject<positionCardXY | null>;
  setCurrentCardPosition: ({ x, y }: positionCardXY) => void;
  cardZone: "left" | "right" | "center";
};

export const useCheckPositionCard = (): useCheckPositionCardResult => {
  const currentCardPosition = useRef<positionCardXY | null>(null);
  const setCurrentCardPosition = ({ x, y }: positionCardXY) => {
    currentCardPosition.current = { x, y };
  };

  const [cardZone, setCardZone] = useState<"left" | "right" | "center">(
    "center",
  );

  useEffect(() => {
    let rafId: number;

    const checkCurrentPositionCard = () => {
      setCardZone(() => {
        if (
          !currentCardPosition.current ||
          (currentCardPosition.current?.x > -CARD_INTERVAL_ACTION &&
            currentCardPosition.current?.x < CARD_INTERVAL_ACTION)
        ) {
          return "center";
        } else if (currentCardPosition.current?.x < -CARD_INTERVAL_ACTION) {
          return "left";
        } else return "right";
      });

      rafId = requestAnimationFrame(checkCurrentPositionCard);
    };

    rafId = requestAnimationFrame(checkCurrentPositionCard);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return { setCurrentCardPosition, cardZone };
};
