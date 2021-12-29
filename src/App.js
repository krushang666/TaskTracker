import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./components/style.css";
import "./components/bootstrap.css";
import TaskInputForm from "./components/TaskInputForm/TaskInputForm";
import Tasks from "./components/Tasks/Tasks";
import { About } from "./components/About/About";
import Login from "./components/Login/Login";
import AuthContext from "./components/storage/auth-context";
import axios from "axios";
import UpdateForm from "./components/UpdateForm/UpdateForm";
function App() {
  // Useful Variables!!

  const baseUrl = "http://localhost:3300/Task/";
  const ctx = useContext(AuthContext);
  const [showForm, setshowForm] = useState(false);
  const [showUpdateForm, setUpdateForm] = useState(false);
  const [tasks, settasks] = useState([]);
  const [location, setlocation] = useState("/");
  const [fetchedData, setfetchedData] = useState({});
  let displayForm;
  let updateForm;

  // Adds New Task

  const onNewTaskHandler = async (data) => {
    axios
      .post(`${baseUrl}addTask`, {
        Task: data,
      })
      .then((success) => {
        alert(success.data);
        fetchTasks();
      });
    setshowForm(false);
  };

  // fetchDataFromId

  const fetchDataFromId = async (id) => {
    const res = await axios.get(`${baseUrl}fetchFromId/${id}`);
    setUpdateForm(true);
    setfetchedData(res.data);
    console.log(res.data);
  };

  //Update Task

  const onUpdateTaskHandler = async (data) => {
    console.log(data);
    axios
      .post(`${baseUrl}updateTask`, {
        id: data.id,
        Task: data.data,
      })
      .then(async (success) => {
        alert(success.data);
        setUpdateForm(false);
        await fetchTasks();
      });
  };

  //Fetch Tasks From Database

  const fetchTasks = async () => {
    const res = await axios.get(baseUrl);
    const data = res.data;
    console.log(data);
    settasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Confirms From showing

  if (showForm) {
    displayForm = (
      <TaskInputForm
        onCancel={() => {
          setshowForm(false);
        }}
        onNewTask={onNewTaskHandler}
      ></TaskInputForm>
    );
  } else {
    displayForm = "";
  }

  // Confirms Update Form showing

  if (showUpdateForm) {
    updateForm = (
      <UpdateForm
        data={fetchedData}
        onCancel={() => {
          setUpdateForm(false);
        }}
        onUpdateTask={onUpdateTaskHandler}
      ></UpdateForm>
    );
  } else {
    updateForm = "";
  }

  // Delete Tasks

  const onDeleteTaskHandler = async (id) => {
    await axios.get(`${baseUrl}deleteTask/${id}`).then((data) => {
      alert(data["data"]);
      fetchTasks();
    });
  };

  // Hides Add Button

  const hideAddButton = () => {
    setlocation("temp");
  };

  // Home Element

  const Home = (props) => {
    setlocation("/");
    return (
      <>
        {updateForm}
        {displayForm}
        {tasks.length !== 0 ? (
          <Tasks
            tasks={tasks}
            onUpdateTask={fetchDataFromId}
            onDeleteTask={onDeleteTaskHandler}
          ></Tasks>
        ) : (
          <h1>No Data To Show!!</h1>
        )}
      </>
    );
  };

  return (
    <Router>
      <div className="container">
        <div className="card m-md-5 m-1">
          <div className="card-header bg-purple">
            <div className="row">
              <div className="col-6">
                <h1 className="title">Task Tracker</h1>
              </div>
              <div className="col-6 text-right">
                {location === "/" && ctx.isLoggedIn && !showUpdateForm && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        ctx.onLogout();
                      }}
                      className="btn btn-dark btn_big"
                    >
                      Logout
                    </button>
                    &nbsp;&nbsp;
                    <button
                      type="button"
                      onClick={() => {
                        setshowForm(true);
                      }}
                      className="btn btn-dark btn_big"
                    >
                      Add
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="card-body p-5 bg-dark text-white">
            <Routes>
              {!ctx.isLoggedIn && (
                <Route path="/" element={<Login></Login>}></Route>
              )}
              {ctx.isLoggedIn && (
                <Route path="/" exact element={<Home></Home>}></Route>
              )}
              <Route path="/about" element={<About></About>} />
            </Routes>
          </div>
          <div className="card-footer bg-purple text-center">
            Copyright &copy; 2021
            <br />
            <Link
              to="/about"
              className="text-white title"
              style={{ fontSize: "2rem" }}
              onClick={hideAddButton}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
