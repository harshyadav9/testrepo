import React from "react";
import { Link } from "react-router-dom";

export default function StudentRegistration() {
  return (
    <div className="container-login">
      <marquee> Welcome to Green Olympiad</marquee>
      <div className="container-inner-area">
        <div className="form-card">
          <div className="imgcontainer">
            <h2>Student Registration</h2>
          </div>

          <div className="">
            <label>Country:</label>
            <select className="dropdown" id="cars">
              <option value="volvo">Country</option>

              <option value="volvo">India</option>
              <option value="saab">Japan</option>
              <option value="opel">Nepal</option>
              <option value="audi">Bhutan</option>
            </select>
            <br />
            <label>State/City:</label>
            <select className="dropdown" id="cars">
              <option value="volvo">State/City</option>

              <option value="volvo">Uttar Pradesh</option>
              <option value="saab">Madhya Pradesh</option>
              <option value="opel">Goa</option>
              <option value="audi">Uttrakhand</option>
            </select>
            <br />
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter the name"
              name="uname"
              required
            />
            <br />
            <label>Date of Birth:</label>
            <input
              type="date"
              placeholder="Scool name here"
              name="uname"
              required
            />
            <br />
            <label>Mobile:</label>

            <input
              type="text"
              placeholder="Enter mobile number"
              name="psw"
              required
            />
            <br />
            <button className="otpbutton" style={{ marginLeft: 120 }}>
              Generate OTP
            </button>

            <div
              style={{ marginLeft: 65 }}
              className=" d-flex justify-content-center"
            >
              <label style={{ marginRight: 64 }}>Mobile OTP:</label>
              <input
                type="otp"
                maxlength="1"
                placeholder=""
                name="psw"
                required
                placeholder-type="number"
              />
              <input
                type="otp"
                maxlength="1"
                placeholder=""
                name="psw"
                required
              />
              <input
                type="otp"
                maxlength="1"
                placeholder=""
                name="psw"
                required
              />
              <input
                type="otp"
                maxlength="1"
                placeholder=""
                name="psw"
                required
              />
              <button className="otpbutton">Verify</button>
            </div>
            <label>E-Mail:</label>

            <input
              type="text"
              placeholder="Mobile (Principal/Teacher)"
              name="psw"
              required
            />
            <br />
            <button className="otpbutton" style={{ marginLeft: 120 }}>
              Generate OTP
            </button>
            <div
              style={{ marginLeft: 65 }}
              className=" d-flex justify-content-center"
            >
              <label style={{ marginRight: 64 }}>E-Mail OTP:</label>
              <input
                type="otp"
                maxlength="1"
                placeholder=""
                name="psw"
                required
                placeholder-type="number"
              />
              <input
                type="otp"
                maxlength="1"
                placeholder=""
                name="psw"
                required
              />
              <input
                type="otp"
                maxlength="1"
                placeholder=""
                name="psw"
                required
              />
              <input
                type="otp"
                maxlength="1"
                placeholder=""
                name="psw"
                required
              />
              <button className="otpbutton">Verify</button>
            </div>
            <div>
              <Link to="/student-edit-details">
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
