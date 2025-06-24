"use client";
import { useAppSelector } from "@/shared/store/hooks";
import { WordCardForm } from "@/entities/word/ui/WordCardForm";
import {
  useChangeFavoriteWordMutation,
  useGetSavedWordsQuery,
} from "@/entities/word/api/wordApi";
import * as SC from "./styles";

export const ListCardSaved = () => {
  const savedWords = useAppSelector((state) => state.wordState.savedWords);
  const { isLoading, refetch } = useGetSavedWordsQuery();
  const [changeFavoriteWord] = useChangeFavoriteWordMutation();

  const onFavorite = (id: number) => {
    changeFavoriteWord({ id }).then(() => {
      refetch();
    });
  };

  return (
    <SC.WrapperCards>
      {savedWords?.map((word) => (
        <WordCardForm
          key={word.id}
          word={word}
          onFavorite={() => onFavorite(word.id)}
        />
      ))}
    </SC.WrapperCards>
  );
};
