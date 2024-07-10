import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";

import { discs } from "./discs";
import Tower from "./Tower";
import styles from "./Game.module.css";

export default function Game() {
  const [, setParent] = useState(null);
  const [moves, setMoves] = useState(0);

  const [towerState, setTowerState] = useState({
    t1: [...discs],
    t2: [],
    t3: [],
  });

  function handleDragEnd({ active, over }) {
    setParent(over ? over.id : null);

    const newT1 = towerState.t1.filter((disc) => disc.id !== active.id);
    const newT2 = towerState.t2.filter((disc) => disc.id !== active.id);
    const newT3 = towerState.t3.filter((disc) => disc.id !== active.id);

    // Add disc to the target tower

    // Get the disc
    const disc = discs.find((disc) => disc.id === active.id);

    if (over.id === "t1") newT1.push(disc);
    else if (over.id === "t2") newT2.push(disc);
    else if (over.id === "t3") newT3.push(disc);

    setTowerState({
      t1: newT1,
      t2: newT2,
      t3: newT3,
    });
  }
  return (
    <main className={styles.game}>
      <DndContext onDragEnd={handleDragEnd}>
        <Tower tower={towerState.t1} towerId={"t1"} />
        <Tower tower={towerState.t2} towerId={"t2"} />
        <Tower tower={towerState.t3} towerId={"t3"} />
      </DndContext>
    </main>
  );
}
