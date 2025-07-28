"use client";
import { WordCardForm } from "@/entities/word/ui/WordCardForm";
import {
  useChangeFavoriteWordMutation,
  useGetFavoriteWordsQuery,
} from "@/entities/word/api/wordApi";
import * as SC from "./styles";
import { mapWords } from "@/entities/word/model/mapper";

export const ListCardFavorites = () => {
  // const repeatWords = useAppSelector((state) => state.wordState.);
  const { data, isLoading, refetch } = useGetFavoriteWordsQuery();
  const [changeFavoriteWord] = useChangeFavoriteWordMutation();

  const onFavorite = (id: number) => {
    changeFavoriteWord({ id }).then(() => {
      refetch();
    });
  };

  return (
    <SC.WrapperCards>
      {data &&
        mapWords(data).map((word) => (
          <WordCardForm
            key={word.id}
            word={word}
            onFavorite={() => onFavorite(word.id)}
          />
        ))}
    </SC.WrapperCards>
  );
};
