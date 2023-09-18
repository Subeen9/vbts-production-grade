import React from "react";
import imageLogo from "../../images/logo.png";

const Students = ({ matchingId, data }) => {
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
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}><p style={{fontSize: '35px'}}>Transcript</p></div>
        {/* this is the left part */}
        <div className="">
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
              </p>
            </div>
            <div>
              <p>
                <strong>{data[0].t1item170}:&nbsp;</strong>
                <span>{matchingId.t1item170}</span>
              </p>
            </div>
            <div>
              <p>
                <strong>{data[0].t1item180}:&nbsp;</strong>
                <span>{matchingId.t1item180}</span>
              </p>
            </div>
            <div>
              <p>
                <strong>{data[0].t1item190}:&nbsp;</strong>
                <span>{matchingId.t1item190}</span>
              </p>
            </div>
            <div>
              <p>
                <strong>{data[0].t1item200}:&nbsp;</strong>
                <span>{matchingId.t1item200}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
