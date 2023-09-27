import React from "react";
import { Table } from "react-bootstrap";

const Grades = ({ matchingId, grades }) => {
  return (
    <div>
      <div className="mt-4">
        <Table responsive="sm md lg xl" striped bordered hover size="sm">
          <thead>
            <tr style={{ fontSize: "16px", color: "#777" }}>
              <th style={{ color: "#777", width: "200px" }}>
                {grades[0].t2item110}
              </th>
              <th style={{ color: "#777", width: "200px" }}>
                {grades[0].t2item130}
              </th>
              <th style={{ color: "#777", width: "200px" }}>
                {grades[0].t2item140}
              </th>
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
                    <td style={{ width: "100px !important" }}>
                      {grade.t2item140}
                    </td>
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
  );
};

export default Grades;
