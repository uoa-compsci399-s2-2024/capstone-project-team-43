import React, {useState, useEffect} from 'react';
import {
  DndContext,
  DragOverlay,
  rectIntersection,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {arrayMove, sortableKeyboardCoordinates} from '@dnd-kit/sortable';

import Container from './container';
import {Item} from './sortable_item';
import Project from "../components/project";
import '../App.css';

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'row',
};



export default function App() {

const list5 =[[{id: 3, name:"proj3", description:"desc3" }],
[{id: 4, name:"proj4", description:"desc4" }],
[{id: 5, name:"proj5", description:"desc5" }],
];

const list6 =[[{id: 10, name:"proj10", description:"desc10" }],
[{id: 11, name:"proj11", description:"desc11" }],
[{id: 12, name:"proj12", description:"desc12" }],
];

const [items, setItems] = useState({
  root: [],
  container1: list5,
  container2: list6,
});

  const [activeId, setActiveId] = useState();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <div style={wrapperStyle}>
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Container id="root" items={items.root} />
        <Container id="container1" items={items.container1} />
        <Container id="container2" items={items.container2} />
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </DndContext>
    </div>
  );

  function findContainer(id) {
    if (id in items) {
      return id;
    }
    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event) {
    const {active} = event;
    const {id} = active;
    setActiveId(id);
  }

  function handleDragOver(event) {
    const {active, over, draggingRect} = event;
    const {id} = active;

    if (over === null) return;
    const {id: overId} = over;


    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }
    
    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];
      
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);
      
      let newIndex;
      if (overId in prev) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect?.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [...prev[activeContainer].filter((item) => item !== active.id)],
        [overContainer]: [...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex], ...prev[overContainer].slice(newIndex, prev[overContainer].length),],
      };
    });
  }

  function handleDragEnd(event) {
    const {active, over} = event;
    const {id} = active;
    if (over === null) return;
    const {id: overId} = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex,
        ),
      }));
    }

    setActiveId(null);
  }
}

