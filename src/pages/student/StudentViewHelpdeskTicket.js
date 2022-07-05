import React from "react";
import { Link } from "react-router-dom";
import studentimg from "../../assets/icons/login.png";
import { Colors } from "../../assets/css/color";

export default function StudentViewHelpdeskTicket() {
  return (
    <div className="container-home">
      <div className="card">
        <div className="card-body">
          <h6 class="card-title">
            <span>
              <img class="card-img-top" src={studentimg} alt="Card image" />
            </span>
            SCHOOL DESK
          </h6>
          <ul class="sidebar">
            <Link to="">
              <p class="side-text">SCHOOL DETAILS</p>
            </Link>
            <br />
            <Link to="">
              <p class="side-text">UPLOAD STUDENTS DATA</p>
            </Link>
            <br />
            <Link to="">
              <p class="side-text">MAKE PAYMENT</p>
            </Link>
            <br />
            <Link to="">
              <p class="side-text">SELECT SLOT DETAILS</p>
            </Link>
            <br />
            <Link to="">
              <p class="side-text">APPLICATION STATUS</p>
            </Link>
            <br />
            <Link to="/student-helpdesk-ticket">
              <p class="side-text">SUBMIT HELPDESK TICKET</p>
            </Link>
            <br />
            <Link to="/student-view-helpdesk-ticket">
              <p
                class="side-text"
                style={{ backgroundColor: Colors.MAINCOLOR, color: "#fff" }}
              >
                VIEW HELPDESK TICKET
              </p>
            </Link>
            <br />
            <Link to="/student-certificate">
              <p class="side-text">DOWNLOAD CERTIFICATE</p>
            </Link>
            <br />
            <Link to="/student-change-password">
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
        <div className="top-label">
          <input
            className="top-index"
            type="text"
            placeholder="Candidate Roll no: 1678790"
            name="uname"
            required
            style={{ backgroundColor: "#dfdbdb" }}
            disabled
          />
          <input
            className="top-index"
            type="text"
            placeholder="Candidate Name: Jyoti Patel"
            name="uname"
            required
            style={{ backgroundColor: "#dfdbdb" }}
            disabled
          />
            <input
            className="top-index"
            type="text"
            placeholder="Date of Birth: 16/02/1998"
            name="uname"
            required
            style={{ backgroundColor: "#dfdbdb" }}
            disabled
          />
        </div>
        <h3>View Helpdesk Ticket</h3>
        <h4>No Ticket Generated</h4>
      </div>
    </div>
  );
}
