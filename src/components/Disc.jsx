import { useDraggable } from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

export default function Disc({ disc, isTopDisc }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: disc.id,
        disabled: !isTopDisc,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <img ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        src={disc.image}
        alt={"Disc"}
        draggable={isTopDisc} />
    );
}