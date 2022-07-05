import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export default function SchoolForget() {
  return (
    <div className="container-login">
      <marquee> Welcome to Green Olympiad</marquee>
      <div className="container-inner-area">
        <div className="form-card">
          <div className="imgcontainer">
            <h2>Forgot Password (School)</h2>
          </div>

          <div className="">
          <label>Mobile / E-Mail:</label>
            <input
              type="text"
              placeholder="Enter the Mobile / E-Mail"
              name="psw"
              required
            />
            <br />
            <label>OTP:</label>
            <input
              type="text"
              placeholder="Enter the OTP"
              name="psw"
              required
            />
            <p style={{marginBottom: 3, color: "#1560bd", cursor: "pointer"}}>Verify</p>
            <label>Old Password:</label>
            <input
              type="text"
              placeholder="Enter Old Password"
              name="psw"
              required
            />
            <br />
            <label>New Password:</label>
            <input
              type="text"
              placeholder="Enter New Password"
              name="psw"
              required
            />
            <br />
            <label>Confirm Password:</label>
            <input
              type="text"
              placeholder="Enter Confirm Password"
              name="psw"
              required
            />
            <div>
              <Link to="/school-login">
                <button className="main-btn">Submit</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
