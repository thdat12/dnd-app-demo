import { EditorContext } from "@/context/editor-context";
import { BlockState } from "@/types/editor-type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import dayjs from "dayjs";
import Image from "next/image";
import { useContext } from "react";

type Props = {
  id: string;
  children: React.ReactNode;
};

const BlockRender = (props: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { data, handleSelectBlock, handleUpdatePatch, setData } =
    useContext(EditorContext);

  const handleClickBlock = () => {
    handleSelectBlock(props.id);
  };

  const handleClone = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const block = data.children.find((item) => item.id === props.id);

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

  const handleDeleteBlock = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const blocks = data.children.filter((item) => item.id != props.id);

    if (blocks?.length > 0) {
      setData({ ...data, children: [...blocks] });
      const clone = structuredClone({
        ...data,
        children: [...blocks],
      });
      handleUpdatePatch(clone);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`w-full relative border-[1px] border-dashed border-transparent ${
        data.selectedBlockId == props.id ? "!border-red-400" : ""
      }`}
      onClick={handleClickBlock}
    >
      {props.children}
      <nav
        className={`absolute top-0 right-0 ${
          data.selectedBlockId === props.id ? "!inline-block" : "!hidden"
        }`}
      >
        <div className="flex items-center gap-1">
          <div className="bg-gray-100" ref={setActivatorNodeRef} {...listeners}>
            <Image
              width={25}
              height={25}
              src={"/icons/move-icon.svg"}
              alt="move-icon"
            />
          </div>
          <div className="bg-gray-100 z-50" onClick={handleClone}>
            <Image
              width={25}
              height={25}
              src={"/icons/clone-icon.svg"}
              alt="delete-icon"
            />
          </div>
          <div className="bg-gray-100 z-50" onClick={handleDeleteBlock}>
            <Image
              width={25}
              height={25}
              src={"/icons/delete-icon.svg"}
              alt="delete-icon"
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default BlockRender;
