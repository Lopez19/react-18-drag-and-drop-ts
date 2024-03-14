interface ItemActionsProps {
  handleReset: () => void;
  handleSubmit: () => void;
}

const ItemActions = ({ handleReset, handleSubmit }: ItemActionsProps) => {
  return (
    <>
      <button
        onClick={handleReset}
        className="p-2 text-white bg-red-500 rounded-md"
      >
        Reset All
      </button>

      <button
        onClick={handleSubmit}
        className="p-2 text-white bg-black rounded-md"
      >
        Submit
      </button>
    </>
  );
};

export default ItemActions;
