import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export default function SchoolChangePassword() {
  return (
    <div className="container-login">
      <marquee> Welcome to Green Olympiad</marquee>

      <div className="container-inner-area">
        <div className="form-card">
          <div className="imgcontainer">
            <h2>Change Password (School)</h2>
          </div>

          <div className="">
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
