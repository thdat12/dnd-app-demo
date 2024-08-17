import React from "react";
import { useDroppable } from "@dnd-kit/core";

export const DroppableArea = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const style = {
    zIndex: 99,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-[500px] h-[calc(100vh-280px)] mx-auto"
    >
      {props.children}
    </div>
  );
};
