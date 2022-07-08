import React, { useState } from "react";
import { Link } from "react-router-dom";
import schoolimg from "../../assets/icons/school.png";
import { Colors } from "../../assets/css/color";
import "../../assets/css/style_new.css";
import Sidebar from "../main/sidebar";
import Slotmodal from "../main/modal/slotModal";

export default function SchoolSlot() {

  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
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
    //           <p class="side-text">SCHOOL DETAILS</p>
    //         </Link>
    //         <br />
    //         <Link to="">
    //           <p
    //             class="side-text"
    //           >
    //             UPLOAD STUDENTS DATA
    //           </p>
    //         </Link>
    //         <br />
    //         <Link to="">
    //           <p class="side-text">MAKE PAYMENT</p>
    //         </Link>
    //         <br />
    //         <Link to="">
    //           <p class="side-text"
    //             style={{ backgroundColor: Colors.MAINCOLOR, color: "#fff" }}
    //           >SELECT SLOT DETAILS</p>
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
    //         <Link to="/school-change-password" >
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

    //     <div style={{ marginLeft: 15 }}>
    //       <div>
    //         <div class="form-card-second">
    //           <div class="">
    //           <h2>Select Slot For Exam / Mock Test</h2>

    //           </div>
    //           <div class="">
    //             <label className="form-label" for="cars">Slot of Examination Test 1st</label>
    //             <select class="dropdown-school" id="cars">
    //               <option value="volvo">Select Slot</option>

    //               <option value="volvo">22-01-2022 / 09:30 AM</option>
    //               <option value="saab">12-02-2022 / 10:30 AM</option>
    //               <option value="opel">17-02-2022 / 10:30 AM</option>
    //               <option value="audi">22-02-2022 / 02:30 PM</option>
    //             </select>
    //             <a href="" data-toggle="modal" data-target="#myModalexam">
    //               <span className="slot-check">
    //                 <i class="fa fa-question-circle slot-check-icon"> Check Slot</i>
    //               </span>
    //             </a>
    //             <br />
    //             <label className="form-label" for="cars">Slot of Examination Test 2nd</label>
    //             <select class="dropdown-school" id="cars">
    //               <option value="volvo">Select Slot</option>

    //               <option value="volvo">22-01-2022 / 09:30 AM</option>
    //               <option value="saab">12-02-2022 / 10:30 AM</option>
    //               <option value="opel">17-02-2022 / 10:30 AM</option>
    //               <option value="audi">22-02-2022 / 02:30 PM</option>
    //             </select>
    //             <a href="" data-toggle="modal" data-target="#myModalexam">
    //               <span className="slot-check">
    //                 <i class="fa fa-question-circle slot-check-icon"> Check Slot</i>
    //               </span>
    //             </a>
    //             <br />
    //             <label className="form-label" for="cars">Slot of Mock Test</label>
    //             <select class="dropdown-school" id="cars">
    //               <option value="volvo">Select Slot</option>

    //               <option value="volvo">12-02-2022 / 10:30 AM</option>
    //               <option value="saab">06-06-2022 / 10:10 AM</option>
    //               <option value="opel">12-02-2022 / 10:30 PM</option>
    //               <option value="audi">22-02-2021 / 03:30 PM</option>
    //             </select>
    //             <a href="" data-toggle="modal" data-target="#myModalmock">
    //               <span className="slot-check">
    //                 <i class="fa fa-question-circle slot-check-icon"> Check Slot</i>
    //               </span>
    //             </a>
    //             <br />
    //             <div style={{ marginLeft: 155 }}>
    //               <Link to="/school-application-status">
    //                 <button className="main-btn" type="submit">
    //                   Book slot for Exam and Mock Test
    //                 </button>
    //               </Link>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="row ">
      <div className="col-lg-3">
        <Sidebar />
      </div>
      <div className="col-lg-9 ">
        <div className="dashboard-wraper d-flex ">

          <main className="content ">
            <div className="container-fluid ps-md-4 ps-lg-5 pe-md-4 py-5">
              <div className="section-title mb-4 text-muted">
                <h6 className="font-bold ">Select Slot for Exam/Mock Test</h6>
                <p>Slot selection for exam</p>
              </div>
              <div className="shadow bg-white rounded-16">
                <div className="p-4 ">
                  <div className="row">
                    <div className="col-sm">
                      <div className="form-wrapper">
                        <label>Slot for Examination Test 1st</label>

                        <select name="">
                          <option value="">item-1</option>
                          <option value="">item-2</option>
                          <option value="">item-3</option>
                        </select>
                        <a href="#" className="check-slot d-inline-block mt-2 font-bold" onClick={showModal}><svg className="icon align-middle">
                          <use xlinkHref="#check-slot"></use>
                        </svg> <span className="align-middle">Check Slot</span></a>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="form-wrapper">
                        <div className="form-wrapper">
                          <label>Slot for Examination Test 2nd</label>

                          <select name="">
                            <option value="">item-1</option>
                            <option value="">item-2</option>
                            <option value="">item-3</option>
                          </select>
                          <a href="#" className="check-slot d-inline-block mt-2 font-bold" onClick={showModal}><svg className="icon align-middle">
                            <use xlinkHref="#check-slot"></use>
                          </svg> <span className="align-middle">Check Slot</span></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-wrapper">
                        <label>Slot of Mock Test</label>
                        <select name="">
                          <option value="">item-1</option>
                          <option value="">item-2</option>
                          <option value="">item-3</option>
                        </select>
                        <a href="#" className="check-slot d-inline-block mt-2 font-bold" onClick={showModal}><svg className="icon align-middle">
                          <use xlinkHref="#check-slot"></use>
                        </svg> <span className="align-middle">Check Slot</span></a>
                      </div>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="text-center">
                      <button className="btn btn-primary mx-auto">Book slot for exam and mock test</button>
                    </div>
                  </div>
                  <Slotmodal show={show} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
