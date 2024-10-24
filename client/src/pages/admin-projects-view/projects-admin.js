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

  const [changedApproved, setChangedApproved] = useState(false);
  const [published, setPublished] = useState(() => {
    const storedPublished = localStorage.getItem('published');
    return storedPublished !== null ? JSON.parse(storedPublished) : false; 
  });  
  
  const [publishedProjects, setPublishedProjects] = useState(null);
  const [unpublishedApproved, setUnpublishedApproved] = useState(null);

  const [loading, setLoading] = useState(true); 

  const expandProject = (projectId) => {
    setExpandedProjects(prev => ({ ...prev, [projectId]: !prev[projectId] })); 
  }

  // get projects
  useEffect(() => {
    async function getProjects() {
      try {
        console.log('fetching all projects for sorting page:');

        // get all available projects 
        const data = await fetchProjects();
        const availProjects = data.filter(project => new Date(project.expiry) > new Date())
        setProjects(data);

        // get published projects
        const publishedData = availProjects.filter(project => project.published === 'true');
        setPublishedProjects(publishedData)

        setLoading(false);

      } catch (error) {
        console.error('Failed to load projects:', error);
        setLoading(false);
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
        // setChanged(true);
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

  useEffect(() => {
    console.log('approved:', items.approved);
    console.log('published:', publishedProjects);
    if (JSON.stringify(items.approved) !== JSON.stringify(publishedProjects)) {
      setChangedApproved(true);
      console.log('changed: true');
    }
    console.log('done checking if changed');
  }, [items.approved]);

  return(
      <main className="projects-admin-page">
        <div className="admin-content">
        <div className="admin-page-heading">
          <h1>Manage Projects</h1>
        </div>
        {loading ? (
        <div></div>  
        ) : (
        <div className="admin-page-content">
        <div className="container-headers">
          <div><h2 className="rejected">Rejected</h2></div>
          <div><h2 className="pending">Pending</h2></div>
          <div className="approved-header-wrapper">
            <h2 className="approved">Approved</h2> 
          </div>
          
        </div>
        <div className='project-sorting-wrapper' id="sorting">
        <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className='sort-container rejected-container' id="left">
          
            {items.rejected && <Container id="rejected" items={items.rejected} expandProject={expandProject}/>}
            {items.rejected.length === 0 && <p className="empty-text">No rejected projects.</p>}

        </div>
        <div className='sort-container unsorted-container' id="center">
            {items.unsorted && <Container id="unsorted" items={items.unsorted} expandProject={expandProject}/>}
            {items.unsorted.length === 0 && <p className="empty-text">No pending projects.</p>}
        </div>
        <div className='sort-container accepted-container' id='right'>
         
            {items.approved && <Container id="approved" items={items.approved} expandProject={expandProject}/>}
            {items.approved.length === 0 && <p className="empty-text">No approved projects.</p>}
            <div className="publish-buttons">
              {published && <button className = 'main-button unpublish' onClick={()=>{updatePublish(false); setPublished(false); localStorage.setItem('published', JSON.stringify(false));}} id="unpublish">Unpublish</button>}
                {!published && <button className = 'main-button publish' onClick={() => {
                    updatePublish(true, items.approved).then(() => {
                    setPublished(true);
                    localStorage.setItem('published', JSON.stringify(true));
                    window.location.reload();
                  });
                }} id="publish">Publish</button>}
                {(published && changedApproved) && <button className = 'main-button publish' onClick={() => {
                    updatePublish(true, items.approved).then(() => {
                    setPublished(true);
                    localStorage.setItem('published', JSON.stringify(true));
                    window.location.reload();
                  });
                }} id="publish">Save Changes</button>}

            </div> 
            <div id="publishing">
        </div>
        </div>
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
        </DndContext>
        </div>
        </div>)}
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
        try{

          console.log(event.collisions[0].id);
          console.log(event.collisions[1].id);
          
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
          console.log('updatting status. proj id:',projectId);
          console.log('new status',newStatus);
        updateStatus(projectId, newStatus);
  
        } catch(error){
          console.log('Error with Drag-end, try again.');
        }
        const projectId = id[0].id;
        console.log('new status:',newStatus);
      updateStatus(projectId, newStatus);
          }

};

export default AdminProjectsView;