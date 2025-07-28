import { WordCardForm } from "@/entities/word/ui/WordCardForm";
import { positionCard, positionCardXY } from "@/shared/types/ui";
import { WrapperCard } from "@/shared/ui/WrapperCard/WrapperCard";
import { CARD_INTERVAL_ACTION } from "@/features/Card/model/constants";
import { WordData } from "@/entities/word/model/types";
import { useChangeFavoriteWordMutation } from "@/entities/word/api/wordApi";
import { DataAnimation } from "@/features/SwiperWordCard/ui/SwiperWordCard";

type CardProps = {
  propsCard: WordData;
  onKnow?: () => void;
  onDontKnow?: () => void;
  setCardPositionXY?: ({ x, y }: positionCardXY) => void;
  position?: positionCard;
  dataAnimation?: DataAnimation;
};

export const CardBox = ({
  propsCard,
  onKnow,
  onDontKnow,
  setCardPositionXY,
  dataAnimation,
  position,
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
      dataAnimation={dataAnimation}
    >
      <WordCardForm
        word={propsCard}
        onFavorite={onFavorite}
        position={position}
      />
    </WrapperCard>
  );
};
