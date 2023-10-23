import React, { useState } from "react";
import imageLogo from "../../images/logo.png";
// import { database, db } from "../../firebase";
// import { ref, set } from "firebase/database";

const Students = ({ matchingId, data, isEdit, saveData }) => {
  const [t1key110, sett1key110] = useState(matchingId.t1key110);
  const [t1item120, setName] = useState(matchingId.t1item120);
  const [t1item130, setProgram] = useState(matchingId.t1item130);
  const [t1item140, setPhone] = useState(matchingId.t1item140);
  const [t1item150, setEmail] = useState(matchingId.t1item150);
  const [t1item160, setRegistrationDate] = useState(matchingId.t1item160);
  const editMode = isEdit ? "pointer-cursor" : "";

  // if (saveData) {
  //   set(ref(database, `vbts/updatedData/${t1key110}`), {
  //     t1key110: t1key110,
  //     t1item120: t1item120,
  //     t1item130: t1item130,
  //     t1item140: t1item140,
  //     t1item150: t1item150,
  //   })
  //     .catch((e) => {
  //       console.log("SAVING ERROR", e);
  //     })
  //     .then(() => console.log("DATA POSTED SUCCESSFULLY"));
  //   console.log("DATA SAVED");
  // }

  return (
    <div>
      <div className="d-flex justify-content-between">
        {/* this is the logo part */}
        <div style={{ width: "200px", height: "200px" }}>
          <img
            style={{ width: "100%", height: "100%" }}
            src={imageLogo}
            alt="logo"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p style={{ fontSize: "35px" }}>Transcript</p>
        </div>
        {/* this is the left part */}
        <div className="">
          <div>
            <div>
              {data[1].t1key110 !== "null" && (
                <p>
                  <strong>{data[0].t1key110}:&nbsp;</strong>
                  {isEdit ? (
                    <input
                      type="text"
                      value={t1key110}
                      className="pointer-cursor"
                      onChange={(e) => {
                        sett1key110(e.target.value);
                      }}
                    />
                  ) : (
                    <span>{t1key110}</span>
                  )}
                </p>
              )}
            </div>
            <div>
              {data[1].t1item120 !== "null" && (
                <p>
                  <strong>{data[0].t1item120}:&nbsp;</strong>
                  <span
                    contentEditable={isEdit}
                    className={editMode}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  >
                    {t1item120}
                  </span>
                </p>
              )}
            </div>
            <div>
              {data[1].t1item130 !== "null" && (
                <p>
                  <strong>{data[0].t1item130}:&nbsp;</strong>
                  <span
                    contentEditable={isEdit}
                    className={editMode}
                    onChange={(e) => {
                      setProgram(e.target.value);
                    }}
                  >
                    {t1item130}
                  </span>
                </p>
              )}
            </div>
            <div>
              {data[1].t1item140 !== "null" && (
                <p>
                  <strong>{data[0].t1item140}:&nbsp;</strong>
                  <span
                    contentEditable={isEdit}
                    className={editMode}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  >
                    {t1item140}
                  </span>
                </p>
              )}
            </div>
            <div>
              {data[1].t1item150 !== "null" && (
                <p>
                  <strong>{data[0].t1item150}:&nbsp;</strong>
                  <span
                    contentEditable={isEdit}
                    className={editMode}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  >
                    {t1item150}
                  </span>
                </p>
              )}
            </div>
            <div>
              {data[1].t1item160 !== "null" && (
                <p>
                  <strong>{data[0].t1item160}:&nbsp;</strong>
                  <span
                    className={editMode}
                    onChange={(e) => {
                      setRegistrationDate(e.target.value);
                    }}
                  >
                    {t1item160}
                  </span>
                </p>
              )}
            </div>
            {/* <div>
            {data[1].t1item112 != "null" && 
              <p>
                <strong>{data[0].t1item112}:&nbsp;</strong>
                <span>{matchingId.t1item112}</span>
              </p>
            }
            </div>
            <div>
            {data[1].t1item190 != "null" && 
              <p>
                <strong>{data[0].t1item190}:&nbsp;</strong>
                <span>{matchingId.t1item190}</span>
              </p>
            }
            </div>
            <div>
            {data[1].t1item200 != "null" && 
              <p>
                <strong>{data[0].t1item200}:&nbsp;</strong>
                <span>{matchingId.t1item200}</span>
              </p>
            }
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
s