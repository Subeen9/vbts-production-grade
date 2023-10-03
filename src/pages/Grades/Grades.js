import React, { useState } from "react";
import { Table } from "react-bootstrap";

const Grades = ({ matchingId, grades }) => {
  return (
    <div>
      <div className="mt-4">
        <table style={{ border: "1px solid black" }}>
          <thead style={{ border: "1px solid black" }}>
            <tr
              className="table-tr"
              style={{
                fontSize: "16px",
                color: "#777",
                border: "1px solid black",
              }}
            >
              <th>{grades[0].t2item110}</th>
              <th>{grades[0].t2item130}</th>
              <th>{grades[0].t2item140}</th>
              <th>{grades[0].t2item150}</th>
              <th>{grades[0].t2item160}</th>
              <th>{grades[0].t2item170}</th>
              <th>{grades[0].t2item180}</th>
              <th>{grades[0].t2item190}</th>
            </tr>
          </thead>
          {grades.slice(2).map((grade) => {
            return (
              <tbody className="table-tbody">
                {grade.t2key120 === matchingId.t1key110 ? (
                  <tr style={{ fontSize: "15px", border: "1px solid black" }}>
                    <td>{grade.t2item110}</td>
                    <td>{grade.t2item130}</td>
                    <td>{grade.t2item140}</td>
                    <td>{grade.t2item150}</td>
                    <td>{grade.t2item160}</td>
                    <td>{grade.t2item170}</td>
                    <td>{grade.t2item180}</td>
                    <td> {grade.t2item190}</td>
                  </tr>
                ) : (
                  <></>
                )}
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Grades;
