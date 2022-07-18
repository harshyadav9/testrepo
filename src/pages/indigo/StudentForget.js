import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export default function StudentInForget() {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [errordisp, setErrordisp] = useState("");
  return (
    // <div className="container-login">
    //   <marquee> Welcome to Green Olympiad</marquee>
    //   <div className="container-inner-area">
    //     <div className="form-card">
    //       <div className="imgcontainer">
    //         <h2>Forgot Password (School)</h2>
    //       </div>

    //       <div className="">
    //       <label>Mobile / E-Mail:</label>
    //         <input
    //           type="text"
    //           placeholder="Enter the Mobile / E-Mail"
    //           name="psw"
    //           required
    //         />
    //         <br />
    //         <label>OTP:</label>
    //         <input
    //           type="text"
    //           placeholder="Enter the OTP"
    //           name="psw"
    //           required
    //         />
    //         <p style={{marginBottom: 3, color: "#1560bd", cursor: "pointer"}}>Verify</p>
    //         <label>Old Password:</label>
    //         <input
    //           type="text"
    //           placeholder="Enter Old Password"
    //           name="psw"
    //           required
    //         />
    //         <br />
    //         <label>New Password:</label>
    //         <input
    //           type="text"
    //           placeholder="Enter New Password"
    //           name="psw"
    //           required
    //         />
    //         <br />
    //         <label>Confirm Password:</label>
    //         <input
    //           type="text"
    //           placeholder="Enter Confirm Password"
    //           name="psw"
    //           required
    //         />
    //         <div>
    //           <Link to="/school-login">
    //             <button className="main-btn">Submit</button>
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div class="container-fluid">
      <div class="row ">
        <div class="col-lg-10 mx-auto">
          <main class="p-3 p-sm-4 p-lg-5">
            <div class="section-title mb-4 text-muted">
              <h6 class="font-bold ">Forget Password </h6>

            </div>
            <div class="shadow mb-5 rounded-16	">
              <div class="p-4">

                <div class="form-wrapper">
                  <label>Email id </label>
                  <input type="password" name="oldpass" value="password" onChange={(password) =>
                    setPassword(password.target.value)
                  } id="" />
                </div>
                <div class="row">
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>New Password</label>
                      <input type="password" name="newpass" id="" value="password" onChange={(password) =>
                        setConfirmpass(password.target.value)
                      } />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Confirm Password</label>
                      <input type="password" name="confirmpass" id="" value="setConfirmpass" onChange={(confirmpass) =>
                        setConfirmpass(confirmpass.target.value)
                      } />
                    </div>
                  </div>
                </div>
                <div class="mt-4 mb-3">
                  <div class="d-flex justify-content-center">
                    <button class="btn btn-primary " style={{ width: '15rem' }}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
