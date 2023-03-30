import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import{
 faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'
import './App.css';



function App() {
 
 //Tasks(Todo list)
 const [toDo, setTodo]=useState([
  {"id": 1, "title": "Task 1", "status":false},
  {"id": 2, "title": "Task 1", "status":false}
]);


// Temp State
const [ newTask, setNewTask] = useState('');
const [ updateData, setUpdateData] = useState('');

// add Task
const addTask = () =>{
  if(newTask) {
    let num =toDo.length + 1;
    let newEntry ={ id: num, title: newTask, status: false}
    setTodo([...toDo, newEntry])
    setNewTask('');
  }
}

//delete Task
const deleteTask = (id) =>{
  let newTasks =toDo.filter( task => task.id !== id)
  setTodo(newTasks);
}


//mark task as done 
const markDone  = (id) =>{
  let newTask=toDo.map(task => {
    if( task.id === id ) {
      return({...task, status: !task.status})
    }
    return task;
  })
  setTodo(newTask);
}

//cancel update
const cancelUpdate  = () =>{
  setUpdateData('');
}


//change task for update
const changeTask  = (e) =>{
  let newEntry = {
    id: updateData.id,
    title:e.target.value,
    status: updateData.status ? true:false
  }
  setUpdateData(newEntry);
}

//update task
const updateTask  = () =>{
  let filterRecords =[...toDo].filter( task => task.id !== updateData.id);
  let upadtedObject = [...filterRecords,updateData]
  setTodo(upadtedObject);
  setUpdateData('');
}




 
 
 
  return (
    <div className="Container App">

     <br /><br/>
     <h2>To Do List</h2>
     < br/><br/>

     {/* Update Task*/}
     {updateData && updateData ? (<>
     <div className="row">
      <div className="|col">
        <input 
        value={ updateData && updateData.title}
        onChange={ (e) => changeTask(e)}
        className="form-control form control-lg"></input>
      </div>
      <div className="col-auto">
        <button 
        onClick={updateTask}
        className="btn btn-lg btn-success mr-20">Update</button>
        <button 
        onClick={cancelUpdate}
        className="btn btn-lg btn-warning">Cancel</button>
      </div>

     </div>
     <br/>
     </>

     ) : (<>
     
    {/* Add Task*/}
     <div className="row">
      <div className="col">
        <input
        value={newTask}
        onChange={ (e) => setNewTask(e.target.value)}
         className="form-control form-control-lg"></input>
      </div>
      <div className="col-auto">
        <button 
        onClick={addTask}
        className="btn btn-lg btn-success">Add Task</button>
      </div>
     </div>
     <br/>
     
     
     
     </>

     )}     






    


    
    {/*Display ToDo s*/}
    {toDo && toDo.length ? '' : 'No Tasks Yet'}
    
    {toDo && toDo
     .sort((a, b) => a.id > b.id ? 1 : -1)
      .map( (task, index) =>{
       return(
        <React.Fragment key={task.id}>

         <div className="col taskBg">
           <div className={task.status ? 'done' : ''}>
            <span className="taskNumber">{index + 1 }</span>
            <span className="taskText">{task.title}</span>
          </div>

          <div className="iconsWrap">
             <span title="Completed / Not Completed"
             onClick={ (e) =>  markDone(task.id)}>
              <FontAwesomeIcon icon={faCircleCheck}/>
             </span>
             
             {task.status ? null :(
             <span title="Edit"
             onClick={ () => setUpdateData({
               id: task.id,
               title: task.title,
               status: task.status ? true:false
             })}>
              <FontAwesomeIcon icon={faPen}/>
             </span>
             )} 

             <span title="Delete"
             onClick={ () => deleteTask(task.id)}>
              <FontAwesomeIcon icon={faTrashCan}/>
             </span>
          </div>
         </div>

          
        </React.Fragment>
       )
      })}
     
    </div>
  );
}

export default App;
