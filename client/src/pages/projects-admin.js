import React, { useState, useEffect } from "react";
import { fetchProjects,updateStatus, fetchSemesters, updatePublish } from '../Api.js'


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
  
  import Container from '../components/container';
  import {Item} from '../components/sortable_item.js';
  import Header from "../components/admin-semester-header.js";
  import '../App.css';

const ProjectsAdmin = () => {
  const [semesters, setSemesters] = useState([]);

  // get data onall semesters
  useEffect(() => {
      async function getSemesters() {
          try {
              const data = await fetchSemesters();
              setSemesters(data);
          } catch (error) {
              console.error('Failed to load semesters:', error);
          }
      }
      getSemesters();
  }, []);

    const [projects, setProjects] = useState([]);

    // get projects
    useEffect(() => {
        async function getProjects() {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (error) {
                console.error('Failed to load projects:', error);
            }
        }
        getProjects();
    }, []);

//Rejected projects

 let rejected = []

    projects
    .filter(project => project.status === 'rejected')
    .map(project => (
      rejected.push([{id: project.id, name:project.title, description:project.description}])

    ))

//Unsorted projects
let unsorted = []

    projects
    .filter(project => project.status === 'pending')
    .map(project => (
      unsorted.push([{id: project.id, name:project.title, description:project.description}])

    ))

//Approved projects
let approved = []

    projects
    .filter(project => project.status === 'accepted')
    .map(project => (
      approved.push([{id: project.id, name:project.title, description:project.description}])

    ))

    const [items, setItems] = useState({
        rejected:[],
        unsorted: [],
        approved: [],
      });



      const load = () => {
        let updatedItems = {};
        items.rejected = [];
        items.unsorted = [];
        items.approved = [];
      for (let i = 0; i < rejected.length; i++) {
        items.rejected.push(rejected[i]);
      };

      for (let i = 0; i < unsorted.length; i++) {
        items.unsorted.push(unsorted[i]);
      };

      for (let i = 0; i < approved.length; i++) {
        items.approved.push(approved[i]);
      };

      updatedItems = {
        rejected: items.rejected,
        unsorted: items.unsorted,
        approved: items.approved,
      };

      setItems(items =>
      ({  ...items,
    ...updatedItems})
        
      );
      };
      

        const [activeId, setActiveId] = useState();
      
        const sensors = useSensors(
          useSensor(PointerSensor),
          useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
          }),
        );

    return(
        <div className="projects">
            <Header semester = "2024 - Semester 1" current = "2024 - Semester 2" semesters = {semesters}/>
            <button onClick={load} id="load">Load all</button>
            
        <div id="sorting">
        <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div id="left">
            <h2>Rejected</h2>
            {/* List rejected projects
            <ul>
                {projects
                .filter(project => project.status === 'rejected')
                .map(project => (
                    // <li key={project.id}>
                    //     <h2>{project.title}</h2>
                    //     <p>{project.description}</p>
                    // </li>
                    <Project id={project.id} name={project.title} description={project.description} />
                ))}
            </ul> */}
            <Container id="rejected" items={items.rejected} />
        </div>
        <div id="center">
            <h2>Unsorted</h2>
            {/* List unsorted projects */}
            {/* <ul>
                {projects
                .filter(project => project.status === 'pending')
                .map(project => (
                    // <li key={project.id}>
                    //     <h2>{project.title}</h2>
                    //     <p>{project.description}</p>
                    // </li>
                    <Project id={project.id} name={project.title} description={project.description} />
                ))}
                    
            </ul> */}
            <Container id="unsorted" items={items.unsorted} />
        </div>
        <div id="right">
            <h2>Approved</h2>
            {/* List approved projects */}
            {/* <ul>
                {projects
                .filter(project => project.status === 'accepted')
                .map(project => (
                    // <li key={project.id}>
                    //     <h2>{project.title}</h2>
                    //     <p>{project.description}</p>
                    // </li>
                    <Project id={project.id} name={project.title} description={project.description} />
                ))}
            </ul> */}
            <Container id="approved" items={items.approved} />
            <div id="publishing">
        <button onClick={()=>updatePublish(false)} id="unpublish">Unpublish</button>
        <button onClick={()=>updatePublish(true)} id="publish">Publish</button>
        </div>
        </div>
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
        </DndContext>
        </div>


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
        let newStatus = "pending";
        if(event.collisions[1].id === "approved"){
          newStatus = "accepted"
        }
        else if(event.collisions[1].id === "rejected"){
          newStatus = "rejected"
        }
        else if(event.collisions[1].id === "unsorted"){
          newStatus = "pending"
        }
        const projectId = event.collisions[0].id[0].id;
      updateStatus(projectId, newStatus);
          }

};

export default ProjectsAdmin;