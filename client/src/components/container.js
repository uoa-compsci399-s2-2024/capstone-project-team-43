import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import SortableItem from "../components/sortable_item";

const containerStyle = {
  background: "#dadada",
  padding: 10,
  margin: 10,
  flex: 1
};

export default function Container(props) {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id
  });
  // console.log(props)
  return (
    <SortableContext
      items={items}
      strategy={verticalListSortingStrategy}
    >
     
        
      <div ref={setNodeRef} style={containerStyle}>
      {/* <div ref={setNodeRef} > */}

        {items.map((id) => (

          <SortableItem  id={id} />


        ))}

      </div>
    </SortableContext>
  );
}
