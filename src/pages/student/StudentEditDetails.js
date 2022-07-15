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
  const navigate = useNavigate();
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

  const [classcandidate, SetClassCandidate] = useState(4);
  const [section, SetSection] = useState('');
  const [pgname, SetPgName] = useState(''); // bind kal 
  const [pgemail, SetPgEmail] = useState('');
  const [pgemobile, SetPgMobile] = useState('');
  const [levelexam, SetLevelExam] = useState('');
  const [examtheme, SetExamTheme] = useState('');
  const [demoexam, SetDemoExam] = useState('');

  const [slotDisabled, setSlotDisabled] = useState(true);
  const [errorList] = useState(Error);
  const [error_message, setError_message] = useState('');
  const [RegisterationClicked, setRegisterationClicked] = useState(0);

  // dispatch({
  //   type: 'ADD_STUDENT_INFO',
  //   student: {
  //     ...obj
  //   }
  // });




  const getStudentDetailsData = async () => {

    const studentdetails = await axios.get(`${API_BASE_JAVA_URL}${API_END_POINTS.viewIndividualStudentDetails}`, {
      params: {
        rollNumber: state?.roll_no
      }
    });

    if (studentdetails?.status === 200) {
      dispatch({
        type: 'ADD_STUDENT_INFO',
        student: {
          ...studentdetails.data
        }
      });
      console.log("state?.student.examSlotDateTime", studentdetails.data.examSlotDateTime);
      if (studentdetails.data.examSlotDateTime === null || studentdetails.data.demoSlotDateTime === null) {
        setSlotDisabled(false);
      } else {
        setSlotDisabled(true);
      }
      SetRollno(state?.roll_no);
      SetCName(studentdetails.data.name);
      SetDob(studentdetails.data.dob);
      setCountry(studentdetails.data.country);
      SetState(studentdetails.data.state);
      // SetRollno(studentdetails.data.RollNo);
      SetMobile(studentdetails.data.mobile);
      SetEmail(studentdetails.data.email);
      SetGender(studentdetails.data.gender || 'Male');
      SetAdd1(studentdetails.data.add1);
      SetPin(studentdetails.data.pin);
      SetSchool(studentdetails.data.school);
      SetClassCandidate(studentdetails.data.standard || 4);
      SetSection(studentdetails.data.section);
      SetPgEmail(studentdetails.data.pgEmail);
      SetPgMobile(studentdetails.data.pgMobile);
      SetLevelExam(studentdetails.data.examLevel || 'Level_1');
      SetExamTheme(studentdetails.data.examTheme || 'ESD');
      SetDemoExam(studentdetails.data.demoExam || 'YES');
      SetPgName(studentdetails.data?.pgName);
      SetCity(studentdetails.data?.city);

      checkAllField();
    }
    console.log("studentdetails", studentdetails);

  }


  useEffect(() => {
    getStudentDetailsData();
    // getStudentDetails();
  }, []);


  const updateDetails = async () => {
    setRegisterationClicked(1)

    let err = checkAllField();
    if (err)
      return err;
    console.log(rollnO, cname, country, dob, stateval, mobile, email, gender, pin, add1, school, classcandidate, section, pgname, pgemail, pgemobile, levelexam,
      examtheme, demoexam
    );

    let obj = {
      add1,
      city,
      country,
      createdby: rollnO,
      demoExam: demoexam,
      demoSlotDateTime: state?.student.DemoSlotDateTime,
      dob,
      email,
      examLevel: levelexam,
      // examSlotDateTime: state?.student.ExamSlotDateTime,
      examTheme: examtheme,
      gender,
      mobile,
      modifiedby: rollnO,
      name: cname,
      paymentStatus: state?.student.PaymentStatus,
      pgEmail: pgemail,
      pgMobile: pgemobile,
      pgName: pgname,
      pin,
      rollNo: rollnO,
      school,
      section,
      standard: classcandidate,
      createdBy: null,
      state_city_cd: null,
      countryCode: null,
      rollNoPrefix: null
    }
    const savedetails = await axios.post(`${API_BASE_JAVA_URL}${API_END_POINTS.updateIndividualStudentDetails}`, obj);

    console.log("savedetails", savedetails);
    if (savedetails?.status === 200) {
      navigate("/student-slot");
    }

  }

  // const getStudentDetails = async () => {
  //   console.log(state);
  //   SetRollno(state?.student.RollNo);
  //   SetCName(state?.student.Name);
  //   SetDob(state?.student.DOB);
  //   setCountry(state?.student.Country);
  //   SetState(state?.student.State);
  //   SetRollno(state?.student.RollNo);
  //   SetMobile(state?.student.Mobile);
  //   SetEmail(state?.student.Email);
  //   SetGender(state?.student.Gender || 'Male');
  //   SetAdd1(state?.student.Add1);
  //   SetPin(state?.student.Pin);
  //   SetSchool(state?.student.School);
  //   SetClassCandidate(state?.student.Class || 4);
  //   SetSection(state?.student.Section);
  //   SetPgEmail(state?.student.PGEmail);
  //   SetPgMobile(state?.student.PGMobile);
  //   SetLevelExam(state?.student.ExamLevel || 'Level_1');
  //   SetExamTheme(state?.student.ExamTheme || 'ESD');
  //   SetDemoExam(state?.student.DemoExam || 'YES');
  //   SetPgName(state?.student?.PGName);
  //   SetCity(state?.student?.City);




  //   checkAllField();
  // }



  const checkAllField = () => {
    let arr = [city, add1, pin, school, classcandidate, section, pgname, pgemail, pgemobile];
    let arrKey = ['city', 'add1', 'pin', 'school', 'classcandidate', 'section', 'pgname', 'pgemail', 'pgemobile'];
    let err = '';
    arr.forEach((value, index) => {
      if (err === '') {
        err = formValidate({ 'key': arrKey[index], 'value': value });
      }

    })

    return err;
  };


  const formValidate = (e) => {
    const { key, value } = e;
    let err = '';
    setError_message('');

    switch (key) {

      case "city":
      case "add1":
      case "school":
      case "pgname":
      case "classcandidate":
      case "section":
        if ((value === undefined) || (value === null) || (value.length < 1))
          err = (errorList.find(item => item.fieldNam === key).message);
        if (key == 'classcandidate') {
          if (+value > 12 || (+value < 4))
            err = 'Class Value range is 4 to 12 only';
          else {
            err = ""
            // let lvl = '';
            // if (+value >= 4 && +value <= 5) { lvl = 1; }
            // if (+value >= 6 && +value <= 8) { lvl = 2; }
            // if (+value >= 9 && +value <= 10) { lvl = 3; }
            // if (+value >= 11 && +value <= 12) { lvl = 4; }
            // if (lvl) {
            //   SetLevelExam('Level ' + lvl);
            // }
            // else {
            //   SetLevelExam(lvl);
            // }
          }
        }
        break;
      case "pgemobile":
        if (!value || (value.length < 1))
          err = (errorList.find(item => item.fieldNam === key).message);
        if (err === "") {
          let item = errorList.find(item => item.fieldNam === key);
          let regExp = RegExp(item.regex)
          err = (regExp.test(value) ? "" : item.message2);
        }
        break;
      case "pgemail":
        if (!value || (value.length < 1))
          err = (errorList.find(item => item.fieldNam === key).message);
        if (err === '') {
          let item = errorList.find(item => item.fieldNam === key);
          let regExp = RegExp(item.regex)
          err = (regExp.test(value) ? "" : item.message2);
        }
        break;
      case "pin":
        if (!value || value.length === 0)
          err = (errorList.find(item => item.fieldNam === key).message);
        if (err === '') {
          let item = errorList.find(item => item.fieldNam === key);
          let regExp = RegExp(item.regex)
          err = regExp.test(value) ? "" : item.message2;
        }
        break;
      default:
        break;
    }
    setError_message(err)
    return err;
  };




  const changeLevel = (value) => {
    let lvl = '';
    if (+value >= 4 && +value <= 5) { lvl = 1; }
    if (+value >= 6 && +value <= 8) { lvl = 2; }
    if (+value >= 9 && +value <= 10) { lvl = 3; }
    if (+value >= 11 && +value <= 12) { lvl = 4; }
    if (lvl) {
      SetLevelExam(`Level_${lvl}`);
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
                      <input type="text" placeholder=""
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
                      <input type="text" placeholder=""
                        style={{ backgroundColor: "#dfdbdb" }}
                        disabled
                        name="state"
                        value={stateval}
                        required="" />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>City<span style={{ color: 'red' }}>*</span></label>
                      <input type="text" placeholder="" value={city} onChange={(e) => {
                        SetCity(e.target.value);
                        formValidate({ 'key': 'city', 'value': e.target.value });
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
                      <input type="text" name="mobile" placeholder=""
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
                      <input type="text" name="email" value={email} placeholder=""
                        style={{ backgroundColor: "#dfdbdb" }}
                        disabled
                        required="" />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Gender<span style={{ color: 'red' }}>*</span></label>
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
                      <label>Address<span style={{ color: 'red' }}>*</span></label>
                      <textarea name="address" placeholder=""
                        value={add1} onChange={(e) => {
                          SetAdd1(e.target.value);
                          formValidate({ 'key': 'add1', 'value': e.target.value });
                        }}
                        cols="30" rows="1"></textarea>
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Pin Code<span style={{ color: 'red' }}>*</span></label>
                      <input type="text" name="pincode" value={pin} onChange={(e) => {
                        SetPin(e.target.value);
                        formValidate({ 'key': 'pin', 'value': e.target.value });
                      }}

                        required="" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>School<span style={{ color: 'red' }}>*</span></label>
                      <input type="text" name="school" value={school} onChange={(e) => {
                        SetSchool(e.target.value);
                        formValidate({ 'key': 'school', 'value': e.target.value });
                      }}
                        placeholder="" required="" />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Class<span style={{ color: 'red' }}>*</span></label>
                      {/* <input type="text" name="class" value={classcandidate} onChange={(e) => {
                        SetClassCandidate(e.target.value);
                      }} */}

                      <select name="class" value={classcandidate} onChange={(e) => {
                        changeLevel(e.target.value);
                        SetClassCandidate(e.target.value);
                        formValidate({ 'key': 'classcandidate', 'value': e.target.value });
                      }}>

                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>

                      {/* placeholder="V" required /> */}
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Section<span style={{ color: 'red' }}>*</span></label>
                      <input type="text" name="section" value={section} onChange={(e) => {
                        SetSection(e.target.value);
                        formValidate({ 'key': 'section', 'value': e.target.value });
                      }}
                        placeholder="" required />
                    </div>
                  </div>
                </div>


                <div class="row">
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Name of Parent/Guardian<span style={{ color: 'red' }}>*</span></label>
                      <input type="text" name="pname" value={pgname} onChange={(e) => {
                        SetPgName(e.target.value);
                        formValidate({ 'key': 'pgname', 'value': e.target.value });
                      }}
                        placeholder="" required="" />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Email of Parent/Guardian<span style={{ color: 'red' }}>*</span></label>
                      <input type="email" name="pemail" value={pgemail} onChange={(e) => {
                        SetPgEmail(e.target.value);
                        formValidate({ 'key': 'pgemail', 'value': e.target.value });
                      }}
                        placeholder="" required />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Mobile of Parent/Guardian<span style={{ color: 'red' }}>*</span></label>
                      <input type="text" name="pmobile" placeholder="" value={pgemobile} onChange={(e) => {
                        SetPgMobile(e.target.value);
                        formValidate({ 'key': 'pgemobile', 'value': e.target.value });
                      }} required />
                    </div>
                  </div>
                </div>


                <div class="row">
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Level of Exam</label>
                      <input type="text" name="level" placeholder="" style={{ backgroundColor: "#dfdbdb" }}
                        disabled value={levelexam}

                        required="" />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Exam Theme<span style={{ color: 'red' }}>*</span></label>
                      <select name="examtheme" disabled={slotDisabled} value={examtheme} onChange={(e) => {
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
                      <select name="examoption" disabled={slotDisabled} value={demoexam} onChange={(e) => {
                        SetDemoExam(e.target.value);
                      }}>
                        <option value="YES">Yes</option>
                        <option value="NO">No</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row my-3">
                  <h3>All fields marked with <span style={{ color: 'red' }}>*</span> are mandatory!!!</h3>
                  {RegisterationClicked === 1 && error_message && (<div className="alert alert-danger w-100" role="alert">
                    {error_message}
                  </div>)}
                  <div class="text-center">
                    <button class="btn btn-primary mx-2 my-2" style={{ minWidth: '15rem' }} onClick={updateDetails}>Save &amp; Proceed</button>
                    {/* <button class="btn btn-secondary mx-2 my-2" style={{ minWidth: '10rem' }}>Edit</button> */}
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
