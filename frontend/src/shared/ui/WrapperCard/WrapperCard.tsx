"use client";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { positionCardXY } from "@/shared/types/ui";
import { ReactDOMAttributes } from "@use-gesture/react/src/types";
import { DataAnimation } from "@/features/SwiperWordCard/ui/SwiperWordCard";

type WrapperCardProps = {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  setCardPositionXY?: (pos: positionCardXY) => void;
  intervalAction?: number;
  dataAnimation?: DataAnimation;
};

export const WrapperCard: React.FC<WrapperCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  setCardPositionXY,
  dataAnimation,
  intervalAction = 50,
}) => {
  // const {bind, x} = dataAnimation
  return (
    <>
      {dataAnimation ? (
        <animated.div
          {...dataAnimation.bind()} // теперь без ошибки
          style={{
            transform: dataAnimation.x.to(
              (x) => `translate3d(${x}px,0,0) rotate(${x / 10}deg)`,
            ),
            touchAction: "none",
          }}
        >
          {children}
        </animated.div>
      ) : null}
    </>
  );
};
