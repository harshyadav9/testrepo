import React from "react";
import { Link } from "react-router-dom";
import schoolimg from "../../assets/icons/school.png";
import { Colors } from "../../assets/css/color.js";

export default function SchoolCertificate() {
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
            <Link to="/school-helpdesk-ticket">
              <p class="side-text">SUBMIT HELPDESK TICKET</p>
            </Link>
            <br />
            <Link to="/school-view-helpdesk-ticket">
              <p class="side-text">VIEW HELPDESK TICKET</p>
            </Link>
            <br />
            <Link to="/school-certificate">
              <p
                class="side-text"
                style={{ backgroundColor: Colors.MAINCOLOR, color: "#fff" }}
              >
                DOWNLOAD CERTIFICATE
              </p>
            </Link>
            <br />
            <Link to="/school-change-password">
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

        <div style={{ top: 40 }}>
          <h2>Download Certificate</h2>
          <a href="../../assets/pdf/dummy.pdf" target="_blank">
            <button className="main-btn">Download Certificate</button>
          </a>
        </div>
      </div>
    </div>
  );
}
