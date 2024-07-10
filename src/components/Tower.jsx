import { useDroppable } from '@dnd-kit/core';

import Disc from "./Disc";
import styles from "./Tower.module.css";

export default function Tower({towerId, tower }) {
  const { isOver, setNodeRef } = useDroppable({
    id: towerId,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <section
      className={styles.tower}
      ref={setNodeRef}
      style={style}>
      {tower.map((disc, i) => <Disc key={i} disc={disc} isTopDisc={i === 0} />)}
    </section>
  );
}