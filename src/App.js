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
import { ref, onValue } from "firebase/database";
// import Grades from "./pages/Grades/Grades";
// import Students from "./pages/Students/Students"
import LoginPage from "./pages/LoginPage/LoginPage";

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
  // const [isCollapsed, setIsCollapsed] = useState(true);
  // const [data, setData] = useState([]);
  // const [grades, setGrades] = useState([]);
  // const [inputId, setInputId] = useState("");
  // const [inputPasscode, setInputPasscode] = useState("");
  // const [inputDob, setInputDob] = useState("");
  // const [matchingId, setMatchingId] = useState(null);
  // const [matchingPasscode, setMatchingPasscode] = useState(null);
  // const [matchingDob, setMatchingDob] = useState(null);
  // const [showLogin, setShowLogin] = useState(true);
  // const [showTable, setShowTable] = useState(false);
  // const [showForgotPassword, setShowForgotPassword] = useState(false);
  // const [showLoginButton, setShowLoginButton] = useState(false);
  // const [showPasscode, setShowPasscode] = useState(false);

  // useEffect(() => {
  //   // Reference to your database path
  //   const databaseRef = ref(database, "/vbts/grade-post/student");
  //   const gradeDatabaseRef = ref(database, "/vbts/grade-post/grade-entry");

  //   // Fetch data from the database
  //   onValue(databaseRef, (snapshot) => {
  //     const fetchedData = snapshot.val();
  //     if (fetchedData) {
  //       setData(Object.values(fetchedData));
  //     }
  //   });

  //   onValue(gradeDatabaseRef, (snapshot) => {
  //     const fetchedData = snapshot.val();
  //     if (fetchedData) {
  //       setGrades(Object.values(fetchedData));
  //     }
  //   });

  //   return () => {
  //     // Unsubscribe the event listener when component unmounts
  //     // off(databaseRef);
  //   };
  // }, []);

  // const Unauthorized = () => {
  //   toast.error("Unauthorized!!!", {
  //     position: toast.POSITION.TOP_CENTER,
  //   });
  // };

  // const handleToggle = () => {
  //   setIsCollapsed(!isCollapsed);
  // };

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

  // const handleInputId = (event) => {
  //   setInputId(event.target.value);
  // };

  // const handleInputPasscode = (event) => {
  //   setInputPasscode(event.target.value);
  // };

  // const handleInputDob = (event) => {
  //   setInputDob(event.target.value);
  // };

  // const handleButtonClick = () => {
  //   const inputIdAsNumber = parseInt(inputId);

  //   const foundId = data
  //     ? data.find((item) => item.t1key110 === inputIdAsNumber)
  //     : null;

  //   const foundPasscode = data
  //     ? data.find((item) => item.t1key112 === inputPasscode)
  //     : null;

  //   setMatchingId(foundId);
  //   setMatchingPasscode(foundPasscode);
  //   if (foundId && foundPasscode) {
  //     setShowLogin(false);
  //     setShowTable(true);
  //     toast.success("Successfully Logged In");
  //   } else if (!foundId && foundPasscode) {
  //     toast.error("ID invalid");
  //   } else if (!foundPasscode && foundId) {
  //     toast.error("Passcode invalid");
  //   } else {
  //     toast.error("Id and Passcode invalid");
  //   }
  // };

  // const handleSearch = () => {
  //   setShowLogin(true);
  //   setShowTable(false);
  //   setInputId("");
  //   setInputPasscode("");
  // };

  // const handleForgotPassword = () => {
  //   setShowForgotPassword(true);
  //   setShowLogin(false);
  // };

  // const handleShowPasscode = () => {
  //   const inputIdAsNumber = parseInt(inputId);

  //   const foundId = data
  //     ? data.find((item) => item.t1key110 === inputIdAsNumber)
  //     : null;
  //   const foundDob = data
  //     ? data.find((item) => item.t1item170 === inputDob)
  //     : null;
  //   if (!foundId && foundDob) {
  //     toast.error("Id invalid");
  //   } else if (!foundDob && foundId) {
  //     toast.error("Date of birth invalid");
  //   } else if (!foundId && !foundDob) {
  //     toast.error("Id and Dob invalid");
  //   } else {
  //   }
  //   setMatchingId(foundId);
  //   setMatchingDob(foundDob);
  //   setShowPasscode(true);
  // };

  // const handleLoginButton = () => {
  //   setShowForgotPassword(false);
  //   setShowLogin(true);
  //   setShowPasscode(false);
  //   setInputId("");
  //   setInputDob("");
  // };

  return (
    <>
    {/* <NavBar/> */}
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
      {/* {showLogin && (
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
            <div className="d-flex justify-content-center mt-4">
              <button
                className="border-0 text-center"
                onClick={handleButtonClick}
              >
                Show grades
              </button>
            </div>
            <div className="d-flex justify-content-center">
              <button className="border-0 mt-4" onClick={handleForgotPassword}>
                Forgot Passcode?
              </button>
            </div>
          </div>
        </div>
      )}
      {showForgotPassword && (
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
            <p className="text-center">Enter your ID and Date of Birth</p>
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
              value={inputDob}
              onChange={handleInputDob}
              placeholder="Your Date of Birth (MM/DD/YY)"
            />
            <div className="d-flex justify-content-center">
              <button
                className="border-0 text-center mt-4"
                onClick={handleShowPasscode}
              >
                Show Passcode
              </button>
            </div>
          </div>
        </div>
      )}
      {showPasscode && matchingId !== undefined && matchingDob !== undefined ? (
        <div className="d-flex flex-column text-center mt-4">
          <div>
            <p>
              Your passcode is: <strong>{matchingId.t1key112}</strong>
            </p>
          </div>
          <div className="mt-2">
            <button className="border-0" onClick={handleLoginButton}>
              Login
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      {showTable &&
      matchingId !== undefined &&
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
            <div>
              <button onClick={handleSearch}>Sign out</button>
            </div>
            <Students matchingId={matchingId} data={data} />
            <Grades matchingId={matchingId} grades={grades} />
          </div>
        </div>
      ) : (
        <></>
      )} */}
      <LoginPage></LoginPage>
    </>
  );
}

export default App;
