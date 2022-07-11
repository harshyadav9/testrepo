import React from "react";
import { Link } from "react-router-dom";
import schoolimg from "../../assets/icons/school.png";
import { Colors } from "../../assets/css/color";
import Sidebar from "../main/sidebar";
import "./SchoolApplicationStatus.scss";

export default function SchoolApplicationStatus() {
  return (
    <div className="row ">
      <div className="col-lg-3">
        <Sidebar />
      </div>

      <div className="col-lg-9 ">
        <div className="application-status p-5">
          <div className="page-heading">
            <h4>Application Status</h4>
            {/* <p>Check Payment details</p> */}
          </div>
          <div className="shadow-lg p-4 bg-body rounded">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>DOB</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Level</th>
                  <th>Exam</th>
                  <th>Mock Test</th>
                  <th>Fees</th>
                  <th>Slot</th>
                  <th>Roll no.</th>
                  <th>Fees Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Emil</td>
                  <td>Tobias</td>
                  <td>Linus</td>
                  <td>Linus</td>
                  <td>Linus</td>
                  <td>Linus</td>
                  <td>Linus</td>
                  <td>Linus</td>
                  <td>Linus</td>
                  <td>Linus</td>
                  <td style={{ color: "green" }}>paid</td>
                </tr>
                <tr>
                  <td>Maya</td>
                  <td>14</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td style={{ color: "green" }}>paid</td>
                </tr>
                <tr>
                  <td>Maya</td>
                  <td>14</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td style={{ color: "green" }}>paid</td>
                </tr>
                <tr>
                  <td>Maya</td>
                  <td>14</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td style={{ color: "red" }}>unpaid</td>
                </tr>
                <tr>
                  <td>Maya</td>
                  <td>14</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td style={{ color: "green" }}>paid</td>
                </tr>
                <tr>
                  <td>Maya</td>
                  <td>14</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td style={{ color: "red" }}>unpaid</td>
                </tr>
                <tr>
                  <td>Maya</td>
                  <td>14</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td style={{ color: "red" }}>unpaid</td>
                </tr>
                <tr>
                  <td>Maya</td>
                  <td>14</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td style={{ color: "green" }}>paid</td>
                </tr>
                <tr>
                  <td>Maya</td>
                  <td>14</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td style={{ color: "green" }}>paid</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
