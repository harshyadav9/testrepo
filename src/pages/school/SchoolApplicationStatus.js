import React from "react";
import { Link } from "react-router-dom";
import schoolimg from "../../assets/icons/school.png";
import { Colors } from "../../assets/css/color";

export default function SchoolApplicationStatus() {
  return (
    <div className="container-home">
      <div className="card">
        <div className="card-body">
          <h6 class="card-title">
            <span>
              <img class="card-img-top" src={schoolimg} alt="Card image" />
            </span>
            SCHOOL DESK
          </h6>
          <ul class="sidebar">
            <Link to="">
              <p class="side-text">SCHOOL DETAILS</p>
            </Link>
            <br />
            <Link to="">
              <p
                class="side-text"
              >
                UPLOAD STUDENTS DATA
              </p>
            </Link>
            <br />
            <Link to="">
              <p class="side-text"
              >MAKE PAYMENT</p>
            </Link>
            <br />
            <Link to="">
              <p class="side-text">SELECT SLOT DETAILS</p>
            </Link>
            <br />
            <Link to="">
              <p class="side-text"
                style={{ backgroundColor: Colors.MAINCOLOR, color: "#fff" }}
              >APPLICATION STATUS</p>
            </Link>
            <br />
            <Link to="/school-helpdesk-ticket">
              <p class="side-text">SUBMIT HELPDESK TICKET</p>
            </Link>
            <br />
            <Link to="/school-view-helpdesk-ticket">
              <p class="side-text">VIEW HELPDESK TICKET</p>
            </Link>
            <br />
            <Link to="/school-certificate">
              <p class="side-text">DOWNLOAD CERTIFICATE</p>
            </Link>
            <br />
            <Link to="/school-change-password" >
              <p class="side-text">CHANGE PASSWORD</p>
            </Link>
            <br />
            <Link to="/">
              <p class="side-text">LOGOUT</p>
            </Link>
            <br />
          </ul>
        </div>
      </div>

      <div className="main-head">
        <div className="main">
          <marquee> Welcome to Green Olympiad</marquee>
        </div>

        <h2 style={{textAlign: "center", marginBottom: -15}}>Application Status</h2>
        <div class="Application-section">
          <div>
            <table className="application-status-table">
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
                <td style={{color: "green", fontWeight: 500}}>paid</td>
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
                <td style={{color: "green", fontWeight: 500}}>paid</td>
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
                <td style={{color: "green", fontWeight: 500}}>paid</td>
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
                <td style={{color: "red", fontWeight: 500}}>unpaid</td>
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
                <td style={{color: "green", fontWeight: 500}}>paid</td>
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
                <td style={{color: "red", fontWeight: 500}}>unpaid</td>
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
                <td style={{color: "red", fontWeight: 500}}>unpaid</td>
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
                <td style={{color: "green", fontWeight: 500}}>paid</td>
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
                <td style={{color: "green", fontWeight: 500}}>paid</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
