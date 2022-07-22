import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { API_BASE_URL, API_END_POINTS } from "../../apis/api";
import { StudentDataContext } from "../context/datacontext";

export default function SchoolForget() {


  const { state, dispatch } = useContext(StudentDataContext);

  const [school_code, setSchoolCode] = useState("");
  const [errordisp, setErrordisp] = useState("");

  const forget = async () => {
    if (school_code.trim() === "") {
      setErrordisp('Please fill all the fields');
      return;
    }


    const forgetPassDetails = await axios.post(`${API_BASE_URL}${API_END_POINTS.forgetPassword}`, {
      "school_code": school_code,
      "roll_no": false
    });
    setErrordisp(forgetPassDetails.data.message);


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
                  <label>School Code</label>
                  <input type="text" name="oldpass" value={school_code} onChange={(school_code) =>
                    setSchoolCode(school_code.target.value)
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
