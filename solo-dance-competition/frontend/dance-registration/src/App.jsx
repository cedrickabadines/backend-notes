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
    fName: "",
    mName: "",
    lName: "",
    age: "",
    gender: "",
    contest: "",
  });

  const [myPet, setMyPet] = useState(false);

  const [taskDetails, setTaskDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/dance-api/get-all")
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
      .post("http://localhost:8080/dance-api/create-dance", {
        first_name: taskObj.fName,
        middle_name: taskObj.mName,
        last_name: taskObj.lName,
        age: taskObj.age,
        gender: taskObj.gender,
        contest: taskObj.contest,
      })
      .then((res) => {
        console.log(res.data);
        setMyData(res.data);
        setTaskObj({
          ...taskObj,
          fName: "",
          mName: "",
          lName: "",
          age: "",
          gender: "",
          contest: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletetask = (id) => {
    axios
      .delete(`http://localhost:8080/dance-api/delete-dance/${id}`)
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
      .get(`http://localhost:8080/dance-api/get/${id}`)
      .then((res) => {
        console.log(res.data);
        setTaskDetails(res.data);
        setTaskObj({
          ...taskObj,
          id: res.data.id,
          fName: res.data.first_name,
          mName: res.data.middle_name,
          lName: res.data.last_name,
          age: res.data.age,
          gender: res.data.gender,
          contest: res.data.contest,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updatetask = () => {
    console.log(taskObj.id);
    axios
      .put(`http://localhost:8080/dance-api/update-dance/${taskObj.id}`, {
        first_name: taskObj.fName,
        middle_name: taskObj.mName,
        last_name: taskObj.lName,
        age: taskObj.age,
        gender: taskObj.gender,
        contest: taskObj.contest,
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
            </button>
            <br />
          </>
        )}

        {/* Fname: "",
    Mname: "",
    LName: "",
    Age: "",
    Gender: "",
    Contest: "", */}

        <input
          type="text"
          placeholder="Enter First Name"
          required
          onChange={(e) => {
            setTaskObj({ ...taskObj, fName: e.target.value });
            console.log(e.target.value);
          }}
          value={taskObj.fName}
        />
        <input
          type="text"
          placeholder="Enter Middle Name"
          required
          onChange={(e) => {
            setTaskObj({ ...taskObj, mName: e.target.value });
            console.log(e.target.value);
          }}
          value={taskObj.mName}
        />
        <input
          type="text"
          placeholder="Enter Last Name"
          required
          onChange={(e) => {
            setTaskObj({ ...taskObj, lName: e.target.value });
            console.log(e.target.value);
          }}
          value={taskObj.lName}
        />
        <input
          type="text"
          placeholder="Age"
          required
          onChange={(e) => {
            setTaskObj({ ...taskObj, age: e.target.value });
            console.log(e.target.value);
          }}
          value={taskObj.age}
        />
        <input
          type="text"
          placeholder="Gender"
          required
          onChange={(e) => {
            setTaskObj({ ...taskObj, gender: e.target.value });
            console.log(e.target.value);
          }}
          value={taskObj.gender}
        />
        <input
          type="text"
          placeholder="Contest"
          required
          onChange={(e) => {
            setTaskObj({ ...taskObj, contest: e.target.value });
            console.log(e.target.value);
          }}
          value={taskObj.contest}
        />

        <br />
      </form>

      <table>
        <thead>
          <th>No.</th>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Contest</th>
        </thead>
        <tbody>
          {myData?.map((data, index) => {
            return (
              <tr key={data.id}>
                <td>{index + 1}</td>
                <td>{data.first_name}</td>
                <td>{data.middle_name}</td>
                <td>{data.last_name}</td>
                <td>{data.age}</td>
                <td>{data.gender}</td>
                <td>{data.contest}</td>
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
                        fName: "",
                        mName: "",
                        lName: "",
                        age: "",
                        gender: "",
                        contest: "",
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
