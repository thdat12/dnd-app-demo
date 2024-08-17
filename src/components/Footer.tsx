"use client";
import { EditorContext } from "@/context/editor-context";
import { BlockState } from "@/types/editor-type";
import Image from "next/image";
import React, { useContext } from "react";

type Props = {};

const ALIGN_OPTIONS: {
  title: React.ReactNode;
  scope: "containerStyle" | "style";
  key: string;
  value: string;
}[] = [
  {
    title: (
      <div>
        <Image
          width={25}
          height={25}
          src={"/icons/align-left-icon.svg"}
          alt="align-left-icon"
        />
      </div>
    ),
    scope: "containerStyle",
    key: "textAlign",
    value: "left",
  },
  {
    title: (
      <div>
        <Image
          width={25}
          height={25}
          src={"/icons/align-center-icon.svg"}
          alt="align-center-icon"
        />
      </div>
    ),
    scope: "containerStyle",
    key: "textAlign",
    value: "center",
  },
  {
    title: (
      <div>
        <Image
          width={25}
          height={25}
          src={"/icons/align-right-icon.svg"}
          alt="align-right-icon"
        />
      </div>
    ),
    scope: "containerStyle",
    key: "textAlign",
    value: "right",
  },
];

const Footer = (props: Props) => {
  const { data, setData, handleUpdatePatch } = useContext(EditorContext);

  const currentBlock = data.children.find(
    (item: BlockState) => item.id === data.selectedBlockId
  );

  /**
   * Handles change block style
   *
   * @param {"style" | "containerStyle"} scope - layout of block.
   * @param {string} key - css property.
   * @param {string | number} value - value
   */
  const handleChangeStyle = (
    scope: "style" | "containerStyle",
    key: string,
    value: string | number
  ) => {
    const block = data.children.find(
      (item: BlockState) => item.id === data.selectedBlockId
    );
    if (block) {
      block[scope] = {
        ...block[scope],
        [key]: value,
      };
    }
    setData({ ...data, children: data.children });
    let clone = structuredClone(data);
    handleUpdatePatch(clone);
  };

  /**
   * Handles change value of block
   *
   * @param {string} key - value key.
   * @param {string | number} value - value
   */
  const handleChangeValue = (key: string, value: string | number) => {
    const block = data.children.find(
      (item: BlockState) => item.id === data.selectedBlockId
    );

    if (block) {
      block.value = {
        ...block.value,
        [key]: value,
      };
    }
    setData({ ...data, children: data.children });
    let clone = structuredClone(data);
    handleUpdatePatch(clone);
  };

  return (
    <div className="w-full h-[200px] border-t-[1px] p-4 flex justify-around">
      {data?.selectedBlockId ? (
        <>
          <div className="flex flex-col gap-2">
            <div>
              <div className="text-sm text-gray-500 mb-2">Value</div>
              <input
                className="border-[1px] p-2 rounded-sm"
                maxLength={50}
                value={currentBlock?.value?.text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeValue("text", e.target.value)
                }
              />
            </div>
            {currentBlock?.type === "button" && (
              <div>
                <div className="text-sm text-gray-500 mb-2">Text Alert</div>
                <input
                  className="border-[1px] p-2 rounded-sm"
                  maxLength={50}
                  value={currentBlock?.value?.textAlert}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeValue("textAlert", e.target.value)
                  }
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {/* Align */}
            <div>
              <div className="text-sm text-gray-500 mb-2">Align</div>
              <ul className="flex gap-4 items-center">
                {ALIGN_OPTIONS.map((item, index) => (
                  <li
                    key={index}
                    className={`hover:bg-gray-200 rounded-sm p-1 ${
                      currentBlock?.containerStyle.textAlign === item.value
                        ? "!bg-gray-200"
                        : ""
                    }`}
                  >
                    <button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        handleChangeStyle(item.scope, item.key, item.value)
                      }
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Font Size */}
            <div>
              <div className="text-sm text-gray-500 mb-2">Font size</div>
              <input
                type="number"
                className="border-[1px] p-2 rounded-sm"
                min={0}
                value={
                  data.children.find(
                    (item: BlockState) => item.id === data.selectedBlockId
                  )?.style.fontSize
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeStyle("style", "fontSize", +e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {/* Padding */}
            <div>
              <div className="text-sm text-gray-500 mb-2">Padding</div>
              <input
                type="number"
                className="border-[1px] p-2 rounded-sm"
                min={0}
                value={currentBlock?.style.padding}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeStyle("style", "padding", +e.target.value)
                }
              />
            </div>
            {/* Margin */}
            <div>
              <div className="text-sm text-gray-500 mb-2">Margin</div>
              <input
                type="number"
                className="border-[1px] p-2 rounded-sm"
                min={0}
                value={currentBlock?.containerStyle.padding}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeStyle(
                    "containerStyle",
                    "padding",
                    +e.target.value
                  )
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <div className="text-sm text-gray-500 mb-2">Background</div>
              <input
                type="color"
                value={currentBlock?.style.backgroundColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeStyle("style", "backgroundColor", e.target.value)
                }
              />
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">Color</div>
              <input
                type="color"
                value={currentBlock?.style.color}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeStyle("style", "color", e.target.value)
                }
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center text-gray-400">
            Select the Block to modify
          </div>
        </>
      )}
    </div>
  );
};

export default Footer;
