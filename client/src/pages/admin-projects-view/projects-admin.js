import React, { useState, useEffect, useCallback, useRef  } from "react";
import { fetchProjects,updateStatus, fetchSemesters, updatePublish } from '../../Api.js';

import './projects-admin.css'


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
  
  import Container from '../../components/container.js';
  import {Item} from '../../components/sortable_item.js';
  import Header from "../../components/admin-semester-header.js";
  import PopUp from "../../components/pop-up admin/project-pop-up-admin.js";

const AdminProjectsView = () => {
  const [projects, setProjects] = useState([]);
  const [expandedProjects, setExpandedProjects] = useState({});

  const expandProject = (projectId) => {
    setExpandedProjects(prev => ({ ...prev, [projectId]: !prev[projectId] })); 
  }


  // get projects
  useEffect(() => {
      async function getProjects() {
          try {
            console.log('fetching all projects for sorting page:');
            const data = await fetchProjects();
            setProjects(data);
            console.log('fetched projects:',data);

          } catch (error) {
            console.error('Failed to load projects:', error);
          }
      };
      getProjects();
  }, []);


      //Rejected projects
      let rejected = [];

      projects
      .filter(project => project.status === 'rejected')
      .map(project => (
        rejected.push([{id: project.id, name:project.title, description:project.description, project:project}])

      ));

      //Unsorted projects
      let unsorted = [];

      projects
      .filter(project => project.status === 'pending')
      .map(project => (
        unsorted.push([{id: project.id, name:project.title, description:project.description, project:project}])

      ));

      //Approved projects
      let approved = [];

      projects
      .filter(project => project.status === 'accepted')
      .map(project => (
        approved.push([{id: project.id, name:project.title, description:project.description, project:project}])

      ));

      const [items, setItems] = useState({
        rejected:[],
        unsorted: [],
        approved: [],
      });

      // let loaded = false;
      const loaded = useRef(0);
        //DEFINE LOAD
        const load = () => {
          let updatedItems = {};
          items.rejected = [];
          items.unsorted = [];
          items.approved = [];
          // console.log(rejected);
          // console.log(unsorted);
          // console.log(approved);
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
        loaded.current = loaded.current + 1;
        };

//Check whether need to call load/re-render
        useEffect(() => {
          if(rejected.length === 0 && unsorted.length === 0 && approved.length === 0){
            loaded.current = 0;
          }else{
            if(loaded.current === 0){
              load();
            }else{
              return;
            }
          }
      });

        const [activeId, setActiveId] = useState();
      
        const sensors = useSensors(
          useSensor(PointerSensor),
          useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
          }),
        );

    return(
        <main className="projects-admin-page">
          <div className="admin-content">
          <div className="admin-page-heading">
            <h1>Manage Projects</h1>
          </div>
          <div className="admin-page-content">
          <div className="container-headers">
            <div><h2>Rejected</h2></div>
            <div><h2>Pending</h2></div>
            <div><h2>Accepted</h2></div>
            <div className="publish-buttons">
                <button className = 'main-button' onClick={()=>updatePublish(false)} id="unpublish">Unpublish</button>
                <button className = 'main-button' onClick={() => {
                    updatePublish(true, items.approved).then(() => {
                    window.location.reload();
                  });
                }} id="publish">Publish</button>
            </div>
          </div>
          {/* <div className="content"> */}
              {/* <Header semester = "2024 - Semester 1" current = "2024 - Semester 2" semesters = {semesters}/> */}
              {/* <button onClick={load} id="load">Load all</button> */}
              
          <div className='project-sorting-wrapper' id="sorting">
          <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className='sort-container rejected-container' id="left">
              <Container id="rejected" items={items.rejected} expandProject={expandProject}/>
          </div>
          <div className='sort-container unsorted-container' id="center">
              <Container id="unsorted" items={items.unsorted} expandProject={expandProject}/>
          </div>
          <div className='sort-container accepted-container' id='right'>
              <Container id="approved" items={items.approved} expandProject={expandProject}/>
              <div id="publishing">
          </div>
          </div>
          <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
          </DndContext>
          </div>
          </div>
        </div>

    </main>);

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
        console.log("ACTIVE ID: ", id[0].id);
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
        console.log(event.collisions[0].id);
        console.log(event.collisions[1].id);
        try{
          if(event.collisions[0].id === "approved" || event.collisions[1].id === "approved"){
            newStatus = "accepted"
          }
          else if(event.collisions[0].id === "rejected" || event.collisions[1].id === "rejected"){
            newStatus = "rejected"
          }
          else if(event.collisions[0].id === "unsorted" || event.collisions[0].id === "unsorted"){
            newStatus = "pending"
          }
          const projectId = id[0].id;
        updateStatus(projectId, newStatus);
  
        } catch(error){
          console.log('Error with Drag-end, try again.');
        }
        const projectId = id[0].id;
      updateStatus(projectId, newStatus);
          }

};

export default AdminProjectsView;