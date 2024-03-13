import { useState } from "react";

const App = () => {
  const [list1, setList1] = useState([
    {
      number: 2,
      isDisable: false,
      drroped: false,
    },
    {
      number: 6,
      isDisable: false,
      drroped: false,
    },
    {
      number: 9,
      isDisable: false,
      drroped: false,
    },
    {
      number: 7,
      isDisable: false,
      drroped: false,
    },
  ]);
  const [listTarget, setListTarget] = useState(
    new Array(list1.length).fill({})
  );

  const handleDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    positionElement: number
  ) => {
    event.dataTransfer.setData("position", String(positionElement));
    console.log(
      `Somebody started dragging an element with positionElement: ${positionElement}`
    );
  };

  const enableDropping = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLButtonElement>,
    positionTarget: number
  ) => {
    const positionElement = event.dataTransfer.getData("position");
    const newListTarget = [...listTarget];

    if (newListTarget[positionTarget].drroped) {
      console.log("entro al if");

      const newList1 = list1.map((item) => {
        if (item.number === newListTarget[positionTarget].number) {
          item.drroped = false;
          item.isDisable = false;
        }
        return item;
      });

      setList1(newList1);
    }

    newListTarget[positionTarget] = list1[Number(positionElement)];

    const list1Item = list1[Number(positionElement)];
    list1Item.drroped = true;
    list1Item.isDisable = true;

    const newList1 = list1.map((item, index) => {
      if (index === Number(positionElement)) {
        return list1Item;
      }
      return item;
    });

    setListTarget(newListTarget);
    setList1(newList1);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-10">
      <div className="flex">
        <pre>{JSON.stringify(list1, null, 2)}</pre>
        <pre>{JSON.stringify(listTarget, null, 2)}</pre>
      </div>
      <button
        onClick={() => {
          setListTarget(new Array(list1.length).fill({}));
          setList1(
            list1.map((item) => {
              item.isDisable = false;
              item.drroped = false;
              return item;
            })
          );
        }}
        className="p-2 text-white bg-black rounded-md"
      >
        Reset
      </button>
      <div className="flex justify-between w-[50%]">
        array1
        {list1.map((item, index) => (
          <button
            key={index}
            className="flex flex-col p-2 text-white bg-black rounded-md"
            draggable={!item.isDisable}
            onDragStart={(evt) => handleDragStart(evt, index)}
          >
            Drag Me
            <p>item: {item.number}</p>
            <p>position: {index}</p>
          </button>
        ))}
      </div>

      <div className="flex justify-between w-[50%]">
        array2
        {listTarget.map((item, index) => (
          <button
            key={index}
            className="flex flex-col p-2 text-white bg-black rounded-md opacity-50"
            onDragOver={enableDropping}
            onDrop={(evt) => handleDrop(evt, index)}
          >
            Drop Area
            <p>item: {item.number}</p>
            <p>position: {index}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
