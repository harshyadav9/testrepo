import React from "react";
import { Link } from "react-router-dom";
import studentimg from "../../assets/icons/login.png";

export default function StudentLogin() {
  return (
    <div className="container-login">
      <marquee> Welcome to Green Olympiad</marquee>
      <div className="container-inner-area">
        <Link to="/student-registration">
          <div className="smallcards-login">
            <div className="card-body">
              <img className="card-login-img" src={studentimg} />
              <h4 className="card-text">
                NEW INDIVIDUAL REGISTRATIONS <br /> ( Std 4-12 )
              </h4>
            </div>
          </div>
        </Link>
        <div className="login-card">
          <div className="imgcontainer">
            <h2>User Login</h2>
          </div>
          <div className="">
            <label>Roll no:</label>
            <input
              type="text"
              placeholder="school code"
              name="uname"
              required
            />
            <br />
            <label>Password:</label>

            <input type="password" placeholder="password" name="psw" required />
            <div>
              <Link to="/student-edit-details">
                <button className="login-btn" type="submit">
                  Login
                </button>
              </Link>
            </div>
          </div>
          <Link to="/student-forget"  className="forget"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
