"use client";
import { useAppSelector } from "@/shared/store/hooks";
import { WordCardForm } from "@/entities/word/ui/WordCardForm";
import {
  useChangeFavoriteWordMutation,
  useGetRepeatWordsQuery,
} from "@/entities/word/api/wordApi";
import * as SC from "./styles";

export const ListCardRepeat = () => {
  const repeatWords = useAppSelector((state) => state.wordState.repeatWords);
  const { isLoading, refetch } = useGetRepeatWordsQuery();
  const [changeFavoriteWord] = useChangeFavoriteWordMutation();

  const onFavorite = (id: number) => {
    changeFavoriteWord({ id }).then(() => {
      refetch();
    });
  };

  return (
    <SC.WrapperCards>
      {repeatWords?.map((word) => (
        <WordCardForm
          key={word.id}
          word={word}
          onFavorite={() => onFavorite(word.id)}
        />
      ))}
    </SC.WrapperCards>
  );
};
