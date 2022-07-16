import React, { useContext } from "react";
import { Link } from "react-router-dom";
import studentimg from "../../assets/icons/login.png";
import { Colors } from "../../assets/css/color";
import jwt_decode from "jwt-decode";

import { API_BASE_URL, API_END_POINTS } from "../../apis/api";
import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router";

import { notify } from '../../Utills'
import { StudentDataContext } from "../context/datacontext";
import SidebarStudent from "../main/sidebarStudent";
const dayjs = require('dayjs');
const decodedStudantData = {}
export default function StudentHelpdeskTicket() {


  const { state, dispatch } = useContext(StudentDataContext);


  let [category, setCategory] = useState([]);
  let [selectedCat, _setCategory] = useState('');
  let [subject, setSubject] = useState('');
  let [message, setMessage] = useState('');
  let [file, setFile] = useState(null)
  let navigate = useNavigate()

  let decodedStudantData = {}



  try {
    const userToken = localStorage.getItem("studant-token") ? localStorage.getItem("studant-token") : "";

    decodedStudantData = userToken !== "" ? jwt_decode(userToken) : {};
  } catch (e) {
    console.log(`Error in getting login data`)
  }

  const getStudants = async () => {
    const data = await axios.get(`${API_BASE_URL}${API_END_POINTS.getCategory}`);
    console.log("tests", data)
    if (data && data.data && data.data.status) {
      setCategory(data.data.list)
    }

  }
  useEffect(() => {
    getStudants()

  }, [])
  const handleCreateTikcet = async () => {


    // if (file) return;
    let formData = new FormData();
    formData.append("studant", file);
    formData.append("category", selectedCat);
    formData.append("message", message);
    formData.append("status", 'open');
    formData.append("subject", subject);
    formData.append("registrationNumber", state?.roll_no);
    formData.append("ticket_date", `${dayjs(new Date()).format('YYYY-MM-DD')}`);
    console.log("formData", formData);
    // const data = await axios.post(`${API_BASE_URL}${API_END_POINTS.uploadStudantdata}`, formData);
    // if (data && data?.data?.status) {
    //   notify('Help ticket is created ', true)
    //   navigate('/student-view-helpdesk-ticket')
    // } else {
    //   notify('Help ticket is created ', true)

    // }

  }


  const setFileCb = event => {
    setFile(event.target.files[0]);
  };


  return (
    // <div className="container-home">
    //   <div className="card">
    //     <div className="card-body">
    //       <h6 class="card-title">
    //         <span>
    //           <img class="card-img-top" src={studentimg} alt="Card image" />
    //         </span>
    //         SCHOOL DESK
    //       </h6>
    //       <ul class="sidebar">
    //         <Link to="">
    //           <p
    //             class="side-text"
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
    //         <Link to="/student-helpdesk-ticket">
    //           <p class="side-text"
    //             style={{ backgroundColor: Colors.MAINCOLOR, color: "#fff" }}
    //           >SUBMIT HELPDESK TICKET</p>
    //         </Link>
    //         <br />
    //         <Link to="/student-view-helpdesk-ticket">
    //           <p class="side-text">VIEW HELPDESK TICKET</p>
    //         </Link>
    //         <br />
    //         <Link to="/student-certificate">
    //           <p class="side-text">DOWNLOAD CERTIFICATE</p>
    //         </Link>
    //         <br />
    //         <Link to="/student-change-password">
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
    //     <div className="top-label">
    //       <input
    //         className="top-index"
    //         type="text"
    //         placeholder={`Candidate Roll no: ${decodedStudantData?.Rollno}`}
    //         name="uname"
    //         required
    //         style={{ backgroundColor: "#dfdbdb" }}
    //         disabled
    //       />
    //       <input
    //         className="top-index"
    //         type="text"
    //         placeholder={`Candidate Name: ${decodedStudantData?.Name}`}
    //         name="uname"
    //         required
    //         style={{ backgroundColor: "#dfdbdb" }}
    //         disabled
    //       />
    //       <input
    //         className="top-index"
    //         type="text"
    //         placeholder={`Date of Birth: ${dayjs(decodedStudantData?.DOB).format('YYYY-MM-DD')}`}
    //         name="uname"
    //         required
    //         style={{ backgroundColor: "#dfdbdb" }}
    //         disabled
    //       />
    //     </div>
    //     <div className="form-card-second">
    //       <div className="imgcontainer">
    //         <h2>Helpdesk Ticket</h2>
    //       </div>

    //       <div class="">
    //         <label className="">Name:</label>
    //         <input
    //           type="text"
    //           style={{ backgroundColor: "#dfdbdb" }}
    //           disabled
    //           placeholder={decodedStudantData?.Name}
    //           name="uname"
    //           required
    //         />
    //         <br />

    //         <label className="">Mobile Number:</label>

    //         <input
    //           type="text"
    //           placeholder={decodedStudantData?.Mobile}
    //           name="6789876765"
    //           required
    //           style={{ backgroundColor: "#dfdbdb" }}
    //           disabled
    //         />
    //         <br />

    //         <label className="">E-Mail:</label>
    //         <input
    //           type="text"
    //           placeholder={decodedStudantData?.Email}
    //           name="phone"
    //           required
    //           style={{ backgroundColor: "#dfdbdb" }}
    //           disabled
    //         />
    //         <br />
    //         <label for="cars">Category:</label>
    //         <select class="dropdown" id="cars" onChange={e => _setCategory(e.target.value)}>
    //           <option value="">Select</option>
    //           {
    //             category && Array.isArray(category) && category.map(cat => (
    //               <option key={cat.Name} value={cat?.Name}>{cat?.Name}</option>
    //             ))
    //           }
    //         </select>
    //         <br />

    //         <label className="">Subject:</label>
    //         <input type="text" placeholder="Subject" name="phone" required onChange={e => setSubject(e.target.value)} />
    //         <br />
    //         <label className="">Message:</label>
    //         <textarea type="text" placeholder="Messages" name="uname" required onChange={e => setMessage(e.target.value)} />
    //         <br />
    //         <label for="cars" style={{ display: "none" }}>Attach Snapshot:</label>

    //         <input
    //           type="file"
    //           style={{ display: "none" }}
    //           name="please upload attachment"
    //           onChange={setFileCb}
    //         />
    //         <br />

    //         <div class="d-flex justify-content-end btnmain">
    //           {/*<Link to="/student-view-helpdesk-ticket"> */}
    //           <button className="main-btn" onClick={handleCreateTikcet}>
    //             Submit
    //           </button>
    //           {/* </Link> */}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="container-fluid">
      <div className="row ">
        <div className="col-lg-3">
          {/* side bar will come here */}
          <SidebarStudent />

        </div>
        <div className="col-lg-9 ">
          <main class="content ">
            <div class="container-fluid ps-md-4 ps-lg-5 pe-md-4 pe-lg-5 pt-3 pt-md-5 pb-5">
              <div class="section-title mb-4 text-muted">
                <h6 class="font-bold ">Helpdesk Ticket</h6>

              </div>
              <div class="shadow bg-white rounded-16">
                <div class="p-4 ">
                  <div class="row">
                    <div class="col-sm">
                      <div class="form-wrapper">
                        <label>School Name</label>
                        <input type="text" disabled="" placeholder="abcd school" name="schname" value="ABCD School" required="" />
                      </div>
                      <div class="form-wrapper">
                        <label>Email</label>
                        <input type="email" disabled name="email" placeholder="email@domain.com" value="schoolemail@domain.com" required />
                      </div>
                      <div class="form-wrapper">
                        <label>Mobile No.</label>
                        <input type="text" disabled="" placeholder="9xxxxxxxxx" name="mobile" value="9876543210" required="" />
                      </div>
                    </div>
                    <div class="col-sm">
                      <div class="form-wrapper">
                        <label>School Coordinator Name</label>
                        <input type="text" disabled="" placeholder="abcd" name="coname" value="Abhay" required="" />
                      </div>
                      <div class="form-wrapper">
                        <label>School Coordinator Mobile No.</label>
                        <input type="text" disabled="" placeholder="9xxxxxxxxx" name="comobile" value="9876543210" required="" />
                      </div>
                      <div class="form-wrapper">
                        <label>School Coordinator Email</label>
                        <input type="email" disabled name="coemail" placeholder="email@domain.com" value="schoolcoordinatoremail@domain.com" required />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm">
                      <div class="form-wrapper">
                        <label>Category</label>
                        {/* <select name="category">
                          <option value="">category-1</option>
                          <option value="">category-2</option>
                          <option value="">category-3</option>
                        </select> */}
                        <select class="dropdown" id="cars" onChange={e => _setCategory(e.target.value)}>
                          <option value="">Select</option>
                          {
                            category && Array.isArray(category) && category.map(cat => (
                              <option key={cat.Name} value={cat?.Name}>{cat?.Name}</option>
                            ))
                          }
                        </select>
                      </div>
                    </div>
                    <div class="col-sm">
                      <div class="form-wrapper">
                        <label>Subject</label>
                        <input type="text" placeholder="Subject" name="subject" onChange={e => setSubject(e.target.value)} required="" />
                      </div>
                    </div>
                  </div>
                  <div class="form-wrapper">
                    <label>Message</label>
                    <textarea name="message" placeholder="your message" cols="30" rows="2" onChange={e => setMessage(e.target.value)}></textarea>
                  </div>

                  <div class="form-wrapper">
                    <label>Input File</label>
                    <input
                      type="file"
                      // style={{ display: "none" }}
                      name="please upload attachment"
                      onChange={setFileCb}
                    />
                  </div>
                  <div class="row my-3">
                    <div class="text-center">
                      <button class="btn btn-primary mx-auto" style={{ width: '15rem' }} onClick={handleCreateTikcet}>Submit</button>
                    </div>
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
