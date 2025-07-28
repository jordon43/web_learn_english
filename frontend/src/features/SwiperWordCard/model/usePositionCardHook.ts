import { positionCard } from "@/shared/types/ui";
import { useState } from "react";
import { useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { CARD_INTERVAL_ACTION } from "@/features/Card/model/constants";
import { DataAnimation } from "@/features/SwiperWordCard/ui/SwiperWordCard";

export const usePositionCardHook = (
  leftAction: () => void,
  rightAction: () => void,
): DataAnimation & { zone: positionCard } => {
  const [zone, setZone] = useState<positionCard>("center");

  const [{ x }, api] = useSpring(() => ({
    x: 0,
    onRest: () => setZone("center"),
  }));

  const bind = useDrag(
    ({
      movement: [mx, my], // Текущее приращение (обнуляется после release)
      offset: [ox, oy], // Полное смещение с начала жеста
      velocity: [vx], // Скорость по оси X
      direction: [dx], // Направление жеста (-1 | 0 | 1)
      swipe: [sx], // Готовый флаг «свайп» (-1 | 0 | 1)
      down,
    }) => {
      /***** 1. Позиционируем карточку *****/
      const liveX = down ? mx : ox; // пока держим ‒ movement, после release ‒ offset
      api.start({ x: liveX });

      /***** 2. Подсветка зоны *****/
      if (liveX < -CARD_INTERVAL_ACTION) setZone("left");
      else if (liveX > CARD_INTERVAL_ACTION) setZone("right");
      else setZone("center");

      /***** 3. Проверяем «свайп» *****/
      // const trigger = Math.abs(vx) > 0.3 || sx !== 0;
      const dir = sx !== 0 ? sx : dx; // направление свайпа
      console.log("dir", dir);
      if (!down) {
        // Улететь за экран
        zone === "left" && leftAction?.();
        zone === "right" && rightAction?.();
        api.start({ x: dir * 500, immediate: false });
      } else if (!down) {
        // Вернуться на место
        api.start({ x: 0 });
      }
    },
    {
      filterTaps: true, // игнор «кликов»
      threshold: 10, // начинаем drag после 10 px
      rubberband: 0.15, // небольшой «растягивающий» эффект
    },
  );

  return { x, bind, api, zone };
};
