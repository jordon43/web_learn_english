import { WordCardForm } from "@/entities/word/ui/WordCardForm";
import { positionCardXY } from "@/shared/types/ui";
import { WrapperCard } from "@/shared/ui/WrapperCard/WrapperCard";
import { CARD_INTERVAL_ACTION } from "@/features/Card/model/constants";
import { WordData } from "@/entities/word/model/types";
import { useChangeFavoriteWordMutation } from "@/entities/word/api/wordApi";

type CardProps = {
  propsCard: WordData;
  onKnow?: () => void;
  onDontKnow?: () => void;
  setCardPositionXY?: ({ x, y }: positionCardXY) => void;
};

export const CardBox = ({
  propsCard,
  onKnow,
  onDontKnow,
  setCardPositionXY,
}: CardProps) => {
  const [changeFavoriteWord] = useChangeFavoriteWordMutation();
  const onFavorite = () => {
    changeFavoriteWord({ id: propsCard.id });
  };

  return (
    <WrapperCard
      setCardPositionXY={setCardPositionXY}
      onSwipeLeft={onKnow}
      onSwipeRight={onDontKnow}
      intervalAction={CARD_INTERVAL_ACTION}
    >
      <WordCardForm word={propsCard} onFavorite={onFavorite} />
    </WrapperCard>
  );
};
