import React, { CSSProperties } from "react";
import { useDraggable } from "@dnd-kit/core";

export const DraggableItem = ({ id, type, children }: any) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
      data: {
        type,
      },
    });

  const style: CSSProperties | undefined = isDragging
    ? {
        position: "absolute",
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
        cursor: "move",
        zIndex: 9,
      }
    : {
        cursor: "pointer",
      };

  return (
    <>
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {children}
      </div>
      {isDragging && (
        <div style={{ display: "none !important" }}>{children}</div>
      )}
    </>
  );
};
