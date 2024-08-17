"use client";
import React, { useContext } from "react";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { EditorContext, EditorProvider } from "@/context/editor-context";
import { BlockState } from "@/types/editor-type";
import BlockRegistry from "@/utils/BlockRegistry";
import { Footer, Sidebar } from "@/components";
import Image from "next/image";
import { DroppableArea } from "@/components/DroppableArea";
import { sampleBlocks } from "@/utils/sample-block";
import dayjs from "dayjs";

const AdminPage = () => {
  return (
    <EditorProvider>
      <AdminComponent />
    </EditorProvider>
  );
};

const AdminComponent = () => {
  const { data, setData, patch, handleUndo, handleRedo, handleUpdatePatch } =
    useContext(EditorContext);

  /**
   * Handles sort the selected blocks.
   *
   * @param {DragEndEvent} event - The event object for the drag end action.
   */
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active.id.toString().includes("sample-block") && over?.id !== null) {
      handleAddBlock(active.data.current?.type);
    }
    // ignore swap the current position
    if (over?.id && active.id !== over.id) {
      const oldIndex = data.children.findIndex(
        (item: BlockState) => item.id === active.id
      );
      const newIndex = data.children.findIndex(
        (item: BlockState) => item.id === over.id
      );
      // return if there can not find the swap index
      if (oldIndex === -1 || newIndex === -1) {
        return;
      }
      const newArr = arrayMove(data.children, oldIndex, newIndex);
      setData({ ...data, children: newArr });
    }
  }

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

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col justify-between">
        <div className="flex h-[calc(100vh-200px)] p-8 bg-gray-100">
          <Sidebar />
          <div className="flex-1">
            <div className="flex gap-4 mx-auto w-full items-center justify-center mb-2">
              <button
                onClick={handleUndo}
                disabled={patch.past.length === 0}
                className="disabled:bg-gray-200  disabled:opacity-50 rounded-md p-1"
              >
                <Image
                  width={25}
                  height={25}
                  src="/icons/undo-icon.svg"
                  alt="undo-icon"
                />
              </button>
              <button
                onClick={handleRedo}
                disabled={patch.future.length === 0}
                className="disabled:bg-gray-200  disabled:opacity-50 rounded-md p-1"
              >
                <Image
                  width={25}
                  height={25}
                  src="/icons/redo-icon.svg"
                  alt="redo-icon"
                />
              </button>
            </div>
            <DroppableArea>
              <SortableContext
                items={data.children}
                strategy={verticalListSortingStrategy}
              >
                <div
                  className={`mx-auto w-[500px] h-[calc(100vh-280px)] overflow-y-auto overflow-x-hidden bg-white relative`}
                >
                  {data?.children?.map((item: BlockState) =>
                    BlockRegistry({
                      attribute: item,
                    })
                  )}
                </div>
              </SortableContext>
            </DroppableArea>
          </div>
        </div>
        <Footer />
      </div>
    </DndContext>
  );
};

export default AdminPage;
