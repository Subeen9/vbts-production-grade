import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import Landing from "./pages/Landing";
import Posts from "./pages/Posts";
import ViewPost from "./pages/ViewPost";
import "./auth/create-admin";
import "react-toastify/dist/ReactToastify.css";
import { collection, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import SignUp from "./pages/SignUp";
import { database } from "./firebase";
import { get, ref, onValue } from "firebase/database";
import Grades from "./pages/Grades/Grades";
import { Table } from "react-bootstrap";

function App() {
  const AUTO_LOGOUT_TIME = 60 * 30 * 1000; // 30 min
  const [isAuth, setIsAuth] = useState(() => {
    const storedAuth = localStorage.getItem("isAuth");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const [isAdmin, setisAdmin] = useState(false);
  const [isApproved, setIsApproved] = useState(true);
  const uid = localStorage.getItem("uid") || "";
  const [loading, setLoading] = useState(true); // Add loading state
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [data, setData] = useState([]);
  const [grades, setGrades] = useState([]);
  const [inputId, setInputId] = useState("");
  const [inputPasscode, setInputPasscode] = useState("");
  const [matchingId, setMatchingId] = useState(null);
  const [matchingPasscode, setMatchingPasscode] = useState(null);

  useEffect(() => {
    // Reference to your database path
    const databaseRef = ref(database, "/vbts/grade-post/student");
    const gradeDatabaseRef = ref(database, "/vbts/grade-post/grade-entry");

    // Fetch data from the database
    onValue(databaseRef, (snapshot) => {
      const fetchedData = snapshot.val();
      if (fetchedData) {
        setData(Object.values(fetchedData));
      }
    });

    onValue(gradeDatabaseRef, (snapshot) => {
      const fetchedData = snapshot.val();
      if (fetchedData) {
        setGrades(Object.values(fetchedData));
      }
    });

    console.log("THE DATA IS ", data);

    return () => {
      // Unsubscribe the event listener when component unmounts
      // off(databaseRef);
    };
  }, []);

  const Unauthorized = () => {
    toast.error("Unauthorized!!!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const Unverified = () => {
    toast.error(
      "USER NOT APPROVED!!! Please contact with the admin to get the approval !!!",
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        theme: "colored",
      }
    );
  };

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };

  useEffect(() => {
    const userDocRef = collection(db, process.env.REACT_APP_ADMIN_USERS);

    const checkAdmin = async () => {
      const getUser = await getDocs(userDocRef);

      getUser.forEach((currentUser) => {
        if (currentUser.data().id === uid) {
          if (currentUser.data().isAdmin === true) {
            setisAdmin(true);
          }
        }
      });
    };

    const checkApproved = async () => {
      const getUser = await getDocs(userDocRef);
      getUser.forEach((currentUser) => {
        if (currentUser.data().id === uid) {
          if (currentUser.data().isApproved === true) {
            setIsApproved(true);
          } else {
            setIsApproved(false);
          }
        }
      });
    };

    const checkLoading = async () => {
      await Promise.all([checkAdmin(), checkApproved()]);
      setLoading(false);
    };
    checkLoading();
  }, [uid]);

  useEffect(() => {
    let timer;
    const handleUserActivity = () => {
      clearTimeout(timer);
      timer = setTimeout(() => signUserOut(), AUTO_LOGOUT_TIME);
    };
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);

    return () => {
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
    };
  }, [AUTO_LOGOUT_TIME]);

  if (loading) {
    return <div></div>; // Render loading state while checking admin status
  }

  const handleInputId = (event) => {
    setInputId(event.target.value);
  };
  const handleInputPasscode = (event) => {
    setInputPasscode(event.target.value);
  };

  const handleButtonClick = () => {
    const inputIdAsNumber = parseInt(inputId);

    const foundId = data
      ? data.find((item) => item.t1key110 === inputIdAsNumber)
      : null;

    const foundPasscode = data
      ? data.find((item) => item.t1key112 === inputPasscode)
      : null;

    setMatchingId(foundId);
    setMatchingPasscode(foundPasscode);
  };

  console.log({ data });
  console.log({ grades });

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="logo" style={{ position: "absolute", top: "1px" }}>
            <img
              src="/secure.png"
              alt="Secure Logo"
              height="50px"
              width="50px"
            />
          </div>
          <Link
            className="navbar-brand"
            to="/"
            style={{ marginLeft: "55px", color: "orange" }}
          >
            SECURE
          </Link>
          <button
            className="navbar-toggler"
            style={{ paddingBottom: "20px" }}
            type="button"
            onClick={handleToggle}
            aria-expanded={!isCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`bg-dark collapse navbar-collapse${
              isCollapsed ? "" : " show"
            }`}
            id="navbarNavAltMarkup"
          >
            <div onClick={handleToggle} className="bg-dark navbar-nav ms-auto">
              <Link to="/" className="nav-link" aria-current="page">
                Home
              </Link>

              {isAuth ? (
                <>
                  {isApproved && (
                    <>
                      {/* <Link to="/posts" className="nav-link">
                        Post
                      </Link> */}
                      {isAdmin && (
                        <>
                          {/* <Link to="/createpost" className="nav-link">
                            Create Post
                          </Link> */}
                          <Link to="/admindashboard" className="nav-link">
                            Admin
                          </Link>
                        </>
                      )}
                    </>
                  )}
                  <Link
                    className="nav-link"
                    onClick={signUserOut}
                    style={{ cursor: "pointer" }}
                  >
                    Log Out
                  </Link>
                </>
              ) : (
                <Link to="/login" className="nav-link ">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <ToastContainer />
      {isAuth ? (
        <>
          {isApproved ? (
            <Routes>
              <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Landing isAuth={isAuth} />} />
              <Route
                path="/posts"
                element={<Posts isAuth={isAuth} isAdmin={isAdmin} />}
              />
              <Route path="/view" element={<ViewPost />} />
              {/* {isAdmin ? (
                <>
                  <Route
                    path="/createpost"
                    element={<CreatePost isAuth={isAuth} />}
                  />
                  <Route
                    path="/admindashboard"
                    element={<Admin isAuth={isAuth} />}
                  />
                </>
              ) : (
                <Route path="/createpost" element={<Unauthorized />} />
              )} */}
            </Routes>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Landing isAuth={isAuth} />
                    <Unverified />
                  </>
                }
              />
              <Route path="/posts" element={<Unverified />} />
              <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            </Routes>
          )}
        </>
      ) : (
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Landing isAuth={isAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      )}
      <div className="d-flex justify-content-center">
        <div
          className="p-4 mt-4"
          style={{
            background: "#fff",
            border: "1px solid #fff",
            borderRadius: "8px",
            boxShadow: "2px 2px 10px -1px #b9b3b3",
          }}
        >
          <p className="text-center">Enter your ID and Passcode</p>
          <input
            className="text-center"
            type="text"
            value={inputId}
            onChange={handleInputId}
            placeholder="Your ID"
          />
          <input
            className="text-center"
            type="text"
            value={inputPasscode}
            onChange={handleInputPasscode}
            placeholder="Your Passcode"
          />
          <button
            className="btn-primary border-0 text-white text-center mt-4"
            onClick={handleButtonClick}
          >
            Check Input
          </button>
        </div>
      </div>
      {matchingId !== undefined &&
      matchingId !== null &&
      matchingPasscode !== undefined &&
      matchingPasscode !== null ? (
        <div className="d-flex justify-content-center">
          <div
            className="p-4 mt-4"
            style={{
              background: "#fff",
              border: "1px solid #fff",
              borderRadius: "8px",
              boxShadow: "2px 2px 10px -1px #b9b3b3",
            }}
          >
            <div className="d-flex justify-content-end">
              <div>
                <div>
                  <p>
                    <strong>{data[0].t1key110}:&nbsp;</strong>
                    <span>{matchingId.t1key110}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <strong>{data[0].t1item120}:&nbsp;</strong>
                    <span>{matchingId.t1item120}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <strong>{data[0].t1item130}:&nbsp;</strong>
                    <span>{matchingId.t1item130}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <strong>{data[0].t1item140}:&nbsp;</strong>
                    <span>{matchingId.t1item140}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <strong>{data[0].t1item150}:&nbsp;</strong>
                    <span>{matchingId.t1item150}</span>
                    {matchingId.t1key112}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Table responsive="md" striped bordered hover size="sm">
                <thead>
                  <tr style={{ fontSize: "16px", color: "#777" }}>
                    <th style={{ color: "#777" }}>{grades[0].t2item110}</th>
                    <th style={{ color: "#777" }}>{grades[0].t2item130}</th>
                    <th style={{ color: "#777" }}>{grades[0].t2item140}</th>
                    <th style={{ color: "#777" }}>{grades[0].t2item150}</th>
                    <th style={{ color: "#777" }}>{grades[0].t2item160}</th>
                    <th style={{ color: "#777" }}>{grades[0].t2item170}</th>
                    <th style={{ color: "#777" }}>{grades[0].t2item180}</th>
                    <th style={{ color: "#777" }}>{grades[0].t2item190}</th>
                  </tr>
                </thead>
                {grades.slice(2).map((grade) => {
                  return (
                    <tbody>
                      {grade.t2key120 === matchingId.t1key110 ? (
                        <tr style={{ fontSize: "15px" }}>
                          <td>{grade.t2item110}</td>
                          <td>{grade.t2item130}</td>
                          <td>{grade.t2item140}</td>
                          <td>{grade.t2item150}</td>
                          <td>{grade.t2item160}</td>
                          <td>{grade.t2item170}</td>
                          <td>{grade.t2item180}</td>
                          <td>{grade.t2item190}</td>
                        </tr>
                      ) : (
                        <></>
                      )}
                    </tbody>
                  );
                })}
              </Table>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
