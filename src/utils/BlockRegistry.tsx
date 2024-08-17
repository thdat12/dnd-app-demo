import { BlockRender, ButtonBlock, TextBlock } from "@/components";
import { BlockState } from "@/types/editor-type";
import React from "react";

type Props = {
  attribute: BlockState;
};

const BlockRegistry = ({ attribute }: Props) => {
  return (
    <BlockRender id={attribute.id} key={attribute.id}>
      {attribute?.type === "text" ? (
        <TextBlock attribute={attribute} />
      ) : attribute?.type === "button" ? (
        <ButtonBlock attribute={attribute} />
      ) : (
        <></>
      )}
    </BlockRender>
  );
};

export default BlockRegistry;
