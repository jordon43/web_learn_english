"use client";
import { Ref, RefObject, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import {
  addRepeatWord,
  addSavedWord,
  setAllWords,
} from "@/entities/word/model/wordsSlice";
import { positionCardXY } from "@/shared/types/ui";
import { CardBox } from "@/features/Card/ui/CardBox";
import { CARD_INTERVAL_ACTION } from "@/features/Card/model/constants";
import { WordData, WordNonFormatData } from "@/entities/word/model/types";
import * as SC from "./styles";

import { mapWords } from "@/entities/word/model/mapper";
import { TrueChangeItem } from "@/shared/ui/TrueChangeWrapped/TrueChangeWrapped";
import { FalseChangeItem } from "@/shared/ui/FalseChangeItem/FalseChangeItem";
import { useCheckPositionCard } from "@/features/Card/model/hooks/useCheckPositionCard";
import {
  useAddRepeatWordMutation,
  useAddSavedWordMutation,
  useGetAllWordsQuery,
  useGetSavedWordsQuery,
} from "@/entities/word/api/wordApi";

const fetchMakeRepeatCard = async (data: WordData) => {
  try {
    const response = await fetch("http://localhost:8383/api/add-repeat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id: data.id,
      }),
    });

    return response.json();
  } catch (e) {
    console.log("error", e);
  }
};

const fetchMakeSaveCard = async (data: WordData) => {
  try {
    const response = await fetch("http://localhost:8383/api/add-saved", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id: data.id,
      }),
    });

    return response.json();
  } catch (e) {
    console.log("error", e);
  }
};

export const SwiperWordCard = () => {
  const store = useAppSelector((state) => state.wordState);

  const { cardZone, setCurrentCardPosition } = useCheckPositionCard();

  const { data, error, isLoading, refetch } = useGetAllWordsQuery();
  const [addRepeatWord] = useAddRepeatWordMutation();
  const [addSavedWord] = useAddSavedWordMutation();

  const onDontKnow = () => {
    if (store.allWords[0]) {
      addRepeatWord({ id: store.allWords[0].id }).then(() => {
        refetch();
      });
    }
  };

  const onKnow = () => {
    if (store.allWords[0]) {
      addSavedWord({ id: store.allWords[0].id }).then(() => {
        refetch();
      });
    }
  };

  return (
    <SC.PageWrapped>
      <SC.CardsWrapped>
        {!isLoading && (
          <>
            <TrueChangeItem active={cardZone === "left"} />
            {store.allWords[0] && (
              <CardBox
                propsCard={store.allWords[0]}
                setCardPositionXY={setCurrentCardPosition}
                onDontKnow={onDontKnow}
                onKnow={onKnow}
              />
            )}
            <FalseChangeItem active={cardZone === "right"} />
          </>
        )}
      </SC.CardsWrapped>
    </SC.PageWrapped>
  );
};
