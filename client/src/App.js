import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import Task from "./components/Task.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";

import handleChecked from "./components/Task.js";
import DateTime from "./components/dateTime";
import { textAlign } from "@mui/system";

// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

// Below code is for making dummy data for initial rendering!
// let items = ["task 1", "task 2", "task 3", "task 4", "task 5"];
// let taskList = [];
// items.forEach((item, index) => {
//   taskList.push(<Task key={item}/>);
// });

let taskEl = document.getElementById("edit-tasks");



function App() {
  // const handleDeleteKeyClose = async (e) => {
  //   setDel(false);
  // };

  const [TaskOn, setTask] = React.useState("");

  const handleClose = () => setTask(false);
  

  const handleClick = () => setTask(true);
  const [DelTasklst, setDelTasklst] = React.useState([]);
  const [dueOn, setDue] = React.useState(false);
  const handleDuenot = () => setDue(false);
  const handleDue = () => setDue(true);

  const [updateCreateResult, setupdateCreateResult] = React.useState(false);
  const [updatetaskYes, setUpdatetaskYes] = React.useState(false);
  const [updatetaskNo, setUpdatetaskNo] = React.useState(true);
  let handleChange = async (event) => {
    //setTask(event.target.value);
    let newEntry = false;

    if (updatetaskYes) {
      newEntry = true;
    } else {
      newEntry = false;
    }
    if (updatetaskNo) {
      newEntry = false;
    } else {
      newEntry = true;
    }
    console.log("current value of title", TaskOn, newEntry);
    const tskList = { title: TaskOn, is_completed: newEntry };
    console.log("hitting API");
    let reqUrl = "http://127.0.0.1:9000/Tech/create";
    await axios
      .post(reqUrl, tskList)
      .then((res) => {
        setTask(res.data); //set tasks
        handleClose();
        window.location.reload();
      })
      .catch((e) => console.log("E-->", e));
  };
  let setRadioInputYes = function (e) {
    console.log("Hitting radio 1", updatetaskNo);
    // console.log(updatetaskYes);
    setUpdatetaskYes(true);
    setUpdatetaskNo(false);
    setupdateCreateResult(false);
    console.log("Final rsult ==> ", updateCreateResult);
  };
  let setRadioInputNo = function (e) {
    console.log("Hitting radio 2");
    console.log(updatetaskNo);
    // e.target.value gives you on/off, and not true/false
    setUpdatetaskYes(false);
    setUpdatetaskNo(true);
    setupdateCreateResult(true);
  };

  const [show, setShow] = useState(false);
  const handleEnd = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    console.log("current value of show --> ", show);
  };

  const [delmultKey, setdelmultKey] = useState(false);
  const handledelmulKey = () => setdelmultKey(false);
  const handledelmulKeyshow = () => {
    setdelmultKey(true);
    console.log("current value of delmultKey --> ", delmultKey);
  };

  const [delMul, setdelMul] = useState([]);
  let handleDelMultiple = async(e) => {
    setdelMul(true);
    console.log("userinfo", userinfo)
    const tskList = {id: userinfo.languages}
    
    console.log("multikdeletekey", tskList)
    let reqUrl = "http://127.0.0.1:9000/Tech/Del";
    await axios
    .post(reqUrl, tskList)
    .then((res) => {
      //window.location.reload();
      handleClose();
    })
    .catch((e) => console.log("E-->", e));
    setdelMul(false)
    window.location.reload(); 

    
  }

  const [userinfo, setUserInfo] = React.useState({
    languages: [],
    response: [],
  });

  const handleChecked = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { languages } = userinfo;


    const checkBoxItems = DelTasklst;
    console.log("running")

    console.log(`${value} is ${checked}`, "checked");
     
    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        languages: [...languages, value],
        response: [...languages, value],
      });
      checkBoxItems.push(value);
      console.log("checked", checkBoxItems);
      setDelTasklst(checkBoxItems)
    }



    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        languages: languages.filter((e) => e !== value),
        response: languages.filter((e) => e !== value),
      });
      checkBoxItems.pop(value);
      console.log("checkpop", checkBoxItems);
      setDelTasklst(checkBoxItems)
    }
  };


  

  const [tasks, setTasks] = useState([]);

  // Below code is for making a list of real tasks (Present in the databse)
  let fetchData = async function () {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let reqUrl = "http://127.0.0.1:9000/Tech";
    let res = await axios.get(reqUrl).catch(function (error) {
      console.log("This was the error --> ", error);
    });
    console.log(res.data);
    setTasks(res.data.reverse()); //set tasks
  };

  let setRadioInput = function (e) {
    console.log("This is e --> ", e);

    // setDue(e.target.value)
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {/* // Minimal Elite Blue Color */}
      <header className="App-header">
        {/* // Royal White Color */}
        <div
          style={{
            backgroundColor: "white",
            border: "3px black",
            padding: "2px",
            marginTop:"-2px"
            // width : 100,
            // height:200,
          }}
        >
          {/* This is the playground for your inner "white" part of the app */}
          <h1
            style={{
              display:"inline-block",
              color: "black",marginLeft: "350px",
             
              borderBlockEnd  : '6px solid grey',
              
            }}
          >
            Basic Task Manager App
          </h1>

          <div>
            <h1>
            <Button style={{
                color: "black",marginLeft: "37px",
                border : '5px solid black'
              }}
               variant="success" onClick={handleShow}>
              Create
            </Button>{" "}
            <Modal show={show} onHide={handleEnd}>
              <Modal.Header closeButton>
                <Modal.Title>Create a new Entry</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  type="text"
                  placeholder="Task Name"
                  onChange={(event) => setTask(event.target.value)}
                />
                <p>{TaskOn}</p>

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
                <p>Status</p>
                <p>{updateCreateResult}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleEnd}>
                  No
                </Button>
                <Button variant="primary" onClick={handleChange}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal></h1>
            <h2><Button
              style={{
                color: "black",
                marginLeft: "37px",
                border : '5px solid black'              }}
              variant="success"
              onClick={handledelmulKeyshow}
            >
              Task List
            </Button>{" "}
            <Modal show={delmultKey} onHide={handledelmulKey}>
              <Modal.Header closeButton>
                <Modal.Title>Select An Entry</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {tasks.length > 0 && (
                  <h3>
                    {tasks.map((user) => (
                      <li key={user._id}>{user.taskName} <input type="checkbox" value={user._id} onChange={handleChecked}/></li>
                    ))}
                  </h3>
                )}

                
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handledelmulKey}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleDelMultiple}>
                  Delete All
                </Button>
              </Modal.Footer>
            </Modal></h2>
            {/* <h4>  
            
              Tasks{" "}
                     </h4> */}
            
            {/* {tasks.length == 0 ? <h1 style={{color: "black"}}>Loading</h1>: <h2 style={{color: "black"}}>tasks</h2>} */}
            {tasks.map((task) => {
              //console.log("this is the tasks ==> ", task);
              return (
                
                <ul><Task     
                  
                  key={task._id}
                  taskid={task._id}
                  name={task.taskName}
                  is_completed={task.is_completed}
                /></ul>
              );
            })}
            

            
            {/* <p>{updateCreateResult}</p> */}
            {/* <Button variant="success" onClick={bulkEdit} value= "">Edit</Button> {' '}
            <Button variant="success" onClick={bulkDelete} value= "">Delete</Button> {' '} */}
            {/* {taskList} */}
          </div>

          {/* Till here */}
        </div>
      </header>
    </div>
  );
}

function handleEdit() {
  console.log("inside edit");
}

//export default BasicExample;

export default App;
