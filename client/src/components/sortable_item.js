import React from "react";
import { useSortable, PointerEvent } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Project from './project/project.js'
import PopUp from "../components/project-pop-up-admin.js";
import { useNavigate } from "react-router-dom";

export let projectinfo = null;

export function Item(props) {
  const { id } = props;

  const style = {
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: "5px",
    margin: "10px 0",
    background: "white",
    position: "absolute"
  };

  const Navigate = useNavigate();
  const handleclick = () =>{
    projectinfo = (id[0]);
    Navigate('/pages/project-proposal');
  };

      const submit =() =>{
        document.getElementById('confirm').style.display = "none";
        document.getElementById('close').style.display = "none";
        document.getElementById('edit').style.display = "none";
    }

    // const edit = () =>{
    //   console.log(document.getElementById('edit').style.display);
    // }

const i = props.project;

return (
 
    <div className="sortable">

      {/* <div style={style}> */}
      {/* <Project id={id.id} name={id.name} description ={id.description} />  */}
  {id.map((project) => (   

      
 (<div onClick={handleclick}>
  {/* <button >read</button> */}
     <Project id={project.id} name={project.name} description={project.description} expiry={project.expiry} number={project.project.project_number}/>
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
          <button id="close" onClick={submit}>&times;</button>
          {/* <button id="edit" onClick={edit}>Edit</button> */}

     </div>)
         

        ))}
        
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
