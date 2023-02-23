import React from "react";
import show from "../App.js";
import handleShow from "../App.js";
import handleClose from "../App.js";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import TaskOn from "../App.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";

function Task(props) {


  
  const [del, setDel] = React.useState(false);
  const handleDelSubmit = async (e) => {
    console.log("delete initiated")
    setDel(true);
    let delID = e.target.parentElement.parentElement.className;
    console.log(delID)
    
    console.log("current value of the task", del);
    const tskList = { id: props.taskid };
    console.log(tskList);
    let reqUrl = "http://127.0.0.1:9000/Tech/Del";
    await axios
    .post(reqUrl, tskList)
    .then((res) => {
      //window.location.reload();
      handleClose();
    })
    .catch((e) => console.log("E-->", e));
    setDel(false)
    window.location.reload();
    
    // setTimeout(function () {
      //   window.location.reload();
      // }, 5000);
  };


  const [updatetask, setUpdatetask] = React.useState(false);
  const [updatetaskYes, setUpdatetaskYes] = React.useState(false);
  const [updatetaskNo, setUpdatetaskNo] = React.useState(true)
  const [updateTaskResult, setupdateTaskResult] = React.useState(false)
  const [updatetaskvar, setUpdatetaskvar] = React.useState(false);
  
  const [open, setOpen] = React.useState(false);
  async function handleSubmitkey(e) {
    setOpen(true);  
    // setUpdatetask(true);
    // setUpdatetaskvar(true);
    let newTask = false;

    
    if (updatetaskYes) {
      newTask = true;
    }else {
      newTask = false;
    }
    if (updatetaskNo) {
      newTask = false;
    }else {
      newTask = true;
    }
    console.log('right place', newTask)
    const tskList = { id: props.taskid, is_completed:updateTaskResult, newTaskName: updatetask };
    console.log("tasklist",tskList);
    let reqUrl = "http://127.0.0.1:9000/Tech/edit";
    await axios
      .post(reqUrl, tskList)
      .then((res) => {
        handleClose();
      })
      .catch((e) => console.log("E-->", e));
      setOpen(false);
      window.location.reload();
  }

  // const handleVar = () => {
  //   setUpdatetask(false);
  // };

  // console.log("This updates the state", updatetask, updatetaskvar);
  let setRadioInputYes = function (e) {
    setUpdatetaskYes(true);  
    setUpdatetaskNo(false);  
    setupdateTaskResult(true);
    console.log("inside 1")
    console.log("Final rsult ==> ", updateTaskResult)
  }
  
  let setRadioInputNo = function (e) {
    // e.target.value gives you on/off, and not true/false
    setUpdatetaskYes(false); 
    setUpdatetaskNo(true); 
    setupdateTaskResult(false);
    console.log("inside 2")
    console.log("Final rsult ==> ", updateTaskResult)
  }

  
  const handleEditkey = async (e) => {
    setOpen(true);
  };

  const handlethree = () => {
    setOpen(false);
  };


  const handleDeleteKey = async (e) => {
    console.log("Delete key pressed")
    setDel(true);
    console.log(del)
    };

  const handleDeleteKeyClose = async (e) => {
    setDel(false);
  };

  const handleStatus = async(e) => {
    setUpdatetaskvar(true)
  }
 
  return (
    <div
      className={props.taskid}
      style={{
        border: "2px solid grey",
        marginBottom: "10px",
        fontSize: "10px",
        paddingBlock: "5px",
      }}
    >
            <h4 style={{  display: "block", textAlign: "left", color: "black", marginLeft: "5px" }}>

        {props.name}
      </h4>
      <p> <Button
          style={{ display: 'block',
          width: 100, 
          padding: 30, height: "18px", marginLeft: "300px", color: "black" }}
          variant="inline"
          onClick={handleEditkey}
          size="lg"
        >
          Edit {" "}
        </Button>{' '}

        <Dialog open={open} onClose={handlethree}>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <h4>Task Name</h4>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Enter the new title"
              type="text"
              onChange={(e) => setUpdatetask(e.target.value)}
              fullWidth
              variant="standard"
            />

            <h4>Progress</h4>

            <span style={{display: "flex"}}>
              <p style={{paddingRight: "12px"}}>Yes</p>
              <input
                type="radio"
                checked={updatetaskYes}
                name="setRadioInputYes"
                onChange={setRadioInputYes}
              />
            </span>
            <span style={{display: "flex"}}>
              <p style={{paddingRight: "12px"}}>No</p>
              <input
                type="radio"
                checked={updatetaskNo}
                name="setRadioInputNo"
                onChange={setRadioInputNo}
                />
              </span>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlethree}>Cancel</Button>
            <Button onClick={handleSubmitkey}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </p>
      <p>
        <Button
          style={{ display: 'block',
          width: 700, 
          padding: 10, height: "18px", marginLeft: "300px", color: "black" }}
          variant="inline"
          size="sm"
          onClick={handleDeleteKey}
        >
          Delete {" "}
        </Button>
        <Dialog open={del} onClose={handleDeleteKeyClose}>
          <DialogTitle></DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this entry
            </DialogContentText>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteKeyClose}>Cancel</Button>
            <Button onClick={handleDelSubmit}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </p>

      
          


   
      <h4 style={{  display: "block", textAlign: "left", color: "black", marginLeft: "5px" }}>
        {props.is_completed ? <p>Yes </p> : <p>No </p>}
      </h4>
    </div>
  );
}

export default Task;
