import React from "react";
import "../bootstrap.css";
import "../style.css";
import Task from "../Task/Task";

/*

    this module create a componant called Tasks which maintains all the tasks independently!!!!!
    the map method itrates over the data comes from props.tasks and genrate N numbers of Task which also
    come from Task Componant

    Here There Is 

*/



const Tasks = (props) => {
    const classArray=['bg-dark','bg-warning','bg-success','bg-teal','bg-pink','bg-indigo'];
    const DeleteTaskHandler = (id) =>{
        props.onDeleteTask(id);
    }
    const UpdateTaskHandler=(data)=>{
        props.onUpdateTask(data);
    }
    return(
        <div className="card m-md-5">
            <div className="card-body">
                {
                    props.tasks.map((item)=>{
                        return (<Task class={classArray[Math.floor(Math.random()*6)]} UpdateTask={UpdateTaskHandler} DeleteTask={DeleteTaskHandler} id={item._id} key={item.id} time={item.time} date={item.date} title={item.title}></Task> );
                    })
                }
                
            </div>
        </div>
    )
};

export default Tasks;
