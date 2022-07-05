import React from "react";
import { Link } from "react-router-dom";
import studentimg from "../../assets/icons/login.png";
import { Colors } from "../../assets/css/color";

export default function StudentPayment() {
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
              <p
                class="side-text"
                style={{ backgroundColor: Colors.MAINCOLOR, color: "#fff" }}
              >
                MAKE PAYMENT
              </p>
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
              <p class="side-text">VIEW HELPDESK TICKET</p>
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
        <div className="form-card-second">
          <div className="imgcontainer">
            <h2>Make Payment</h2>
          </div>

          <div class="">
            <label className="form-label">Roll No:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder="1876754"
              name="uname"
              required
            />
            <br />
            <label className="form-label">Name of Candidate:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder="Jyoti Patel"
              name="uname"
              required
            />
            <br />
            <label className="form-label">Level of Exam:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder="Level-3"
              name="uname"
              required
            />
            <br />
            <label className="form-label">Topic of Exam:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder="ABCD"
              name="uname"
              required
            />
            <br />
            <label className="form-label">Demo Exam Status:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder="yes"
              name="uname"
              required
            />
            <br />
            <label className="form-label">Total Fees to be paid:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder="Rs. 1669"
              name="uname"
              required
            />
            <br />
           

            <div class="d-flex justify-content-end btnmain">
              <Link to="/student-slot">
                <button className="main-btn" type="submit">
                  Make Payment
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
