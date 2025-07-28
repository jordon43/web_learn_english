import { RefObject, useEffect, useRef, useState } from "react";
import {positionCard, positionCardXY} from "@/shared/types/ui";
import { CARD_INTERVAL_ACTION } from "@/features/Card/model/constants";

type useCheckPositionCardResult = {
  currentCardPosition?: RefObject<positionCardXY | null>;
  setCurrentCardPosition: ({ x, y }: positionCardXY) => void;
  cardZone: positionCard;
};

// export const useCheckPositionCard = (): useCheckPositionCardResult => {
//   const currentCardPosition = useRef<positionCardXY | null>(null);
//   const setCurrentCardPosition = ({ x, y }: positionCardXY) => {
//     currentCardPosition.current = { x, y };
//   };
//
//   const [cardZone, setCardZone] = useState<"left" | "right" | "center">(
//     "center",
//   );
//
//   useEffect(() => {
//     let rafId: number;
//
//     const checkCurrentPositionCard = () => {
//       setCardZone(() => {
//         if (
//           !currentCardPosition.current ||
//           (currentCardPosition.current?.x > -CARD_INTERVAL_ACTION &&
//             currentCardPosition.current?.x < CARD_INTERVAL_ACTION)
//         ) {
//           return "center";
//         } else if (currentCardPosition.current?.x < -CARD_INTERVAL_ACTION) {
//           return "left";
//         } else return "right";
//       });
//
//       // rafId = requestAnimationFrame(checkCurrentPositionCard);
//     };
//
//     const updateValue = setInterval(() => {
//       checkCurrentPositionCard()
//     }, 500)
//
//     // rafId = requestAnimationFrame(checkCurrentPositionCard);
//
//     // return () => cancelAnimationFrame(rafId);
//     return () => clearInterval(updateValue);
//   }, []);
//
//   return { setCurrentCardPosition, cardZone };
// };

export const useCheckPositionCard = () => {
  const [cardZone, setCardZone] = useState<positionCard>('center');
  const lastZone = useRef<positionCard>('center');

  /** запас в пикселях: насколько дальше нужно выйти,
   чтобы зафиксироваться в новой зоне               */
  const HYSTERESIS = 20;

  const ENTER  = CARD_INTERVAL_ACTION + HYSTERESIS; // чтобы ВОЙТИ
  const EXIT   = CARD_INTERVAL_ACTION - HYSTERESIS; // чтобы ВЫЙТИ

  const setCurrentCardPosition = ({ x }: positionCardXY) => {
    let nextZone: positionCard = lastZone.current;

    switch (lastZone.current) {
      case 'center':
        if (x < -ENTER)       nextZone = 'left';
        else if (x >  ENTER)  nextZone = 'right';
        break;

      case 'left':
        if (x > -EXIT)        nextZone = 'center';
        break;

      case 'right':
        if (x <  EXIT)        nextZone = 'center';
        break;
    }

    // изменяем react-state только при реальном переходе
    if (nextZone !== lastZone.current) {
      lastZone.current = nextZone;
      setCardZone(nextZone);
    }
  };

  return { cardZone, setCurrentCardPosition };
};