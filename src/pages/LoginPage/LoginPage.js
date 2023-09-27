import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Grades from "../Grades/Grades";
import Students from "../Students/Students";
import { auth, db } from "../../firebase";
import { database } from "../../firebase";
import { ref, onValue } from "firebase/database";

const LoginPage = () => {

  const [matchingId, setMatchingId] = useState(null);
  const [matchingPasscode, setMatchingPasscode] = useState(null);
  const [matchingDob, setMatchingDob] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);

  const [data, setData] = useState([]);
  const [grades, setGrades] = useState([]);
  const [inputId, setInputId] = useState("");
  const [inputPasscode, setInputPasscode] = useState("");
  const [inputDob, setInputDob] = useState("");

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

    return () => {
      // Unsubscribe the event listener when component unmounts
      // off(databaseRef);
    };
  }, []);

  const handleInputId = (event) => {
    setInputId(event.target.value);
  };
  const handleInputPasscode = (event) => {
    setInputPasscode(event.target.value);
  };
  const handleInputDob = (event) => {
    setInputDob(event.target.value);
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
    if (foundId && foundPasscode) {
      setShowLogin(false);
      setShowTable(true);
      toast.success("Successfully Logged In");
    } else if (!foundId && foundPasscode) {
      toast.error("ID invalid");
    } else if (!foundPasscode && foundId) {
      toast.error("Passcode invalid");
    } else {
      toast.error("Id and Passcode invalid");
    }
  };

  const handleSearch = () => {
    setShowLogin(true);
    setShowTable(false);
    setInputId("");
    setInputPasscode("");
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setShowLogin(false);
  };

  const handleShowPasscode = () => {
    const inputIdAsNumber = parseInt(inputId);

    const foundId = data
      ? data.find((item) => item.t1key110 === inputIdAsNumber)
      : null;
    const foundDob = data
      ? data.find((item) => item.t1item170 === inputDob)
      : null;
    if (!foundId && foundDob) {
      toast.error("Id invalid");
    } else if (!foundDob && foundId) {
      toast.error("Date of birth invalid");
    } else if (!foundId && !foundDob) {
      toast.error("Id and Dob invalid");
    } else {
    }
    setMatchingId(foundId);
    setMatchingDob(foundDob);
    setShowPasscode(true);
  };

  const handleLoginButton = () => {
    setShowForgotPassword(false);
    setShowLogin(true);
    setShowPasscode(false);
    setInputId("");
    setInputDob("");
  };

    return(
        <>
         {showLogin && (
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
                {/* this is for the top part */}
                <Students matchingId={matchingId} data={data} />
                {/* this is for the table part */}
                <Grades matchingId={matchingId} grades={grades} />
            </div>
            </div>
        ) : (
            <></>
        )}
      </>
    )
}

export default LoginPage;