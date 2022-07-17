import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import SidebarStudent from "../main/sidebarStudent";

export default function StudentChangePassword() {


  const [oldPss, setOldPss] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errordisp, setErrordisp] = useState("");


  const submitpass = () => {
    if (confirmPassword.trim() !== newPassword.trim()) {
      setErrordisp('The new password and confirm password do not match');
    }
  }



  return (

    <div className="container-fluid">
      <div className="row ">
        <div className="col-lg-3">
          {/* side bar will come here */}
          <SidebarStudent />

        </div>
        <div className="col-lg-9 ">
          <main className="content ">
            <div class="container-fluid">
              <div class="row ">
                <div class="col-lg-10 mx-auto">
                  <main class="p-3 p-sm-4 p-lg-5">
                    <div class="section-title mb-4 text-muted">
                      <h6 class="font-bold ">Change Password </h6>

                    </div>
                    <div class="shadow mb-5 rounded-16	">
                      <div class="p-4">

                        <div class="form-wrapper">
                          <label>Old Password  </label>
                          <input type="text" name="oldpass" value={oldPss} id="" onChange={(password) =>
                            setOldPss(password.target.value)
                          } />
                        </div>
                        <div class="row">
                          <div class="col-sm">
                            <div class="form-wrapper">
                              <label>New Password</label>
                              <input type="password" name="newpass" id="" value={newPassword} onChange={(password) =>
                                setNewPassword(password.target.value)
                              } />
                            </div>
                          </div>
                          <div class="col-sm">
                            <div class="form-wrapper">
                              <label>Confirm Password</label>
                              <input type="password" name="confirmpass" id="" value={confirmPassword} onChange={(password) =>
                                setConfirmPassword(password.target.value)
                              } />
                            </div>
                          </div>
                        </div>
                        <div>
                          <h2>{errordisp}</h2>
                        </div>
                        <div class="mt-4 mb-3">
                          <div class="d-flex justify-content-center">
                            <button class="btn btn-primary " style={{ width: '15rem' }} onClick={submitpass}>Submit</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </div>
          </main>
        </div>


      </div>
    </div>


  );
}
