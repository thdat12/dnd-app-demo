"use client";
import { ButtonBlock, TextBlock } from "@/components";
import { BlockState, DataState } from "@/types/editor-type";
import React, { useEffect, useState } from "react";

type Props = {};

const Consumer = (props: Props) => {
  const [data, setData] = useState<DataState>();
  useEffect(() => {
    const dataFromStorage: DataState =
      JSON.parse(localStorage.getItem("project") || "") || null;
    setData(dataFromStorage);
  }, []);

  return (
    <div className="mx-auto w-[500px]">
      {data?.children.map((item: BlockState, index: number) => (
        <div key={index}>
          {item?.type === "text" ? (
            <TextBlock attribute={item} />
          ) : item?.type === "button" ? (
            <ButtonBlock attribute={item} isPreview={true} />
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default Consumer;
