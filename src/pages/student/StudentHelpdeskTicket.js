import React from "react";
import { Link } from "react-router-dom";
import studentimg from "../../assets/icons/login.png";
import { Colors } from "../../assets/css/color";

export default function StudentHelpdeskTicket() {
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
              <p
                class="side-text"
              >
                SCHOOL DETAILS
              </p>
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
              <p class="side-text"
                style={{ backgroundColor: Colors.MAINCOLOR, color: "#fff" }}
              >SUBMIT HELPDESK TICKET</p>
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
        <div className="form-card-second">
          <div className="imgcontainer">
            <h2>Helpdesk Ticket</h2>
          </div>

          <div class="">
            <label className="">Name:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder="Jyoti Patel"
              name="uname"
              required
            />
            <br />

            <label className="">Mobile Number:</label>

            <input
              type="text"
              placeholder="Postal Address"
              name="6789876765"
              required
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
            />
            <br />

            <label className="">E-Mail:</label>
            <input
              type="text"
              placeholder="jyoti2345@gmail.com"
              name="phone"
              required
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
            />
            <br />
            <label for="cars">Category:</label>
            <select class="dropdown" id="cars">
              <option value="volvo">Select</option>
              <option value="volvo">time issue</option>
              <option value="saab">certificate issue</option>
              <option value="opel">login issue</option>
              <option value="audi">registration issue</option>
            </select>
            <br />

            <label className="">Subject:</label>
            <input type="text" placeholder="Subject" name="phone" required />
            <br />
            <label className="">Message:</label>
            <textarea></textarea>
            <br />
            <label for="cars">Attach Snapshot:</label>

            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder="abcd3456@gmail.com"
              name="uname"
              required
            />
            <br />

            <div class="d-flex justify-content-end btnmain">
              <Link to="/student-view-helpdesk-ticket">
                <button className="main-btn" type="submit">
                  Submit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
