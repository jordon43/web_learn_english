import { Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import { AiOutlineSound } from "react-icons/ai";
import { FaRegStar, FaStar } from "react-icons/fa";
import * as SC from "@/entities/word/ui/WordCardForm.styled";
import { WordData } from "@/entities/word/model/types";
import { positionCard } from "@/shared/types/ui";

type Props = {
  children?: Readonly<ReactNode>;
  word: WordData;
  onFavorite?: () => void;
  position?: positionCard;
};

export const WordCardForm = ({ word, onFavorite, position }: Props) => {
  // const { word_en, word_ru, isSaved, isRepeat, isFavorite, id } = word;
  // const { id, word, translations } = word;
  const [revealed, setRevealed] = useState(false);

  return (
    <SC.Wrapper
      $position={position}
      data-testid="WordCardForm"
      className="bg-white rounded-xl shadow-lg text-center select-none"
    >
      {position}
      {/*<SC.SavedStar onClick={onFavorite}>*/}
      {/*  {isFavorite ? (*/}
      {/*    <FaStar size={30} color="gold" />*/}
      {/*  ) : (*/}
      {/*    <FaRegStar size={30} color="gold" />*/}
      {/*  )}*/}
      {/*</SC.SavedStar>*/}

      <SC.RootLangWrapped>
        <Typography>{word.word}</Typography>
        <SC.SoundButton aria-label="play sound">
          <AiOutlineSound size={16} />
        </SC.SoundButton>
      </SC.RootLangWrapped>

      <SC.MessageBox
        revealed={revealed}
        onClick={() => setRevealed((prev) => !prev)}
      >
        {/*{revealed ? word_ru : "👁 Нажми, чтобы увидеть"}*/}
        {revealed ? word.translations?.concat(", ") : "👁 Нажми, чтобы увидеть"}
      </SC.MessageBox>
    </SC.Wrapper>
  );
};
