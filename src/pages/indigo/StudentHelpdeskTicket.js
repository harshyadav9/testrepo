import React, { useContext } from "react";
import { Link } from "react-router-dom";
import studentimg from "../../assets/icons/login.png";
import { Colors } from "../../assets/css/color";
import jwt_decode from "jwt-decode";

import { API_BASE_JAVA_URL, API_BASE_URL, API_END_POINTS } from "../../apis/api";
import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router";

import { notify } from '../../Utills'
import { StudentDataContext } from "../context/datacontext";
import SidebarStudent from "../main/sidebarStudent";
import SidebarIn from "../main/SidebarIn";
const dayjs = require('dayjs');
const decodedStudantData = {}
export default function StudentInHelpdeskTicket() {


  const { state, dispatch } = useContext(StudentDataContext);


  let [nameval, setNameVal] = useState('');
  let [s_coordinator, setSchool_coordinatorname] = useState('');
  let [email, setEmail] = useState('');
  let [s_coordinator_mobile, setC_mobile] = useState('');
  let [mobile, setMobile] = useState('');
  let [s_coordinator_email, setC_email] = useState('');

  let [category, setCategory] = useState([]);
  let [categoryId, setCategoryId] = useState([]);
  // let [selectedCat, _setCategory] = useState('');
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

  const getCategories = async () => {
    const categories = await axios.get(`${API_BASE_URL}${API_END_POINTS.getHelpDeskCategories}`);
    console.log("categories", categories);
    if (categories?.status === 200) {
      setCategory(categories.data.data);
      setNameVal(state?.student?.name);
      // setSchool_coordinatorname(state?.student?.name);
    }

  }
  useEffect(() => {
    getCategories()

  }, [])
  const handleCreateTikcet = async () => {


    // if (file) return;


    let obj = {}
    obj['categoryID'] = categoryId;
    obj['createdBy'] = state?.roll_no;
    obj['createdBy'] = state?.roll_no;
    obj['message'] = message;
    obj['modifiedBy'] = state?.roll_no;
    obj['schoolID_RollNo'] = state?.roll_no;
    obj['statusID'] = 1;
    obj['subject'] = subject;
    obj['subscriberType'] = 'INDV';  //INDV
    obj['ticketID'] = '';



    const data = await axios.post(`${API_BASE_JAVA_URL}${API_END_POINTS.createHelpdeskTicket}`, obj);


  }


  const setFileCb = event => {
    setFile(event.target.files[0]);
  };


  return (

    <div className="container-fluid">
      <div className="row ">
        <div className="col-lg-3">
          {/* side bar will come here */}
          <SidebarIn />

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
                        <label>Name</label>
                        <input type="text" disabled="" value={nameval} placeholder="abcd school" name="schname" required="" />
                      </div>
                      {/* <div class="form-wrapper">
                        <label>Email</label>
                        <input type="email" disabled name="email" placeholder="email@domain.com" value="schoolemail@domain.com" required />
                      </div>
                      <div class="form-wrapper">
                        <label>Mobile No.</label>
                        <input type="text" disabled="" placeholder="9xxxxxxxxx" name="mobile" value="9876543210" required="" />
                      </div> */}
                    </div>
                    <div class="col-sm">
                      {/* <div class="form-wrapper">
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
                      </div> */}
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
                        <select class="dropdown" id="cars" value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                          <option value="">Select</option>
                          {
                            category && Array.isArray(category) && category.map(cat => (
                              <option key={cat.CategoryID} value={cat?.CategoryID}>{cat?.CategoryName}</option>
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

                  {/* <div class="form-wrapper">
                    <label>Input File</label>
                    <input
                      type="file"
                      // style={{ display: "none" }}
                      name="please upload attachment"
                      onChange={setFileCb}
                    />
                  </div> */}
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
