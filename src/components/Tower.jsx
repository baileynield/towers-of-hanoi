import { useDroppable } from '@dnd-kit/core';

import Disc from "./Disc";
import styles from "./Tower.module.css";

export default function Tower({towerId, tower }) {
  const { setNodeRef } = useDroppable({
    id: towerId,
  });

  return (
    <section
      className={styles.tower}
      ref={setNodeRef} >
      {tower.map((disc, i) => <Disc key={i} disc={disc} isTopDisc={i === 0} />)}
    </section>
  );
}