import React, { useContext } from "react";
import { Link } from "react-router-dom";
import schoolimg from "../../assets/icons/school.png";
import { Colors } from "../../assets/css/color";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_JAVA_URL, API_BASE_URL, API_END_POINTS } from "../../apis/api";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import Sidebar from "../main/sidebar";
import Error from '../school/ErrorList';
import { StudentDataContext } from "../context/datacontext";
import { notify } from "../../Utills";
import SidebarStudent from "../main/sidebarStudent";

export default function SchoolEditDetails() {


  const { state, dispatch } = useContext(StudentDataContext);

  const [rollnO, SetRollno] = useState('');
  const [cname, SetCName] = useState('');
  const [city, SetCity] = useState('');
  const [country, setCountry] = useState("");
  const [dob, SetDob] = useState('');
  const [stateval, SetState] = useState('');
  const [mobile, SetMobile] = useState('');
  const [email, SetEmail] = useState('');
  const [gender, SetGender] = useState('');
  const [pin, SetPin] = useState('');
  const [add1, SetAdd1] = useState('');
  const [school, SetSchool] = useState('');

  const [classcandidate, SetClassCandidate] = useState('');
  const [section, SetSection] = useState('');
  const [pgname, SetPgName] = useState(''); // bind kal 
  const [pgemail, SetPgEmail] = useState('');
  const [pgemobile, SetPgMobile] = useState('');
  const [levelexam, SetLevelExam] = useState('');
  const [examtheme, SetExamTheme] = useState('');
  const [demoexam, SetDemoExam] = useState('');


  const updateDetails = async () => {

    console.log(rollnO, cname, country, dob, stateval, mobile, email, gender, pin, add1, school, classcandidate, section, pgname, pgemail, pgemobile, levelexam,
      examtheme, demoexam
    );

    let obj = {
      add1,
      add2: '',
      city,
      country,
      createdby: rollnO,
      demoExam: demoexam,
      demoSlotDateTime: state?.student.DemoSlotDateTime,
      dob,
      email,
      examLevel: 'LEVEL_1',
      examSlotDateTime: state?.student.ExamSlotDateTime,
      examTheme: examtheme,
      gender,
      mobile,
      modifiedby: rollnO,
      name: cname,
      password: "",
      paymentStatus: state?.student.PaymentStatus,
      pgEmail: pgemail,
      pgMobile: pgemobile,
      pin,
      rollNumber: rollnO,
      school,
      section
    }
    const savedetails = await axios.post(`${API_BASE_JAVA_URL}${API_END_POINTS.updateIndividualStudentDetails}`, obj);

    console.log("savedetails", savedetails);


  }

  const getStudentDetails = async () => {
    console.log(state);
    SetRollno(state?.student.RollNo);
    SetCName(state?.student.Name);
    SetDob(state?.student.DOB);
    setCountry(state?.student.Country);
    SetState(state?.student.State);
    SetRollno(state?.student.RollNo);
    SetMobile(state?.student.Mobile);
    SetEmail(state?.student.Email);
    SetGender(state?.student.Gender);
    SetAdd1(state?.student.Add1);
    SetPin(state?.student.Pin);
    SetSchool(state?.student.School);
    SetClassCandidate(state?.student.Class);
    SetSection(state?.student.Section);
    SetPgEmail(state?.student.PGEmail);
    SetPgMobile(state?.student.PGMobile);
    SetLevelExam(state?.student.ExamLevel);
    SetExamTheme(state?.student.ExamTheme);
    SetDemoExam(state?.student.DemoExam);
  }

  useEffect(() => {
    getStudentDetails()
  }, []);



  return (

    <div className="container-fluid">
      <div className="row ">
        <div className="col-lg-3">
          {/* side bar will come here */}
          <SidebarStudent />

        </div>
        <div className="col-lg-9 ">
          <div class="container-fluid ps-md-4 ps-lg-5 pe-md-4 py-5">
            <div class="mybox shadow  mybg-accent-light px-4 py-3 mb-4">
              <div class="row align-items-center">
                <div class="col-sm">
                  <p class="mb-0 mb-sm-1">Candidate RollNo.</p>

                  <p class="font-bold mb-2 mb-sm-0">{rollnO}</p>
                </div>
                <div class="col-sm">
                  <p class="mb-0 mb-sm-1">Candidate Name</p>
                  <p class="font-bold mb-2 mb-sm-0">{cname}</p>
                </div>
                <div class="col-sm">
                  <p class="mb-0 mb-sm-1">Date of Birth</p>
                  <p class="font-bold mb-2 mb-sm-0">{dob}</p>
                </div>
              </div>
            </div>

            <div class="section-title mb-4 text-muted">
              <h6 class="font-bold ">Edit Personal Details</h6>
              <p>Fill this form for registration</p>
            </div>

            <div class="shadow bg-white rounded-16">
              <div class="p-4 ">
                <div class="row">
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Country</label>
                      {/* <select name="country" required>
                        <option>Country</option>
                        <option value="India">India</option>
                        <option value="Japan">Japan</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Bhutan">Bhutan</option>
                      </select> */}
                      <input type="text" placeholder="Country"
                        style={{ backgroundColor: "#dfdbdb" }}
                        disabled
                        name="city"
                        value={country}
                        required="" />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>State</label>
                      {/* <select name="state" required>
                        <option>State</option>
                        <option value="up">Uttar Pradesh</option>
                        <option value="mp">Madhya Pradesh</option>
                        <option value="goa">Goa</option>
                        <option value="uk">Uttrakhand</option>
                      </select> */}
                      <input type="text" placeholder="State"
                        style={{ backgroundColor: "#dfdbdb" }}
                        disabled
                        name="state"
                        value={stateval}
                        required="" />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>City</label>
                      <input type="text" placeholder="New Delhi" value={city} onChange={(e) => {
                        SetCity(e.target.value);
                      }}

                        name="city" required="" />
                    </div>
                  </div>
                </div>


                <div class="row">
                  {/* <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Name</label>
                      <input type="text" placeholder="Student Name" name="schname" required="" />
                    </div>
                  </div> */}
                  {/* <div class=" col-sm">
                    <div class="form-wrapper">
                      <label>Date of Birth</label>
                      <input type="date" placeholder="choose date" name="dob" required="" />
                    </div>
                  </div> */}
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Mobile</label>
                      <input type="text" name="mobile" placeholder="9xxxxxxxxx"
                        value={mobile} style={{ backgroundColor: "#dfdbdb" }}
                        disabled
                        required="" />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>E-mail </label>
                      <input type="text" name="email" value={email} placeholder="email@domain.in"
                        style={{ backgroundColor: "#dfdbdb" }}
                        disabled
                        required="" />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Gender</label>{gender}
                      <select name="gender" value={gender} onChange={(e) => {
                        SetGender(e.target.value);
                      }}>

                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>


                <div class="row">

                </div>


                <div class="row">
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Address</label>
                      <textarea name="address" placeholder="B-562, locality, street, city, state "
                        value={add1} onChange={(e) => {
                          SetAdd1(e.target.value);
                        }}
                        cols="30" rows="1"></textarea>
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Pin Code</label>
                      <input type="text" name="pincode" value={pin} onChange={(e) => {
                        SetPin(e.target.value);
                      }}

                        required="" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>School</label>
                      <input type="text" name="school" value={school} onChange={(e) => {
                        SetSchool(e.target.value);
                      }}
                        placeholder="School Name" required="" />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Class</label>
                      <input type="text" name="class" value={classcandidate} onChange={(e) => {
                        SetClassCandidate(e.target.value);
                      }}

                        placeholder="V" required />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Section</label>
                      <input type="text" name="section" value={section} onChange={(e) => {
                        SetSection(e.target.value);
                      }}
                        placeholder="A" required />
                    </div>
                  </div>
                </div>


                <div class="row">
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Name of Parent/Guardian</label>
                      <input type="text" name="pname" value={pgname} onChange={(e) => {
                        SetPgName(e.target.value);
                      }}
                        placeholder="Mr. Ram Kumar" required="" />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Email of Parent/Guardian</label>
                      <input type="email" name="pemail" value={pgemail} onChange={(e) => {
                        SetPgEmail(e.target.value);
                      }}
                        placeholder="email@parent.in" required />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Mobile of Parent/Guardian</label>
                      <input type="text" name="pmobile" placeholder="9xxxxxxxxx" value={pgemobile} onChange={(e) => {
                        SetPgMobile(e.target.value);
                      }} required />
                    </div>
                  </div>
                </div>


                <div class="row">
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Level of Exam</label>
                      <input type="text" name="level" placeholder="Level 1" style={{ backgroundColor: "#dfdbdb" }}
                        disabled value={levelexam}

                        required="" />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Exam Theme</label>
                      <select name="examtheme" value={examtheme} onChange={(e) => {
                        SetExamTheme(e.target.value);
                      }}>

                        <option value="ESD">ESD</option>
                        <option value="ESDGREEN">ESDGREEN</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Do you want to give demo exam</label>
                      <select name="examoption" value={demoexam} onChange={(e) => {
                        SetDemoExam(e.target.value);
                      }}>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row my-3">
                  <div class="text-center">
                    <button class="btn btn-primary mx-2 my-2" style={{ minWidth: '15rem' }} onClick={updateDetails}>Save &amp; Pay</button>
                    <button class="btn btn-secondary mx-2 my-2" style={{ minWidth: '10rem' }}>Edit</button>
                  </div>

                </div>



              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
