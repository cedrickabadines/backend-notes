import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [appear_button, setAppear_Button] = useState(false);
  const [count, setCount] = useState(0);
  const world = () => {
    alert(`Hello World`);
  };

  const [myData, setMyData] = useState([]);

  const [examObj, setExamObj] = useState({
    id: 0,
    examName: "",
    examCode: "",
    examDescription: "",
    examPassword: "",
  });

  const [myPet, setMyPet] = useState(false);

  const [examDetails, setExamDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/exam-api/get-all-exam")
      .then((res) => {
        setMyData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addExam = (e) => {
    e.preventDefault();
    console.log(examObj);
    axios
      .post("http://localhost:8080/exam-api/create-exam", {
        exam_name: examObj.examName,
        exam_code: examObj.examCode,
        exam_description: examObj.examDescription,
        password: examObj.examPassword,
      })
      .then((res) => {
        setMyData(res.data);
        setExamObj({
          ...examObj,
          examName: "",
          examCode: "",
          examDescription: "",
          examPassword: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteExam = (id) => {
    axios
      .delete(`http://localhost:8080/exam-api/delete-exam/${id}`)
      .then((res) => {
        setMyData(res.data);
        setExamObj({
          ...examObj,
          id: 0,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(id);
  };

  const viewExam = (id) => {
    setMyPet(true);
    axios
      .get(`http://localhost:8080/exam-api/get-exam/${id}`)
      .then((res) => {
        console.log(res.data.findOne.exam_name);
        setExamDetails(res.data);
        setExamObj({
          ...examObj,
          id: id,
          examName: res.data.findOne.exam_name,
          examCode: res.data.findOne.exam_code,
          examDescription: res.data.findOne.exam_description,
          examPassword: res.data.findOne.password,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateExam = () => {
    console.log(examObj.id);
    axios
      .put(`http://localhost:8080/exam-api/update-exam/${examObj.id}`, {
        exam_name: examObj.examName,
        exam_code: examObj.examCode,
        exam_description: examObj.examDescription,
        password: examObj.examPassword,
      })
      .then((res) => {
        setMyData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <a href="https://www.udemy.com/" target="_self">
          <img src={momo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hello World</h1>
      <br />

      <form onSubmit={addExam}>
        {myPet === false ? (
          <>
            <button type="submit">add</button> <br />
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                updateExam();
              }}
            >
              update
            </button>{" "}
            <br />
          </>
        )}

        <input
          type="text"
          placeholder="Enter Exam Name"
          required
          onChange={(e) => setExamObj({ ...examObj, examName: e.target.value })}
          value={examObj.examName}
        />
        <br />
        <input
          type="text"
          placeholder="Enter Exam Code"
          required
          onChange={(e) => setExamObj({ ...examObj, examCode: e.target.value })}
          value={examObj.examCode}
        />
        <br />
        <input
          type="text"
          placeholder="Enter Exam Description"
          required
          onChange={(e) =>
            setExamObj({ ...examObj, examDescription: e.target.value })
          }
          value={examObj.examDescription}
        />
        <br />
        <input
          type="text"
          placeholder="Enter Password"
          required
          onChange={(e) =>
            setExamObj({ ...examObj, examPassword: e.target.value })
          }
          value={examObj.examPassword}
        />
        <br />
      </form>

      <table>
        <thead>
          <th>No.</th>
          <th>Exam Name</th>
        </thead>
        <tbody>
          {myData?.map((data, index) => {
            return (
              <tr key={data.id}>
                <td>{index + 1}</td>
                <td>{data.exam_name}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteExam(data.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      viewExam(data.id);
                    }}
                  >
                    View
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setMyPet(false);
                      setExamObj({
                        ...examObj,
                        examName: "",
                        examCode: "",
                        examDescription: "",
                        examPassword: "",
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
