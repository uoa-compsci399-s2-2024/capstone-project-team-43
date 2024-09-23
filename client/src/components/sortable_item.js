import React from "react";
import { useSortable, PointerEvent } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Project from "./project";
import PopUp from "../components/project-pop-up-admin.js";

// import type { PointerEvent } from "react";
import { PointerSensor } from "@dnd-kit/core";

/**
 * An extended "PointerSensor" that prevent some
 * interactive html element(button, input, textarea, select, option...) from dragging
 */
class MyPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: 'onPointerDown',
      handler: ({nativeEvent: event}) => {
        if (
          !event.isPrimary ||
          event.button !== 0 ||
          isInteractiveElement(event.target)
        ) {
          return false;
        }

        return true;
      },
    },
  ];
}

function isInteractiveElement(element) {
  const interactiveElements = [
    'button',
    'input',
    'textarea',
    'select',
    'option',
  ];

  if (interactiveElements.includes(element.tagName.toLowerCase())) {
    return true;
  }

  return false;
}
export function Item(props) {
  const { id } = props;

  const style = {
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid black",
    margin: "10px 0",
    background: "white"
  };
  const handleclick = () =>{
    document.getElementById('confirm').style.display = "block";
    document.getElementById('close').style.display = "block";
    document.getElementById('edit').style.display = "block";
  };
  const submit =() =>{
    document.getElementById('confirm').style.display = "none";
    document.getElementById('close').style.display = "none";
    document.getElementById('edit').style.display = "none";
}
const edit =() =>{
    alert("edit");
}
const i = props.project;

return (
 
    <div className="sortable">

      {/* <div style={style}> */}
      {/* <Project id={id.id} name={id.name} description ={id.description} />  */}
  {id.map((project) => (   

      
 (<div onClick={() => handleclick()}>
  {/* <button >read</button> */}
     <Project id={project.id} name={project.name} description={project.description} expiry={project.expiry}/>
     <div id="confirm">

          <PopUp id={project.project.id} 
          name={project.project.title} 
          description={project.project.description}
          // owner id
          requirements = {project.project.special_requirements}
          resources = {project.project.resources}
          skills = {project.project.preferred_skills}
          deliverable = {project.project.project_deliverable}
          created = {project.project.created}
          expiry= {project.project.expiry}
          teams = {project.project.max_teams}
          number = {project.project.project_number}
          />
          </div>

     </div>)
         

        ))}

        <button id="close" onClick={submit}>&times;</button>
        <button id="edit" onClick={edit}>Edit</button>

  </div>);
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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
//  const item = <Project id={props.id} name={props.name} description={props.description} />;
// console.log("sorte");
// console.log(props);

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item id={props.id} />
    </div>
  );
}
