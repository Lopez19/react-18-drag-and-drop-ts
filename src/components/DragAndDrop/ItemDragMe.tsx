interface ItemDragMeProps {
  item: any;
  index: number;
  handleDragStart: (
    evt: React.DragEvent<HTMLButtonElement>,
    index: number
  ) => void;
}

const ItemDragMe = ({ index, item, handleDragStart }: ItemDragMeProps) => {
  return (
    <button
      className={[
        "flex flex-col items-center justify-center w-20 h-20 p-2 text-3xl font-bold text-white bg-black rounded-full",
        item.isDisable
          ? "bg-red-200 cursor-not-allowed"
          : "bg-amber-500 cursor-move",
      ].join(" ")}
      draggable={!item.isDisable}
      onDragStart={(evt) => handleDragStart(evt, index)}
    >
      <p>{item.number}</p>
    </button>
  );
};

export default ItemDragMe;
