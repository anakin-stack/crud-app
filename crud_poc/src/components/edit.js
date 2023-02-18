import React from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


// function  Task(props) {
//     async function handleEdit(e) {
//         let editID = e.target.parentElement.parentElement.className;
    
//         console.log("current value of the task")
//         const tskList = {"id": editID}
//         console.log(tskList)
//         let reqUrl = "http://127.0.0.1:9000/Tech/edit";
//         await axios.post(reqUrl, tskList).then((res) => {
//           handleClose();
//         }).catch((e) => console.log("E-->",e));
//         window.location.reload();
//       }
//       return (
//         <div className={props.taskid} style={{ border: "2px solid grey", marginBottom: "10px" ,fontSize:"10px", paddingBlock:"5px"}}>
//           <p style={{ textAlign: "left", color: "black",marginLeft: "5px" }}>{props.name}</p>
//           <p> <button
//                 id="edit-tasks"
//                 onClick={handleEdit}
//                 style={{ marginLeft: "110px" }}
//               >
//                 Edit
//               </button></p>
//           <p>    <button id="delete-task" onClick={handleDelete} style = {{marginLeft:"100px"}}>
//                 Delete
//               </button> </p>
//           <p style={{ textAlign: "left", color: "black",marginLeft: "5px" }}>{props.titleEL}</p>
//           <p style={{ textAlign: "left", color: "black",marginLeft: "5px" }}>{props.is_completeD? <p>Yes </p>:<p>No </p>}</p>
         
              
               
//         </div>
//       );
    
//   }
  
//   export default Task;


export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit task and Due
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button  style={{ marginLeft: "100px" }} variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

