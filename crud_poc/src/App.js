import logo from "./logo.svg";
import "./App.css";
import Task from "./components/Task.js";

let items = ["task 1", "task 2", "task 3", "task 4", "task 5"];
let taskList = [];
items.forEach((item, index) => {
  taskList.push(<Task />);
});

let taskEl = document.getElementById("edit-tasks");

function App() {
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
            Tasks Application
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
            <input
              type="text"
              id="message" // TODO:to be changed to unique id for the task in future versions.
              name="message"
              onChange={handleChange}
            />
            <button onClick={handleClick}>Update</button>
            <h4
              style={{
                color: "black",
              }}
            >
              Tasks{" "}
            </h4>
            {taskList}

        
          </div>

          {/* Till here */}
        </div>
      </header>
    </div>
  );
}

function handleChange() {}

function handleClick() {
  return <h2>coco</h2>;
}



export default App;
