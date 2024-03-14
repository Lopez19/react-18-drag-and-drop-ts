import React from "react";
import { useId, useState } from "react";
import ItemActions from "./ItemActions";
import ItemDragMe from "./ItemDragMe";
import ItemDragZone from "./ItemDragZone";

const DragAndDropNumber = () => {
  const id = useId();
  const [list1, setList1] = useState([
    {
      id: 1,
      number: 1,
      isDisable: false,
      drroped: false,
      position: 0,
    },
    {
      id: 2,
      number: 2,
      isDisable: false,
      drroped: false,
      position: 1,
    },
    {
      id: 3,
      number: 3,
      isDisable: false,
      drroped: false,
      position: 2,
    },
    {
      id: 4,
      number: 4,
      isDisable: false,
      drroped: false,
      position: 3,
    },
  ]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [listTarget, setListTarget] = useState(
    new Array(list1.length).fill({})
  );
  const [dragOver, setDragOver] = useState(false);

  // Handlers
  const handleDragOverStart = () => setDragOver(true);
  const handleDragOverEnd = () => setDragOver(false);

  const handleDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    positionElement: number
  ) => {
    event.dataTransfer.setData("position", String(positionElement));
  };

  const enableDropping = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLButtonElement>,
    positionTarget: number
  ) => {
    const positionElement = Number(event.dataTransfer.getData("position"));
    const newListTarget = [...listTarget];

    if (newListTarget[positionTarget].drroped) {
      const newList1 = list1.map((item) => {
        if (item.id === newListTarget[positionTarget].id) {
          item.drroped = false;
          item.isDisable = false;
        }
        return item;
      });
      setList1(newList1);
    }

    newListTarget[positionTarget] = list1[positionElement];

    const list1Item = list1[positionElement];
    list1Item.drroped = true;
    list1Item.isDisable = true;

    const newList1 = list1.map((item, index) =>
      index === positionElement ? list1Item : item
    );

    setListTarget(newListTarget);
    setList1(newList1);
    setDragOver(false);
  };

  const handleReset = () => {
    setListTarget(new Array(list1.length).fill({}));
    setList1(
      list1.map((item) => {
        item.isDisable = false;
        item.drroped = false;
        return item;
      })
    );
  };

  const handleSubmit = () => {
    const positions = listTarget.map((item) => {
      if (item.drroped) {
        return item.position;
      }
      return null;
    });
    // Here you can send the positions to the backend
    console.log("Positions", positions);
    handleReset();
  };

  return (
    <div className="flex flex-col gap-4 p-3">
      <div className="flex justify-between w-full gap-3">
        {list1.map((item, index) => (
          <ItemDragMe
            key={`${id}-${index}`}
            index={index}
            item={item}
            handleDragStart={handleDragStart}
          />
        ))}
      </div>

      <div className="flex justify-between w-full gap-3">
        {listTarget.map((item, index) => (
          <ItemDragZone
            key={`${id}-${index}`}
            item={item}
            index={index}
            dragOver={dragOver}
            handleDrop={handleDrop}
            enableDropping={enableDropping}
            handleDragOverEnd={handleDragOverEnd}
            handleDragOverStart={handleDragOverStart}
          />
        ))}
      </div>

      <div className="flex gap-4 mt-5 ml-auto">
        {list1.some((item) => item.drroped) && (
          <ItemActions handleReset={handleReset} handleSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default DragAndDropNumber;
