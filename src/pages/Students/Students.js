import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./Students.css";
import {
  FaUserTie,
  FaPencilAlt,
  FaUniversity,
  FaPhone,
  FaEnvelopeOpen,
  FaRegCalendarTimes,
} from "react-icons/fa";
import { database, db } from "../../firebase";
import { ref, set } from "firebase/database";


const Students = ({ matchingId, data, handleLogOut}) => {
  const [t1key110, sett1key110] = useState(matchingId.t1key110);
  const [t1item120, setName] = useState(matchingId.t1item120);
  const [t1item130, setProgram] = useState(matchingId.t1item130);
  const [t1item140, setPhone] = useState(matchingId.t1item140);
  const [t1item150, setEmail] = useState(matchingId.t1item150);
  const [t1item160, setRegistrationDate] = useState(matchingId.t1item160);
  const [saveData, setSaveData] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  let isEditing = false;
  if (saveData) {
    set(ref(database, `vbts/updatedData/${t1key110}`), {
      t1key110: t1key110,
      t1item120: t1item120,
      t1item130: t1item130,
      t1item140: t1item140,
      t1item150: t1item150,
    })
      .catch((e) => {
        console.log("SAVING ERROR", e);
      })
      .then(() => console.log("DATA POSTED SUCCESSFULLY"));
    console.log("DATA SAVED");
  }

  console.log("🚀 ~ file: Students.js:7 ~ Students ~ t1key110:", t1key110);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      saveData();
      console.log("DATA SAVED")
    }
  };
  try {
    var time = t1item160.slice(0,10) + " :" + t1item160.slice(11,16)
    
  } catch (error) {
    console.log(error);
  }
  const handleEdit = () => {
    setIsEdit(!isEdit);
    if(isEdit){
      setSaveData(true);
    }
    
  }
  
  return (
    <>
      <div className="form-heading">
        <h2>Student Registration </h2>
        <button
        type="button"
          className="btn btn-danger "
          style={{padding:"7px",position:"absolute",top:"15px",right:"15px"}}
          onClick={handleLogOut}
        >
          Sign out
        </button>
      </div>
      <div className="Student-form">
        <div className="form-box">
          <Form onSubmit={handleSubmit} className="main">
            <FaUserTie />
            <Form.Label className="form-label">{data[0].t1key110}</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              value={t1key110}
              readOnly
              onChange={(event) => {
                sett1key110(event.target.value);
              }}
            />
          </Form>
          <Form onSubmit={handleSubmit} className="main">
            <FaPencilAlt />
            <Form.Label className="form-label">{data[0].t1item120}</Form.Label>
            <Form.Control
              className={isEdit ? "editable" : "form-control"}
              type="text"
              value={t1item120}
              onChange={(event) => {
                setName(event.target.value);
              }}
              readOnly={!isEdit}
            />
          </Form>
          <Form onSubmit={handleSubmit} className="main">
            <FaUniversity />
            <Form.Label className="form-label">{data[0].t1item130}</Form.Label>
            <Form.Control
              className={isEdit ? "editable" : "form-control"}
              type="text"
              value={t1item130}
              onChange={(event) => {
                setProgram(event.target.value);
              }}
              readOnly={!isEdit}
            />
          </Form>
          <Form onSubmit={handleSubmit} className="main">
            <FaPhone />
            <Form.Label className="form-label">{data[0].t1item140}</Form.Label>
            <Form.Control
              className={isEdit ? "editable" : "form-control"}
              type="text"
              value={t1item140}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              readOnly={!isEdit}
            />
          </Form>
          <Form onSubmit={handleSubmit} className="main">
            <FaEnvelopeOpen />

            <Form.Label className="form-label">{data[0].t1item150}</Form.Label>
            <Form.Control
              className={isEdit ? "editable" : "form-control"}
              type="text"
              value={t1item150}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              readOnly={!isEdit}
            />
          </Form>
          <Form onSubmit={handleSubmit} className="main ">
            <FaRegCalendarTimes />
            <Form.Label className="form-label">{data[0].t1item160}</Form.Label>
            <Form.Control
              className="form-control"
              type="text"
              readOnly
              value={time}
              onChange={(event) => {
                setRegistrationDate(event.target.value);
              }}
            />
          </Form>
        </div>
      </div>
      <div className="editButton">
      <button
                className={isEdit ? "btn btn-success" : "btn btn-info"}
                style={{ border: "none", padding: "4px 4px" }}
                onClick={handleEdit}
              >
                {isEdit ? "Save Data" : "Edit Data"}
              </button>{" "}
              </div>
    </>
  );
};

export default Students;
