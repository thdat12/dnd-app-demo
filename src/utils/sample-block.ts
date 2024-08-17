import { BlockState } from "@/types/editor-type";

export const sampleBlocks: BlockState[] = [
  {
    id: "",
    type: "text",
    style: {
      fontSize: 16,
      padding: 10,
      color: "#000000",
      backgroundColor: "#ffffff",
    },
    containerStyle: {
      width: "100%",
      backgroundColor: "transparent",
      padding: 10,
      textAlign: "center",
    },
    value: {
      text: "Text",
    },
  },
  {
    id: "",
    type: "button",
    style: {
      fontSize: 16,
      padding: 10,
      color: "#ffffff",
      backgroundColor: "#f87171",
    },
    containerStyle: {
      width: "100%",
      backgroundColor: "#ffffff",
      padding: 10,
      textAlign: "center",
    },
    value: {
      text: `Button`,
      alertText: `Alert sample text`,
    },
  },
];
