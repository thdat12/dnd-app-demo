import { BlockState } from "@/types/editor-type";
import React from "react";

type Props = {
  attribute: BlockState;
};

const TextBlock = ({ attribute: { style, containerStyle, value } }: Props) => {
  return (
    <div style={{ ...containerStyle }}>
      <p style={{ ...style }}>{value?.text}</p>
    </div>
  );
};

export default TextBlock;
