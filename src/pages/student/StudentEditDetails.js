import React from "react";
import { Link } from "react-router-dom";
import studentimg from "../../assets/icons/login.png";
import { Colors } from "../../assets/css/color";

export default function StudentEditDetails() {
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
                style={{ backgroundColor: Colors.MAINCOLOR, color: "#fff" }}
              >
                SCHOOL DETAILS
              </p>
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
              <p class="side-text">VIEW HELPDESK TICKET</p>
            </Link>
            <br />
            <Link to="/student-certificate">
              <p class="side-text">DOWNLOAD CERTIFICATE</p>
            </Link>
            <br />
            <Link to="/student-change-password" >
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
        </div>
        <div className="form-card-second">
          <div className="imgcontainer">
            <h2>Edit Student Details</h2>
          </div>

          <div class="">
            <label className="form-label">Country:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder="India"
              name="uname"
              required
            />
            <br />
            <label className="form-label">State/City:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder="Uttar Pradesh"
              name="uname"
              required
            />
            <br />
            <label className="form-label">Name:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder="Jyoti Patel"
              name="uname"
              required
            />
            <br />
            <label className="form-label">Date of Birth:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder="16/02/1998"
              name="uname"
              required
            />
            <br />
            <label className="form-label">Mobile:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder="8767654543"
              name="uname"
              required
            />
            <br />
            <label className="form-label">E-Mail:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder="jyoti7656@gmail.com"
              name="uname"
              required
            />
            <br />
            <label className="form-label">Address:</label>

            <input
              type="text"
              placeholder="Enter the address"
              name="address"
              required
            />
            <br />
            <label className="form-label" for="cars">
              Gender:
            </label>
            <select class="dropdown" id="cars">
              <option value="volvo">Gender</option>

              <option value="volvo">Male</option>
              <option value="opel">Female</option>
              <option value="audi">Others</option>
            </select>
            <br />
            <label className="form-label">Pin Code / Postal Code:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder="201003"
              name="uname"
              required
            />
            <br />

            <label className="form-label">School:</label>

            <input
              type="text"
              placeholder="Enter school name"
              name="phone"
              required
            />
            <br />

            <label className="form-label">Class:</label>
            <input
              type="text"
              placeholder="Enter the class"
              name="phone"
              required
            />
            <br />

            <label className="form-label">Section:</label>
            <input
              type="text"
              placeholder="Enter the section"
              name="phone"
              required
            />
            <br />
            <label className="form-label">Name of Parent / Guardian:</label>
            <input
              type="text"
              placeholder="Name of Parent / Guardian"
              name="phone"
              required
            />
            <br />
            <label className="form-label">E-Mail of Parent/ Guardian:</label>
            <input
              type="text"
              placeholder="E-Mail of Parent/ Guardian"
              name="phone"
              required
            />
            <br />
            <label className="form-label">Mobile of Parent/ Guardian:</label>
            <input
              type="text"
              placeholder="Mobile of Parent/ Guardian"
              name="phone"
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
            <label className="form-label">Topic of Examination:</label>
            <input
              type="text"
              placeholder="Topic of examination"
              name="phone"
              required
            />
            <br />
            <label className="form-label" for="cars">
              Do u want to give demo exam:
            </label>
            <select class="dropdown" id="cars">
              <option value="volvo">select</option>

              <option value="volvo">Yes</option>
              <option value="opel">No</option>
            </select>
            <div class="d-flex justify-content-end btnmain">
              <Link to="/student-payment">
                <button className="main-btn" type="submit">
                  Save & Proceed
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
