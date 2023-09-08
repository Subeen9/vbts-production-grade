import "bootstrap/dist/css/bootstrap.css";
// import "./App.css";
// import { Routes} from "react-router-dom";
// import Login from "./pages/Login";
import { useEffect, useState } from "react";
// import { signOut } from "firebase/auth";
// import { auth, db } from "./firebase";
// import Landing from "./pages/Landing";
// import Posts from "./pages/Posts";
// import ViewPost from "./pages/ViewPost";
// import "./auth/create-admin";
import "react-toastify/dist/ReactToastify.css";
// import { collection, getDocs } from "firebase/firestore";
// import { ToastContainer, toast } from "react-toastify";
// import SignUp from "./pages/SignUp";
// import { database } from "./firebase";
// import { ref, onValue } from 'firebase/database';

const Grades = () =>  {

    // const [data, setData] = useState([]);
    // const [grades,setGrades] = useState([]);

    // useEffect(() => {
    //     // Reference to your database path
    //     const databaseRef = ref(database, '/vbts/app1/students');
    //     const gradeDatabaseRef = ref(database,'vbts/app1/grades')
    
    //     // Fetch data from the database
    //     onValue(databaseRef, (snapshot) => {
    //       const fetchedData = snapshot.val();
    //       if (fetchedData) {
    //         setData(Object.values(fetchedData));
    //       }
    //     });
    
    //     onValue(gradeDatabaseRef, (snapshot) => {
    //       const fetchedData = snapshot.val();
    //       if (fetchedData) {
    //         setGrades(Object.values(fetchedData));
    //       }
    //     });
    
    //     console.log('THE DATA IS ',data)
    
    //     return () => {
    //       // Unsubscribe the event listener when component unmounts
    //       // off(databaseRef);
    //     };
    //   }, [data]);

  return (
    <>
    {/* {grades}{data} */}
    </>
  );
}

export default Grades;