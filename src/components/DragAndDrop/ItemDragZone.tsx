import { Item } from "./Item";

interface ItemDragZoneProps {
  item: Item;
  index: number;
  dragOver: boolean;
  handleDragOverStart: () => void;
  handleDragOverEnd: () => void;
  handleDrop: (evt: React.DragEvent<HTMLButtonElement>, index: number) => void;
  enableDropping: (evt: React.DragEvent<HTMLButtonElement>) => void;
}

const ItemDragZone = ({
  item,
  index,
  dragOver,
  handleDragOverStart,
  handleDragOverEnd,
  enableDropping,
  handleDrop,
}: ItemDragZoneProps) => {
  return (
    <button
      className={[
        "flex flex-col items-center justify-center w-20 h-20 p-2 text-3xl font-bold text-white rounded-full cursor-not-allowed",
        renderClass(item, dragOver),
      ].join(" ")}
      onDragOver={enableDropping}
      onDrop={(evt) => handleDrop(evt, index)}
      onDragEnter={handleDragOverStart}
      onDragLeave={handleDragOverEnd}
    >
      <p>{item.number}</p>
    </button>
  );
};

export default ItemDragZone;

const renderClass = (item: Item, dragOver: boolean) => {
  if (dragOver) {
    return "bg-purple-400";
  } else if (item.drroped) {
    return "bg-green-500";
  } else {
    return "bg-green-200";
  }
};
