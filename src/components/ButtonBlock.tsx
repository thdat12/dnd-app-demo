import { BlockState } from "@/types/editor-type";
import React from "react";

type Props = {
  attribute: BlockState;
  isPreview?: boolean;
};

const ButtonBlock = ({
  attribute: { style, containerStyle, value },
  isPreview = false,
}: Props) => {
  return (
    <div style={{ ...containerStyle }}>
      <button
        style={{ ...style }}
        onClick={() => isPreview && alert(value?.textAlert || "")}
        className="w-full h-full"
      >
        {value?.text}
      </button>
    </div>
  );
};

export default ButtonBlock;
