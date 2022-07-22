import React, { useContext } from "react";
import { Link } from "react-router-dom";
import schoolimg from "../../assets/icons/school.png";
import { Colors } from "../../assets/css/color";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, API_END_POINTS } from "../../apis/api";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import Sidebar from "../main/sidebar";
import Error from './ErrorList';
import { StudentDataContext } from "../context/datacontext";
import { notify } from "../../Utills";

export default function SchoolEditDetails() {


  const { state, dispatch } = useContext(StudentDataContext);

  console.log("state", state);

  // const decoded = localStorage.getItem("token") ? localStorage.getItem("token") : "";
  // let token = userToken;
  //let decoded = token !== "" ? jwt_decode(token) : {};

  let decoded = { ...state };

  console.log('decoded', decoded);
  const navigate = useNavigate();
  const [postalAddress, setpostalAddress] = useState("");
  const [district, setdistrict] = useState("");
  const [phoneStd, setphoneStd] = useState("");

  const [coordinatingTeacher, setcoordinatingTeacher] = useState("");



  const [coordinatingTeacherEmail, setcoordinatingTeacherEmail] = useState("");
  const [coordinatingTeacherMobile, setcoordinatingTeacherMobile] = useState("");
  const [errorList, setErrorList] = useState(Error);
  const [error_message, setError_message] = useState('');

  const [RegisterationClicked, setRegisterationClicked] = useState(0);


  useEffect(() => {
    setphoneStd(state.phonestd);
    setpostalAddress(state.postal_address);
    setdistrict(state.district);
    setcoordinatingTeacher(state.coordinating_teacher);
    if (state.email_coordinator === "undefined") {
      setcoordinatingTeacherEmail("");
    } else {
      setcoordinatingTeacherEmail(state.email_coordinator);
    }

    if (state.mobile_coordinator === "undefined") {
      setcoordinatingTeacherMobile("");
    } else {
      setcoordinatingTeacherMobile(state.mobile_coordinator);
    }

  }, []);
  const checkAllField = () => {
    let arr = [postalAddress, phoneStd, district, coordinatingTeacher, coordinatingTeacherEmail, coordinatingTeacherMobile];
    let arrKey = ['postalAddress', 'phoneStd', 'district', 'coordinatingTeacher', 'coordinatingTeacherEmail', 'coordinatingTeacherMobile'];
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
      case "postalAddress":
      case "district":
      case "coordinatingTeacher":
        if ((value === undefined) || (value === null) || (value.length < 1))
          err = (errorList.find(item => item.fieldNam === key).message);
        break;
      case "coordinatingTeacherMobile":
        if ((value === undefined) || (value === null) || (value.length < 1))
          err = (errorList.find(item => item.fieldNam === key).message);
        break;
      case "coordinatingTeacherEmail":
        if ((value === undefined) || (value === null) || (value.length < 1))
          err = (errorList.find(item => item.fieldNam === key).message);
        if (err === '') {
          let item = errorList.find(item => item.fieldNam === key);
          let regExp = RegExp(item.regex)
          err = (regExp.test(value) ? "" : item.message2);
        }
        break;
      case "phoneStd":
        if ((value === undefined) || (value === null) || (value.length < 1))
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

  const RegisterationApi = () => {
    // console.log("editschool", `${API_ADMIN_URL_2}${EDIT_SCHOOL_API}`);

    setRegisterationClicked(1);
    let err = checkAllField();
    if (err)
      return err;


    const editschooloption = {
      postaladdress: postalAddress,
      district: district,
      coordinatingteacher: coordinatingTeacher,
      phoneStd: phoneStd,
      // code: decoded?.schoolsCode
      code: state?.school_code,
      email_coordinator: coordinatingTeacherEmail,
      mobile_coordinator: coordinatingTeacherMobile
    };
    dispatch({
      type: 'SAVEINFO',
      postal_address: postalAddress,
      phonestd: phoneStd,
      district: district,
      coordinating_teacher: coordinatingTeacher,
      email_coordinator: coordinatingTeacherEmail,
      mobile_coordinator: coordinatingTeacherMobile
    });


    axios
      .post(`${API_BASE_URL}${API_END_POINTS?.updateShoolData}`, editschooloption)
      // .post(`${API_END_POINTS?.updateShoolData}`, editschooloption)
      .then((res) => {
        console.log("hhhhhhh", res.data);
        if (res.data) {
          // alert("data updated");
          // notify(`data updated successfull!!.`, true);
          navigate("/school-upload-data");
        } else {
          alert("something is rong");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    // <div className="container-home">
    //   <div className="card">
    //     <div className="card-body">
    //       <h6 class="card-title">
    //         <span>
    //           <img class="card-img-top" src={schoolimg} alt="Card image" />
    //         </span>
    //         SCHOOL DESK
    //       </h6>
    //       <ul class="sidebar">
    //         <Link to="">
    //           <p
    //             class="side-text"
    //             style={{ backgroundColor: Colors.MAINCOLOR, color: "#fff" }}
    //           >
    //             SCHOOL DETAILS
    //           </p>
    //         </Link>
    //         <br />
    //         <Link to="">
    //           <p class="side-text">UPLOAD STUDENTS DATA</p>
    //         </Link>
    //         <br />
    //         <Link to="">
    //           <p class="side-text">MAKE PAYMENT</p>
    //         </Link>
    //         <br />
    //         <Link to="">
    //           <p class="side-text">SELECT SLOT DETAILS</p>
    //         </Link>
    //         <br />
    //         <Link to="">
    //           <p class="side-text">APPLICATION STATUS</p>
    //         </Link>
    //         <br />
    //         <Link to="/school-helpdesk-ticket">
    //           <p class="side-text">SUBMIT HELPDESK TICKET</p>
    //         </Link>
    //         <br />
    //         <Link to="/school-view-helpdesk-ticket">
    //           <p class="side-text">VIEW HELPDESK TICKET</p>
    //         </Link>
    //         <br />
    //         <Link to="/school-certificate">
    //           <p class="side-text">DOWNLOAD CERTIFICATE</p>
    //         </Link>
    //         <br />
    //         <Link to="/school-change-password">
    //           <p class="side-text">CHANGE PASSWORD</p>
    //         </Link>
    //         <br />
    //         <Link to="/">
    //           <p class="side-text">LOGOUT</p>
    //         </Link>
    //         <br />
    //       </ul>
    //     </div>
    //   </div>

    //   <div className="main-head">
    //     <div className="main">
    //       <marquee> Welcome to Green Olympiad</marquee>
    //     </div>

    //     <div className="form-card-second">
    //       <div className="imgcontainer">
    //         <h2>Edit School Details</h2>
    //       </div>

    //       <div class="">
    //         <label className="form-label">School Name:</label>
    //         <input
    //           type="text"
    //           style={{ backgroundColor: "#dfdbdb" }}
    //           disabled
    //           placeholder={decoded?.schoolname}
    //           name="uname"
    //           required
    //         />
    //         <br />

    //         <label className="form-label">Postal Address:</label>

    //         <input
    //           type="text"
    //           placeholder={decoded?.PostalAddress}
    //           name="phone"
    //           required
    //           onChange={(postalAddress) =>
    //             setpostalAddress(postalAddress.target.value)
    //           }
    //         />
    //         <br />

    //         <label className="form-label">District:</label>
    //         <input
    //           type="text"
    //           placeholder={decoded?.district}
    //           name="phone"
    //           required
    //           onChange={(district) => setdistrict(district.target.value)}
    //         />
    //         <br />
    //         <label className="form-label">State:</label>
    //         <input
    //           type="text"
    //           style={{ backgroundColor: "#dfdbdb" }}
    //           disabled
    //           placeholder={decoded?.state}
    //           name="uname"
    //           required
    //         />
    //         <br />
    //         <label className="form-label">Pin Code:</label>
    //         <input
    //           type="text"
    //           style={{ backgroundColor: "#dfdbdb" }}
    //           disabled
    //           placeholder={decoded?.pincode}
    //           name="uname"
    //           required
    //         />
    //         <br />
    //         <label className="form-label">Country:</label>
    //         <input
    //           type="text"
    //           style={{ backgroundColor: "#dfdbdb" }}
    //           disabled
    //           placeholder={decoded?.country}
    //           name="uname"
    //           required
    //         />
    //         <br />
    //         <label className="form-label">Phone No. with STD code :</label>
    //         <input
    //           type="text"
    //           placeholder={decoded?.PhoneStd}
    //           name="phone"
    //           required
    //           onChange={(phoneStd) => setphoneStd(phoneStd.target.value)}
    //         />
    //         <br />
    //         <label className="form-label">Mobile:</label>
    //         <input
    //           type="text"
    //           style={{ backgroundColor: "#dfdbdb" }}
    //           disabled
    //           placeholder={decoded?.mobile}
    //           name="uname"
    //           required
    //         />
    //         <br />
    //         <label className="form-label">E-mail Id (School/Principal):</label>
    //         <input
    //           type="text"
    //           style={{ backgroundColor: "#dfdbdb" }}
    //           disabled
    //           placeholder={decoded?.email}
    //           name="uname"
    //           required
    //         />
    //         <br />
    //         <label className="form-label">Name of the Principal:</label>
    //         <input
    //           type="text"
    //           style={{ backgroundColor: "#dfdbdb" }}
    //           disabled
    //           placeholder={decoded?.principalname}
    //           name="uname"
    //           required
    //         />
    //         <br />
    //         <label className="form-label">
    //           Name of the Coordinating Teacher:
    //         </label>
    //         <input
    //           type="text"
    //           placeholder={decoded?.coordinating_teacher}
    //           name="uname"
    //           required
    //           onChange={(coordinatingTeacher) =>
    //             setcoordinatingTeacher(coordinatingTeacher.target.value)
    //           }
    //         />
    //         <br />

    //         <div class="d-flex justify-content-end btnmain">
    //           <button
    //             className="main-btn"
    //             type="submit"
    //             onClick={RegisterationApi}
    //           >
    //             Save & Proceed
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="container-fluid">
      <div className="row ">
        <div className="col-lg-3">
          {/* side bar will come here */}
          <Sidebar />

        </div>
        <div className="col-lg-9 ">
          <main className="p-md-5 p-2">
            <div className="section-title mb-4 text-muted">
              <h6 className="font-bold ">Edit School Registration</h6>
              {/* <p>Fill this form for registration</p> */}
            </div>
            <div className="shadow  rounded-16">
              <div className="p-4 ">
                <div className="row">
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>School Name:</label>
                      {/* <input type="text" disabled="" placeholder="abcd school" name="schname" required="" /> */}
                      <input
                        type="text"
                        style={{ backgroundColor: "#dfdbdb" }}
                        disabled
                        // placeholder={decoded?.schoolname}
                        value={decoded?.schoolname}
                        name="uname"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>Country</label>
                      {/* <input type="text" disabled="" placeholder="" name="country" required="" value="India" /> */}
                      <input
                        type="text"
                        style={{ backgroundColor: "#dfdbdb" }}
                        disabled
                        placeholder={decoded?.country}
                        name="uname"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>State</label>
                      {/* <input type="text" disabled="" value="Uttar Pradesh" name="state" required="" /> */}
                      <input
                        type="text"
                        style={{ backgroundColor: "#dfdbdb" }}
                        disabled
                        placeholder={decoded?.state}
                        name="uname"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>Pin Code</label>
                      {/* <input type="text" disabled="" value="100201" name="pincode" required="" /> */}
                      <input
                        type="text"
                        style={{ backgroundColor: "#dfdbdb" }}
                        disabled
                        placeholder={decoded?.pincode}
                        name="uname"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-wrapper">
                  <label >Postal Address<span style={{ color: 'red' }}>*</span></label>
                  {/* <textarea name="address" placeholder="sample address" cols="30" rows="2"></textarea> */}
                  <textarea name="postalAddress" placeholder="postal address" value={postalAddress} cols="30" rows="2" required
                    onChange={(e, postalAddress) => {
                      setpostalAddress(e.target.value);
                      formValidate({ 'key': 'postalAddress', 'value': e.target.value });
                    }
                    }>

                  </textarea>


                </div>
                <div className="row">
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>Phone No. (with STD code) <span style={{ color: 'red' }}>*</span></label>
                      {/* <input type="text" placeholder="011-4xxxxxxx" name="stdcode" required="" /> */}
                      <input
                        type="text"
                        placeholder="Phone No"
                        value={phoneStd}
                        name="phoneStd"
                        required
                        onChange={(e, phoneStd) => {
                          setphoneStd(e.target.value);
                          formValidate({ 'key': 'phoneStd', 'value': e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>Mobile</label>
                      {/* <input type="text" disabled="" value="9900887766" name="mobile" required="" /> */}
                      <input
                        type="text"
                        style={{ backgroundColor: "#dfdbdb" }}
                        disabled
                        placeholder={decoded?.mobile}
                        name="uname"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>Name of the Principal</label>
                      {/* <input type="text" disabled="" value="Mr. Ram" name="principalname" required="" /> */}
                      <input
                        type="text"
                        style={{ backgroundColor: "#dfdbdb" }}
                        disabled
                        placeholder={decoded?.principal_name}
                        name="uname"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>E-mail Id </label>
                      {/* <input type="text" disabled="" value="abcd3456@gmail.com" name="email" required="" /> */}
                      <input
                        type="text"
                        style={{ backgroundColor: "#dfdbdb" }}
                        disabled
                        placeholder={decoded?.email}
                        name="uname"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>District<span style={{ color: 'red' }}>*</span></label>
                      {/* <input type="text" placeholder="District" name="district" required="" /> */}
                      <input
                        type="text"
                        placeholder="district"
                        value={district}
                        name="phone"
                        required
                        onChange={(e, district) => {
                          setdistrict(e.target.value);
                          formValidate({ 'key': 'district', 'value': e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>Name of the Coordinate Teacher<span style={{ color: 'red' }}>*</span></label>
                      {/* <input type="text" placeholder="Coordinating Teacher Name" name="coname" required="" /> */}
                      <input
                        type="text"
                        placeholder="coordinating teacher"
                        value={coordinatingTeacher}
                        name="coordinatingTeacher"
                        required
                        onChange={(e, coordinatingTeacher) => {
                          setcoordinatingTeacher(e.target.value)
                          formValidate({ 'key': 'coordinatingTeacher', 'value': e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/*  need to add db fields */}
                <div className="row">
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label >Email of the Coordinate Teacher<span style={{ color: 'red' }}>*</span></label>
                      <input type="email" name="coemail" value={coordinatingTeacherEmail} placeholder="email@techer.in"
                        onChange={(coordinatingTeacherEmail) => {
                          setcoordinatingTeacherEmail(coordinatingTeacherEmail.target.value.toLowerCase());
                          formValidate({ 'key': 'coordinatingTeacherEmail', 'value': coordinatingTeacherEmail.target.value.toLowerCase() })
                        }}
                        required />
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label >Mobile of the Coordinate Teacher<span style={{ color: 'red' }}>*</span></label>
                      <input type="text" name="comobile" value={coordinatingTeacherMobile} placeholder="9xxxxxxxxx"
                        onChange={(coordinatingTeacherMobile) => {
                          setcoordinatingTeacherMobile(coordinatingTeacherMobile.target.value);
                          formValidate({ 'key': 'coordinatingTeacherMobile', 'value': coordinatingTeacherMobile.target.value });
                        }}
                        required />
                    </div>
                  </div>
                </div>
                <div className="row my-3">
                  {RegisterationClicked === 1 && error_message && (<div className="alert alert-danger w-100" role="alert">
                    {error_message}
                  </div>)}
                  <div className="text-center">
                    <button className="btn btn-primary mx-auto" style={{ width: '15rem' }} onClick={RegisterationApi}>Save &amp; Proceed</button>
                  </div>
                </div>
                <div>
                  <h3>All fields marked with <span style={{ color: 'red' }}>*</span> are mandatory</h3>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
