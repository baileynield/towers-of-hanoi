import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { discs } from "./discs";
import Tower from "./Tower";
import styles from "./Game.module.css";

export default function Game() {
  const [parent , setParent] = useState(null);
  const [moves, setMoves] = useState(0);
  const [towerState, setTowerState] = useState({
    t1: [...discs],
    t2: [],
    t3: [],
  });
  // test
  // const [towerState, setTowerState] = useState({
  //   t1: [discs[0]],
  //   t2: [],
  //   t3: [discs[1], discs[2], discs[3], discs[4], discs[5]],
  // });

useEffect(() => {
  if (towerState.t3.length === discs.length) {
    alert(`You win! Yay! It only took you ${moves} moves.`)
  }
}, [towerState]);

  const yellAtUser = () => toast.error("YOU FOOL! YOU SHOULD KNOW BETTER", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

  function handleDragEnd({ active, over }) {
    setParent(over ? over.id : null);

    const newT1 = towerState.t1.filter((disc) => disc.id !== active.id);
    const newT2 = towerState.t2.filter((disc) => disc.id !== active.id);
    const newT3 = towerState.t3.filter((disc) => disc.id !== active.id);

    // Add disc to the target tower

    // Get the disc
    const disc = discs.find((disc) => disc.id === active.id);

    // Get discs from target tower (the "over: tower")
    const targetDiscs = towerState[over.id];
    if (targetDiscs.length > 0) {
      // Get last disc in target tower
      const lastDisc = targetDiscs[targetDiscs.length - 1];

      //Check if the current disc we got above has a larger ID than
      // the last disc in the target tower. If it's larger, deny the
      // move, put the disc back where it came from, then yell at the user
      // for doing such a terrible thing.

      if (disc.id > lastDisc.id) {
        // deny the move
        console.log("bad move");
        yellAtUser()
        return;
      }
    }

    if (over.id === "t1") newT1.unshift(disc);
    else if (over.id === "t2") newT2.unshift(disc);
    else if (over.id === "t3") newT3.unshift(disc);

    // Check for the win condition, which is if the discs 
    // are all on the right tower

    setMoves(prev => prev + 1);

    setTowerState({
      t1: newT1,
      t2: newT2,
      t3: newT3,
    });


  }
  // Add way to win game (know when game is finished)
  // const finishedGame = !(setTowerState.t3 === discs)
  //   console.log("You win!");

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
