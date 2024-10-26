import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import SortableItem from "../components/sortable_item";

const containerStyle = {
  // background: "#dadada",
  padding: 10,
  paddingTop:0,
  margin: 10,
  marginTop:0,
  flex: 1
};

export default function Container(props) {
  const { id, items} = props;
  const [expandedProjects, setExpandedProjects] = useState({});
  
  const { setNodeRef } = useDroppable({
    id
  });

  const expandProject = (projectId) => {
    console.log('expanding project', id);
    setExpandedProjects(prev => ({ ...prev, [projectId]: !prev[projectId] })); 
  }
  
  return (
    <SortableContext
      items={items}
      strategy={verticalListSortingStrategy}
    > 
      <div className='project-inner-container' ref={setNodeRef} style={containerStyle}>

        {items.map((id) => (
          <div>
          <SortableItem  id={id}/>
          </div>
        ))}

      </div>
    </SortableContext>
  );
}
