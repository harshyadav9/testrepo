import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import studentimg from "../../assets/icons/login.png";
import { Colors } from "../../assets/css/color";
import { API_BASE_URL, API_END_POINTS } from "../../apis/api";

import { useNavigate } from "react-router";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { notify } from '../../Utills'
import SidebarStudent from "../main/sidebarStudent";
const dayjs = require('dayjs');
export default function StudentViewHelpdeskTicket() {
  let i = 0;
  let decodedSchoolData = {};
  let [tickets, setTicket] = useState([])
  let [savedCopy, setSavedCopy] = useState([])

  try {
    const userToken = localStorage.getItem("studant-token") ? localStorage.getItem("studant-token") : "";
    let token = userToken;
    decodedSchoolData = token !== "" ? jwt_decode(token) : {};
  } catch (e) {
    console.log('Error in Help Desk', e)
  }
  const getTickets = async () => {
    const data = await axios.post(`${API_BASE_URL}${API_END_POINTS.getAllTickets}`, { id: decodedSchoolData.Rollno });
    console.log("testsjflkjsdlf", data.data.list)
    if (data && data.data && data.data.status) {
      setTicket(data.data.list)
      setSavedCopy(data.data.list)
    }

  }
  useEffect(() => {

    getTickets()

  }, [])

  console.log('tickets', tickets)
  const filterTicket = (e) => {
    console.log("====event ", e.target.value)
    let filkey = ''
    if (e.target.value === 'Open') {
      filkey = 'open'
    } else {
      filkey = 'close'
    }
    let va = e.target.value.toLowerCase()

    let cpy = [...savedCopy];
    setTicket(cpy.filter(t => t.status === filkey))

  }

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
    //           <p class="side-text">SCHOOL DETAILS</p>
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
    //           <p class="side-text">SUBMIT HELPDESK TICKET</p>
    //         </Link>
    //         <br />
    //         <Link to="/student-view-helpdesk-ticket">
    //           <p
    //             class="side-text"
    //             style={{ backgroundColor: Colors.MAINCOLOR, color: "#fff" }}
    //           >
    //             VIEW HELPDESK TICKET
    //           </p>
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
    //         placeholder={`Candidate Roll no: ${decodedSchoolData?.Rollno}`}

    //         name="uname"
    //         required
    //         style={{ backgroundColor: "#dfdbdb" }}
    //         disabled
    //       />
    //       <input
    //         className="top-index"
    //         type="text"
    //         placeholder={`Candidate Name: ${decodedSchoolData?.Name}`}
    //         name="uname"
    //         required
    //         style={{ backgroundColor: "#dfdbdb" }}
    //         disabled
    //       />
    //       <input
    //         className="top-index"
    //         type="text"
    //         placeholder={`Date of Birth: ${dayjs(decodedSchoolData?.DOB).format('YYYY-MM-DD')}`}

    //         name="uname"
    //         required
    //         style={{ backgroundColor: "#dfdbdb" }}
    //         disabled
    //       />
    //     </div>
    //     <h3>View Helpdesk Ticket</h3>
    //     {/*  */}
    //     <div className="container">

    //       <div className="row" style={{ height: '100px' }}>
    //         <div class="col-md-12">

    //           <div className="well well-sm" style={{ height: '600px', width: '70%', marginTop: '24px', marginLeft: '97px' }}>



    //             <form class="form-horizontal viewHelpDeskMainForm">
    //               <div>
    //                 <table class="table table-bordered table table-striped viewhelpdeskTable">

    //                   <div class="row">

    //                     <div class="col-md-6">
    //                       <input type="radio" class="form-check-input" checked="checked"
    //                         name="open_close"
    //                         value="Open" onChange={filterTicket} />Open
    //                     </div>
    //                     <div class="col-md-6">
    //                       <input type="radio" class="form-check-input" name="open_close"
    //                         value="Closed" onChange={filterTicket} />Closed
    //                     </div>
    //                   </div>
    //                   <thead>

    //                     <tr style={{ textAlign: 'center' }}>
    //                       <th style={{
    //                         marginTop: '25px', /* paddingBottom: 0, */
    //                         backgroundColor: '#1e426b', color: '#fff', padding: '5px', borderRadius: '5px'
    //                       }}>Query Tickets</th>
    //                     </tr>
    //                   </thead>
    //                 </table>

    //               </div>
    //               <>
    //                 <table class="table table-bordered table table-striped viewhelpdeskTable">

    //                   <thead>
    //                     <p style={{ "color": "red" }}></p>
    //                     <tr style={{ textAlign: 'center' }}>
    //                       <th style={{
    //                         marginTop: '25px', /* paddingBottom: 0, */
    //                         backgroundColor: '#1e426b', color: '#fff', padding: '5px', borderRadius: '5px'
    //                       }}>Sr No.</th>
    //                       <th style={{
    //                         marginTop: '25px', /* paddingBottom: 0, */
    //                         backgroundColor: '#1e426b', color: '#fff', padding: '5px', borderRadius: '5px'
    //                       }}>Registration No</th>
    //                       {/* <th style="margin-top: 25px;
    //                                             /* padding-bottom: 0; * /
    //                                             background-color: #1e426b;
    //                                             color: #fff;
    //                                             padding: 5px;
    //                                             border-radius: 5px;">Ticket No</th> */}
    //                       <th style={{
    //                         marginTop: '25px', /* paddingBottom: 0, */
    //                         backgroundColor: '#1e426b', color: '#fff', padding: '5px', borderRadius: '5px'
    //                       }}>Ticket Date</th>
    //                       <th style={{
    //                         marginTop: '25px', /* paddingBottom: 0, */
    //                         backgroundColor: '#1e426b', color: '#fff', padding: '5px', borderRadius: '5px'
    //                       }}>Reply Date</th>
    //                       <th style={{
    //                         marginTop: '25px', /* paddingBottom: 0, */
    //                         backgroundColor: '#1e426b', color: '#fff', padding: '5px', borderRadius: '5px'
    //                       }}>Ticket Category</th>
    //                       <th style={{
    //                         marginTop: '25px', /* paddingBottom: 0, */
    //                         backgroundColor: '#1e426b', color: '#fff', padding: '5px', borderRadius: '5px'
    //                       }}>Subject</th>
    //                       <th style={{
    //                         marginTop: '25px', /* paddingBottom: 0, */
    //                         backgroundColor: '#1e426b', color: '#fff', padding: '5px', borderRadius: '5px'
    //                       }}>Reply</th>

    //                       <th style={{
    //                         marginTop: '25px', /* paddingBottom: 0, */
    //                         backgroundColor: '#1e426b', color: '#fff', padding: '5px', borderRadius: '5px'
    //                       }}>Status</th>
    //                     </tr>
    //                   </thead>
    //                   <tbody>
    //                     {
    //                       tickets && Array.isArray(tickets) && tickets.length > 0 ? tickets.map((t, i) => (<tr style={{ textAlign: 'center' }}>
    //                         <td>{i + 1}</td>
    //                         <td>{t.registrationNumber}</td>
    //                         <td>{dayjs(t.ticket_date).format('YYYY-MM-DD')}</td>
    //                         <td>{dayjs(t.reply_date).format('YYYY-MM-DD')}</td>
    //                         <td>
    //                           {t.category}
    //                         </td>
    //                         <td>{t.subject}</td>
    //                         <td>{t?.reply}</td>

    //                         <td>{t.status}</td>
    //                       </tr>)
    //                       ) : (<h4>No Ticket Generated</h4>)
    //                     }


    //                   </tbody>
    //                 </table>
    //               </>


    //             </form>
    //           </div>
    //         </div>
    //       </div>

    //     </div>

    //     {/* end */}
    //   </div>
    // </div>
    <div className="container-fluid">
      <div className="row ">
        <div className="col-lg-3">
          {/* side bar will come here */}
          <SidebarStudent />

        </div>
        <div className="col-lg-9 ">
          STUDENT VIEW HELP DESK
        </div>
      </div>
    </div>
  );
}
