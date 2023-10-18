import React, { useState } from "react";
import { Form } from "react-bootstrap";
import './StudentForm.css';
import {FaUserTie} from "react-icons/fa";
import { FaPencilAlt } from 'react-icons/fa';
import {FaUniversity} from 'react-icons/fa';
import {FaPhone} from 'react-icons/fa';
import {FaEnvelopeOpen} from 'react-icons/fa';
import {FaRegCalendarTimes} from 'react-icons/fa';

const Students = ({ matchingId, data, isEdit, saveData }) => {
  const [t1key110, sett1key110] = useState(matchingId.t1key110);
  const [t1item120, setName] = useState(matchingId.t1item120);
  const [t1item130, setProgram] = useState(matchingId.t1item130);
  const [t1item140, setPhone] = useState(matchingId.t1item140);
  const [t1item150, setEmail] = useState(matchingId.t1item150);
  const [t1item160, setRegistrationDate] = useState(matchingId.t1item160);
  let isEditing = false;
  


  console.log("🚀 ~ file: Students.js:7 ~ Students ~ t1key110:", t1key110)

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      saveData();
    }
  };
  try{
     var time = t1item160.split('-');
     console.log(time);
     var time1 = time[0] + time[1];
     var time2 = time[2]. split(':');
     var newTime = time[0] + "-" + time[1] + "-" + time2[0] + ":" + time2[1];
     console.log(newTime);

}
 catch(error){
  console.log(error)
 }

  return (
    <>
    <div className="form-heading"> 
     <h2>Student Registration </h2>
    </div>
    <div className= "Student-form" >
      
    
    <div className="form-box">
      <Form  onSubmit={handleSubmit} className="main">
     < FaUserTie/>
        <Form.Label className="form-label">{data[0].t1key110}</Form.Label>
        <Form.Control className="form-control"
        type = "text"
        value={t1key110}
        readOnly 
        onChange={(event)=>{
          sett1key110(event.target.value)
        }}
        
        />
      </Form>
      <Form  onSubmit={handleSubmit} className="main">
        <FaPencilAlt/>
        <Form.Label className="form-label">{data[0].t1item120}</Form.Label>
        <Form.Control className={isEdit ? "editable" :"form-control"}
        type = "text"
        value={t1item120}
        onChange={(event)=>{
          setName(event.target.value)
        }}
        readOnly ={!isEdit}
        />
      </Form>
      <Form  onSubmit={handleSubmit} className="main">
      <FaUniversity/>
        <Form.Label className="form-label">{data[0].t1item130}</Form.Label>
        <Form.Control className={isEdit ? "editable" :"form-control"}
        type = "text"
        value={t1item130}
        onChange={(event)=>{
          setProgram(event.target.value)
        }}
        readOnly ={!isEdit}
        />
      </Form>
      <Form  onSubmit={handleSubmit} className="main" >
      <FaPhone/>
        <Form.Label className="form-label">{data[0].t1item140}</Form.Label>
        <Form.Control className={isEdit ? "editable" :"form-control"}
        type = "text"
        value={t1item140}
        
        onChange={(event)=>{
          setPhone(event.target.value)
        }}
        readOnly ={!isEdit}
        />
      
      </Form>
      <Form  onSubmit={handleSubmit} className="main">
      <FaEnvelopeOpen/>

        <Form.Label className="form-label">{data[0].t1item150}</Form.Label>
        <Form.Control className={isEdit ? "editable" :"form-control"}
        type = "text"
        value={t1item150}
        onChange={(event)=>{
          setEmail(event.target.value)
        }}
        readOnly ={!isEdit}
        />
      </Form>
      <Form  onSubmit={handleSubmit} className="main " >
      <FaRegCalendarTimes/>
        <Form.Label className="form-label">{data[0].t1item160}</Form.Label>
        <Form.Control className="form-control"
        type = "text"
        readOnly
        value={newTime}
        onChange={(event)=>{
          setRegistrationDate(event.target.value)
        }}
      
        />
      </Form>
      </div>
     
 
</div>

      
    </>
  );
};

export default Students;
