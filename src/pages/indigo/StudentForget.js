import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router";
import { API_BASE_URL, API_END_POINTS } from "../../apis/api";
import { StudentDataContext } from "../context/datacontext";

export default function StudentInForget() {
  const { state, dispatch } = useContext(StudentDataContext);

  const [roll_no, setRollNo] = useState("");
  const navigate = useNavigate();
  const [errordisp, setErrordisp] = useState("");

  const forget = async () => {
    if (roll_no.trim() === "") {
      setErrordisp('Please fill all the fields');
      return;
    }


    const forgetPassDetails = await axios.post(`${API_BASE_URL}${API_END_POINTS.forgetPassword}`, {
      "school_code": null,
      "roll_no": roll_no
    });
    setErrordisp(forgetPassDetails.data.message);
    navigate('/student-Inlogin');

    console.log("forgetPassDetails", forgetPassDetails);


  };

  return (


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
                  <label>Roll Number</label>
                  <input type="text" name="oldpass" value={roll_no} onChange={(roll_no) =>
                    setRollNo(roll_no.target.value)
                  } id="" />
                </div>

                <div class="mt-4 mb-3">
                  <div class="d-flex justify-content-center">
                    <button class="btn btn-primary " style={{ width: '15rem' }} onClick={forget}>Submit</button>
                  </div>
                </div>
                <div>
                  <h2 style={{ textAlign: 'center' }}>{errordisp}</h2>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
