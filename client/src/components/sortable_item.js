import React, { useState } from "react";
import { useSortable, PointerEvent } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Project from './project/project.js'
import PopUp from "./pop-up admin/project-pop-up-admin.js";
import { useNavigate } from "react-router-dom";

export let projectinfo = null;

export function Item(props) {
  const { id, expanded, expandProject } = props;

  const navigate = useNavigate();
    const project = id[0].project;

  return (
  
      <div className="sortable">
      <div key = {project.id}>
            <Project projectId={project.id} 
                      view='admin' 
                      expanded={expanded}
                      expandProject={expandProject}
                      />
      </div>
    </div>
  );
}

export default function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ 
    id: props.id
  });

  const {id} = props;

  const [expandedProjects, setExpandedProjects] = useState({});
  const navigate = useNavigate();


  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const expandProject = (projectId) => {
    setExpandedProjects(prev => ({ ...prev, [projectId]: !prev[projectId] })); 
  }
  if(!props.id || !expandProject){
    return;
  }

  return (
    <div className="full-project-wrapper">
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Item id={props.id} expanded={expandedProjects[id[0].id]} expandProject={expandProject}/>
      </div>
      <div className="project-wrapper-buttons">
        <button onClick={() => expandProject(id[0].project.id)} className="admin-expand-button">
              {!expandedProjects[id[0].id] ? 'Expand Project Details' : 'Collapse Project Details'}
        </button> 
       {expandedProjects[id[0].id] && <button onClick={() => navigate(`/projects/edit/${id[0].project.id}`)} className="admin-expand-button">
              Edit Project
        </button>} 
      </div>
    </div>
  );
}
