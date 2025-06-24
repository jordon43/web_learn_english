"use client";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { positionCardXY } from "@/shared/types/ui";

type WrapperCardProps = {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  setCardPositionXY?: (pos: positionCardXY) => void;
  intervalAction?: number;
};

export const WrapperCard: React.FC<WrapperCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  setCardPositionXY,
  intervalAction = 50,
}) => {
  const [{ x }, api] = useSpring(() => ({
    x: 0,
    onChange: ({ value }) => {
      setCardPositionXY?.({ x: value.x, y: value.y });
    },
  }));

  const bind = useDrag((state): Record<string, unknown> => {
    const [mx, my] = state.movement as [number, number];
    const [vx] = state.velocity as [number, number];
    const [dx] = state.direction as [number, number];
    const down = state.down;

    const trigger = vx > 0.3;
    const dir = dx < 0 ? -1 : 1;

    if (!down && trigger) api.start({ x: dir * 500 });
    else if (!down) api.start({ x: 0 });
    else api.start({ x: mx });

    setCardPositionXY?.({ x: mx, y: my });

    if (!down) {
      if (mx < -intervalAction) onSwipeLeft?.();
      else if (mx > intervalAction) onSwipeRight?.();
    }

    return {};
  }, {});

  return (
    <animated.div
      {...bind()} // теперь без ошибки
      style={{
        transform: x.to((x) => `translate3d(${x}px,0,0) rotate(${x / 10}deg)`),
        touchAction: "none",
      }}
    >
      {children}
    </animated.div>
  );
};
