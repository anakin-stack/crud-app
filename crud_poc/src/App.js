import logo from "./logo.svg";
import "./App.css";
import Task from "./components/Task.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
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
  const [TaskOn, setTask] = React.useState("");

  const handleClose = () => setTask(false);
  const handleClick = () => setTask(true);

  const [dueOn, setDue] = React.useState(false);
  const handleDuenot = () => setDue(false);
  const handleDue = () => setDue(true);

  // const handleChange = async (event) => {
  //   setTask(event.target.value);
  //   let handleID = event.target.parentElement.parentElement.className;

  //   console.log("current value of title", TaskOn);

  //   const tskList = { title: TaskOn, is_completed: false };
  //   console.log("sa",tskList);
  //   let reqUrl = "http://127.0.0.1:9000/Tech/create";
  //   await axios
  //     .post(reqUrl, tskList)
  //     .then((res) => {

  //       setTask(res.data);
  //       handleClose();
  //       //window.location.reload();
  //     })
  //     .catch((event) => console.log("E-->", event));
  // };
  //   const handleClose = () => {
  //   setTask(false);
  // }
  
  const [updateCreateResult, setupdateCreateResult] = React.useState(false)
  const [updatetaskYes, setUpdatetaskYes] = React.useState(false);
  const [updatetaskNo, setUpdatetaskNo] = React.useState(true);
  let handleChange = async (event) => {
    //setTask(event.target.value);
    let newEntry = false;

    if (updatetaskYes) {
      newEntry = true;
    } else {
      newEntry= false;
    }
    if (updatetaskNo) {
      newEntry = false;
    } else {
      newEntry = true;
    }
    console.log("current value of title", TaskOn, newEntry);
    const tskList = {  title: TaskOn, is_completed: newEntry };
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
    console.log("Hitting radio 1",updatetaskNo);
   // console.log(updatetaskYes);
   setUpdatetaskYes(true);
   setUpdatetaskNo(false);
   setupdateCreateResult(false);
    console.log("Final rsult ==> ", updateCreateResult)
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

  // let titleData = async function () {
  //   // const proxyurl = "https://cors-anywhere.herokuapp.com/";
  //   let reqUrl = "http://127.0.0.1:9000/Tech";
  //   let res = await axios.get(reqUrl).catch(function (error) {
  //     console.log("This was the error --> ", error);
  //   });
  //   console.log("setting state data now!");
  //   console.log("List tasks now -->", titles);
  //   setTasks(res.data); //set tasks
  //   console.log("List tasks now -->", titles);
  // };

  // let is_completeData = async function () {
  //   let reqUrl = "http://127.0.0.1:9000/Tech";
  //   let res = await axios.get(reqUrl).catch(function (error){
  //     console.log("An error occurred",error);

  //   })
  //  console.log("List", completed);

  //   setTasks(res.data);
  //   console.log("List", completed);

  // };
  useEffect(() => {
    // Anything in here is fired on component mount.
    // console.log("Component example");
    fetchData();
    // titleData();
    //is_completeData();
    // return () => {
    //     // Anything in here is fired on component unmount.
    //     console.log("secondone");
    // }
  }, []);

  return (
    <div className="App">
      {/* // Minimal Elite Blue Color */}
      <header className="App-header">
        {/* // Royal White Color */}
        <div
          style={{
            backgroundColor: "white",
            border: "3px solid grey",
            padding: "10px",
            // width : 100,
            // height:200,
          }}
        >
          {/* This is the playground for your inner "white" part of the app */}
          <h5
            style={{
              color: "black",
            }}
          >
            Task App
          </h5>

          {/* / //<div>
         // <input
            type="text"
            id="message" // TODO:to be changed to unique id for the task in future versions.
            name="message"
            onChange={handleChange}
            value={message}
          /> */}
          <div>
            {/* <input
              type="text"
              id="message" // TODO:to be changed to unique id for the task in future versions.
              name="message"
              onChange={handleChange}
            /> */}
            {/* <Button
              style={{ width: "5px", height: "18px", marginCenter: "80px" }}
              variant="outlined"
              onClick={handleShow}
            >
              Create
            </Button>
            <Dialog show={show} onClose={handleClose}>
              <DialogTitle></DialogTitle>
              <DialogContent>
                <DialogContentText></DialogContentText>
                <TextField
                  autoFocus
                   
                  onChange={(event) => setTask(event.target.value)}
                  margin="dense"
                   
                  label="I"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <p>{TaskOn}</p>

                <TextField
                  autoFocus
                   
                  onChange={(event) => setDue(event.target.value)}
                  margin="dense"
                   
                  label="I"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <p>{dueOn}</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleChange}>Confirm</Button>
              </DialogActions>
            </Dialog> */}
            <button
              onClick={handleShow}
              variant="outlined"
              style={{ color: "black" }}
            >
              Create
            </button>
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
            </Modal>
            <h2></h2>
            <h4
              style={{
                color: "black",
              }}
            >
              Tasks{" "}
            </h4>
                                        
            {/* {tasks.length == 0 ? <h1 style={{color: "black"}}>Loading</h1>: <h2 style={{color: "black"}}>tasks</h2>} */}
            {tasks.map((task) => {
              //console.log("this is the tasks ==> ", task);
              return (
                <Task
                  key={task._id}
                  taskid={task._id}
                  name={task.taskName}
                  is_completed={task.is_completed}
                />
              );
            })}
            <p>{updateCreateResult}</p>
            {/* {taskList} */}
          </div>

          {/* Till here */}
        </div>
      </header>
    </div>
  );
}

// function handleChange() {

// }

// function handleCreate() {
//   console.log();
//   return <h2>{handleChange}</h2>;
// }

// function handleDelete() {
//   console.log("delete clicked");
// }

function handleEdit() {
  console.log("inside edit");
}

export default App;
