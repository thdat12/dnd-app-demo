"use client";
import { BlockState } from "@/types/editor-type";
import { sampleBlocks } from "@/utils/sample-block";
import React, { useContext } from "react";
import TextBlock from "./TextBlock";
import ButtonBlock from "./ButtonBlock";
import { EditorContext } from "@/context/editor-context";
import dayjs from "dayjs";
import { DraggableItem } from "./DraggableItem";

type Props = {};

const Sidebar = (props: Props) => {
  const { data, setData, handleUpdatePatch } = useContext(EditorContext);

  /**
   * Handles add block.
   *
   * @param {string} type -type of block.
   */
  const handleAddBlock = (type: string) => {
    const block = sampleBlocks.find((item) => item.type === type);

    if (block) {
      const newBlock: BlockState = { ...block };
      newBlock.id = dayjs().valueOf() + "";
      setData({ ...data, children: [...data.children, newBlock] });
      const clone = structuredClone({
        ...data,
        children: [...data.children, newBlock],
      });
      handleUpdatePatch(clone);
    }
  };

  const handelSave = () => {
    localStorage.setItem("project", JSON.stringify(data));
    window.open("/consumer");
  };
  return (
    <div className="w-[250px] border-r-[1px] flex flex-col gap-4 items-center pr-8">
      <button
        onClick={handelSave}
        className="border-[1px] rounded-md p-2 w-[200px] bg-gray-600 text-white text-sm hover:bg-gray-400"
      >
        Save & Preview
      </button>
      {sampleBlocks?.map((item: BlockState, index: number) => (
        <div
          className="border-[1px] border-red-400 border-dashed w-full p-4 cursor-pointer hover:border-red-200 "
          key={index}
        >
          <DraggableItem id={"sample-block-" + index} type={item.type}>
            {item?.type === "text" ? (
              <TextBlock attribute={item} />
            ) : item?.type === "button" ? (
              <ButtonBlock attribute={item} />
            ) : (
              <></>
            )}
          </DraggableItem>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
