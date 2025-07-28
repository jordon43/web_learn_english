"use client";
import { useState } from "react";
import { useAppSelector } from "@/shared/store/hooks";
import { CardBox } from "@/features/Card/ui/CardBox";
import * as SC from "./styles";
import { TrueChangeItem } from "@/shared/ui/TrueChangeWrapped/TrueChangeWrapped";
import { FalseChangeItem } from "@/shared/ui/FalseChangeItem/FalseChangeItem";
import { useCheckPositionCard } from "@/features/Card/model/hooks/useCheckPositionCard";
import {
  useAddRepeatWordMutation,
  useAddSavedWordMutation,
  useGetAllWordsQuery,
} from "@/entities/word/api/wordApi";
import { useDrag } from "@use-gesture/react";
import { SpringRef, SpringValue } from "@react-spring/web";
import { usePositionCardHook } from "@/features/SwiperWordCard/model/usePositionCardHook";

type DragBind = ReturnType<typeof useDrag>;

export type DataAnimation = {
  x: SpringValue<number>;
  api: SpringRef<{ x: number }>;
  bind: DragBind;
};

export const SwiperWordCard = () => {
  const wordsData = useAppSelector((state) => state.wordState.allWords);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onDontKnow = () => {
    console.log("onDontKnow");
    setCurrentIndex((prev) => ++prev);
    // if (store.allWords[0]) {
    //   addRepeatWord({ id: store.allWords[0].id }).then(() => {
    //     refetch();
    //   });
    // }
  };

  const onKnow = () => {
    console.log("onKnow");
    setCurrentIndex((prev) => ++prev);
    // if (store.allWords[0]) {
    //   addSavedWord({ id: store.allWords[0].id }).then(() => {
    //     refetch();
    //   });
    // }
  };

  const { x, bind, api, zone } = usePositionCardHook(onKnow, onDontKnow);

  const { cardZone, setCurrentCardPosition } = useCheckPositionCard();

  const { data, error, isLoading, refetch } = useGetAllWordsQuery();
  const [addRepeatWord] = useAddRepeatWordMutation();
  const [addSavedWord] = useAddSavedWordMutation();

  return (
    <SC.PageWrapped data-testid={"wordsPageWrapped"}>
      {/*cardZone:{JSON.stringify(cardZone)}*/}
      {}
      <SC.CardsWrapped>
        {!isLoading && (
          <>
            <TrueChangeItem active={cardZone === "left"} />
            {wordsData[currentIndex] && (
              <CardBox
                propsCard={wordsData[currentIndex]}
                setCardPositionXY={setCurrentCardPosition}
                onDontKnow={onDontKnow}
                onKnow={onKnow}
                position={zone}
                dataAnimation={{ x, bind, api }}
              />
            )}
            <FalseChangeItem active={cardZone === "right"} />
          </>
        )}
      </SC.CardsWrapped>
    </SC.PageWrapped>
  );
};
