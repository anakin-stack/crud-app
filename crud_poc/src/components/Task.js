import React from "react";

function Task() { 
    let edit = function handleEdit() {
        console.log(" edit clicked");
    
    }

    let Delete = function handleDelete() {
        console.log("delete clicked");
    }


  
    return (
      <div style={{ border: "2px solid grey", marginBottom: "10px" ,fontSize:"10px", paddingBlock:"5px"}}>
        <p style={{ textAlign: "left", color: "black",marginLeft: "5px" }}>task-box</p>
        <p style={{ textAlign: "left", color: "black",marginLeft: "5px" }}>time</p>
        <p style={{ textAlign: "left", color: "black",marginLeft: "5px" }}>completed-task</p>
        <button id = 'edit-tasks' onClick = {edit} style={{ marginRight:"5px"}}>Edit</button>
        <button id = "delete-task" onClick={Delete}>Delete</button>
      </div>
    );
  
}

export default Task;
   