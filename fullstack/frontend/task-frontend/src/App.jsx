import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [appear_button, setAppear_Button] = useState(false);
  const [count, setCount] = useState(0);

  const [myData, setMyData] = useState([]);

  const [taskObj, setTaskObj] = useState({
    id: 0,
    taskName: "",
  });

  const [myPet, setMyPet] = useState(false);

  const [taskDetails, setTaskDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/task-api/get")
      .then((res) => {
        console.log(res.data);
        setMyData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addtask = (e) => {
    e.preventDefault();
    console.log(`Hello`);
    axios
      .post("http://localhost:8080/task-api/create-task", {
        task_name: taskObj.taskName,
      })
      .then((res) => {
        setMyData(res.data);
        setTaskObj({
          ...taskObj,
          taskName: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletetask = (id) => {
    axios
      .delete(`http://localhost:8080/task-api/delete-task/${id}`)
      .then((res) => {
        console.log(res.data);
        setMyData(res.data.data);
        setTaskObj({
          ...taskObj,
          id: 0,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(id);
  };

  const viewtask = (id) => {
    setMyPet(true);
    axios
      .get(`http://localhost:8080/task-api/getById/${id}`)
      .then((res) => {
        console.log(res.data.task);
        setTaskDetails(res.data);
        setTaskObj({
          ...taskObj,
          id: id,
          taskName: res.data.task,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updatetask = () => {
    console.log(taskObj.id);
    axios
      .put(`http://localhost:8080/task-api/update-task/${taskObj.id}`, {
        task_name: taskObj.taskName,
      })
      .then((res) => {
        setMyData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Hello World</h1>
      <br />

      <form onSubmit={addtask}>
        {myPet === false ? (
          <>
            <button type="submit">add</button> <br />
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                updatetask();
              }}
            >
              update
            </button>{" "}
            <br />
          </>
        )}

        <input
          type="text"
          placeholder="Enter task Name"
          required
          onChange={(e) => {
            setTaskObj({ ...taskObj, taskName: e.target.value });
            console.log(e.target.value);
          }}
          value={taskObj.taskName}
        />

        <br />
      </form>

      <table>
        <thead>
          <th>No.</th>
          <th>task Name</th>
        </thead>
        <tbody>
          {myData?.map((data, index) => {
            return (
              <tr key={data.id}>
                <td>{index + 1}</td>
                <td>{data.task}</td>
                <td>
                  <button
                    onClick={() => {
                      deletetask(data.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      viewtask(data.id);
                    }}
                  >
                    View
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setMyPet(false);
                      setTaskObj({
                        ...taskObj,
                        taskName: "",
                      });
                    }}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1),
              appear_button === true
                ? setAppear_Button(false)
                : setAppear_Button(true);
          }}
        >
          count isss {count}
        </button>{" "}
        <br />
        {appear_button === true ? (
          <button
            onClick={() => {
              alert(`Hi Universe`);
            }}
          >
            Click Me!
          </button>
        ) : (
          ""
        )}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
