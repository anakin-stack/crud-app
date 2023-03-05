import React from "react";
import show from "../App.js";
import handleShow from "../App.js";
import handleClose from "../App.js";
import Modal from "react-bootstrap/Modal";
import DateTime from "./dateTime.js";


 import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import TaskOn from "../App.js";
//import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";
import { borderRadius } from "@mui/system";

function Task(props) {
  const [userinfo, setUserInfo] = React.useState({
    languages: [],
    response: [],
  });

  const handleChecked = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { languages } = userinfo;

    console.log(`${value} is ${checked}`, "checked");

    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        languages: [...languages, value],
        response: [...languages, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        languages: languages.filter((e) => e !== value),
        response: languages.filter((e) => e !== value),
      });
    }
  };

  const [del, setDel] = React.useState(false);
  const handleDelSubmit = async (e) => {
    console.log("delete initiated");
    setDel(true);
    let delID = e.target.parentElement.parentElement.className;
    console.log(delID);

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
    setDel(false);
    window.location.reload();

    // setTimeout(function () {
    //   window.location.reload();
    // }, 5000);
  };

  const [updatetask, setUpdatetask] = React.useState(false);
  const [updatetaskYes, setUpdatetaskYes] = React.useState(false);
  const [updatetaskNo, setUpdatetaskNo] = React.useState(true);
  const [updateTaskResult, setupdateTaskResult] = React.useState(false);
  const [updatetaskvar, setUpdatetaskvar] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  async function handleSubmitkey(e) {
    setOpen(true);
    // setUpdatetask(true);
    // setUpdatetaskvar(true);
    let newTask = false;

    if (updatetaskYes) {
      newTask = true;
    } else {
      newTask = false;
    }
    if (updatetaskNo) {
      newTask = false;
    } else {
      newTask = true;
    }
    console.log("right place", newTask);
    const tskList = {
      id: props.taskid,
      is_completed: updateTaskResult,
      newTaskName: updatetask,
    };
    console.log("tasklist", tskList);
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
    console.log("inside 1");
    console.log("Final rsult ==> ", updateTaskResult);
  };

  let setRadioInputNo = function (e) {
    // e.target.value gives you on/off, and not true/false
    setUpdatetaskYes(false);
    setUpdatetaskNo(true);
    setupdateTaskResult(false);
    console.log("inside 2");
    console.log("Final rsult ==> ", updateTaskResult);
  };

  const handleEditkey = async (e) => {
    setOpen(true);
  };

  const handlethree = () => {
    setOpen(false);
  };

  const handleDeleteKey = async (e) => {
    console.log("Delete key pressed");
    setDel(true);
    console.log(del);
  };

  const handleDeleteKeyClose = async (e) => {
    setDel(false);
  };

  const handleStatus = async (e) => {
    setUpdatetaskvar(true);
  };

  return (
    <div class="container "  style={{
             
            padding: 20,
            
            border: '5px solid black' ,
            borderRadius:"30px"           
            
             
          }}>
      <div class="row">
      <div class="col" style={{display: "block",
      width:  50, borderBlockEnd : '5px solid black'       }}><h6>Task</h6></div>
      <div class="col"  style={{display: "block",
      width: 50 , borderBlockEnd : '5px solid black', marginLeft: "37px",       }}><h6>Status</h6></div>
      <div class="col" style={{display: "block",
      width: 50, borderBlockEnd : '5px solid black',marginLeft: "37px",       }}><h6>Date</h6></div>  
      <div class="col"></div>
      <div class="col"></div>
      <div class="col"></div>
      <div class="w-100"></div>

        <div
          class="col"
          style={{
            display: "block",
            width: 20,
            padding: 30,
            height: "100px",
            color: "black",
            
          }}
        >
          {props.name}
        </div>
        <div
          class="col"
          style={{
            display: "block",
            width: 50,
            padding: 30,
            height: "5px",
            color: "black",marginLeft: "37px"
          }}
        >
          {props.is_completed ? <p>Yes </p> : <p>No </p>}
        </div>
        <div class="col"style={{
            display: "block",
            width: 10,
            padding: 30,
            height: "100px",
            color: "black",
            marginLeft: "35px",
          }}><DateTime/></div>
        <div class="col"></div>
        <div class="col"
        style = {{ display: "block",
       
        padding: 30,
        height: "18px",
         
      }} > 
        <Button
              style={{
                color: "black",border : '5px solid black',
                borderRadius:"8px"           

                
              }}
              variant="success"
              onClick={handleEditkey}
            >
              Edit
            </Button>{" "}
            <Modal show={open} onHide={handlethree}>
              <Modal.Header closeButton>
                <Modal.Title>Select An Entry</Modal.Title>
              </Modal.Header>
              <Modal.Body>
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

            <span style={{ display: "flex" }}>
              <p style={{ paddingRight: "12px" }}>Yes</p>
              <input
                type="radio"
                checked={updatetaskYes}
                name="setRadioInputYes"
                onChange={setRadioInputYes}
              />
            </span>
            <span style={{ display: "flex" }}>
              <p style={{ paddingRight: "12px" }}>No</p>
              <input
                type="radio"
                checked={updatetaskNo}
                name="setRadioInputNo"
                onChange={setRadioInputNo}
              />
            </span>
                 

                
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handlethree}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmitkey}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
             
        </div>
        
          {/* <DialogTitle>Edit</DialogTitle>
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

            <span style={{ display: "flex" }}>
              <p style={{ paddingRight: "12px" }}>Yes</p>
              <input
                type="radio"
                checked={updatetaskYes}
                name="setRadioInputYes"
                onChange={setRadioInputYes}
              />
            </span>
            <span style={{ display: "flex" }}>
              <p style={{ paddingRight: "12px" }}>No</p>
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
        </div> */}
      <div class="col" style = {{ display: "block",
        width: 100,
        padding: 30,
        height: "18px"}}>  <Button
              style={{
                color: "black",border : '5px solid black',
                borderRadius:"8px"           

                
              }}
              variant="success"
              onClick={handleDeleteKey}
            >
              Delete
            </Button>{" "}
            <Modal show={del} onHide={handleDeleteKeyClose}>
              <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to Delete this entry?</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteKeyClose}>
                  No
                </Button>
                <Button variant="primary" onClick={handleDelSubmit}>
                  Yes
                </Button>
              </Modal.Footer>
              </Modal>
          {/* <DialogTitle></DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this entry
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteKeyClose}>Cancel</Button>
            <Button onClick={handleDelSubmit}>Confirm</Button>
          </DialogActions>
        </Dialog></div>    */}</div>
          
      </div>

      
      

      {/*    
      <h4 style={{  display: "block", textAlign: "left", color: "black", marginLeft: "5px" }}>
        {props.is_completed ? <p>Yes </p> : <p>No </p>}
      </h4>
       */}
    </div>
  );
}

export default Task;
