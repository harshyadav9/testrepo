import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import studentimg from "../../assets/icons/login.png";
import { Colors } from "../../assets/css/color";
import { API_BASE_JAVA_URL, API_BASE_URL, API_END_POINTS } from "../../apis/api";

import { useNavigate } from "react-router";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { notify } from '../../Utills'
import SidebarStudent from "../main/sidebarStudent";
import { StudentDataContext } from "../context/datacontext";
import SidebarIn from "../main/SidebarIn";
const dayjs = require('dayjs');
export default function StudentInViewHelpdeskTicket() {
  let i = 0;
  let decodedSchoolData = {};

  const { state, dispatch } = useContext(StudentDataContext);
  let [tickets, setTickets] = useState([]);
  let [filteredTickets, setFilteredTickets] = useState([]);
  let [savedCopy, setSavedCopy] = useState([]);
  let [replyStatus, setReplystatus] = useState(1);
  let [messageReply, setMsgReply] = useState("");
  let [radioVal, setRadioVal] = useState("");
  let [ticketDetail, setTicketDetail] = useState({});






  const closeModal = () => {
    document.getElementsByClassName('modal')[0].style.display = 'none';
  }

  const submitReply = async () => {

    console.log("ticketDetail", ticketDetail)
    const submitReply = await axios.post(`${API_BASE_JAVA_URL}${API_END_POINTS.updateHelpdeskTicketDetails}`, {
      "categoryID": null,
      "createdBy": ticketDetail.createdBy,
      "message": messageReply,
      "modifiedBy": ticketDetail.createdBy,
      "schoolID_RollNo": ticketDetail.createdBy,
      "statusID": replyStatus,
      "subject": ticketDetail.subject,
      "subscriberType": ticketDetail.subscriberType,
      "ticketID": ticketDetail.ticketID
    });
    document.getElementsByClassName('modal')[0].style.display = 'none';
    await getTickets();
    filterData('All');
  }


  const filterData = (value) => {
    let tempData = [...tickets];
    // setStudanntData(tempData.filter((d, index) => i !== index));
    if (value === 'All') {
      setFilteredTickets([...tempData]);
    } else {
      setFilteredTickets(tempData.filter(ticket => ticket.statusName === value));
    }

  }

  const getTickets = async () => {
    console.log("state", state)
    const getAllTickets = await axios.get(`${API_BASE_JAVA_URL}${API_END_POINTS.getHelpdeskTicketDetails}`, {
      params: {
        school_roll_id: state?.student?.rollNo
      }
    });

    if (getAllTickets?.status === 200) {
      console.log("getAllTickets.data", getAllTickets.data)
      setTickets(getAllTickets.data);
      setFilteredTickets(getAllTickets.data);
    }

    console.log("getAllTickets", getAllTickets);
  }


  useEffect(() => {

    getTickets();

  }, []);

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
    // setTicket(cpy.filter(t => t.status === filkey))

  }

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
                <h6 class="font-bold ">Query Tickets</h6>

              </div>
              <div class="shadow bg-white rounded-16">
                <div class="p-4 ">
                  <div class="mb-4">
                    <div class="form-check form-check-inline">
                      <label class="form-check-label">

                        {/* <div class="form-check form-check-inline"> */}
                        {/* <label class="form-check-label"> */}
                        <input class="form-check-input" type="radio" name="query" onChange={e => {
                          filterData(e.currentTarget.value);
                        }}
                          value="All" />All
                      </label>
                    </div>

                    <div class="form-check form-check-inline">
                      <label class="form-check-label">

                        <input class="form-check-input" type="radio" name="query" onChange={e => {
                          filterData(e.currentTarget.value);
                        }}
                          value="Open" />
                        Open</label>
                    </div>


                    <div class="form-check form-check-inline">
                      <label class="form-check-label">
                        <input class="form-check-input" type="radio" name="query" onChange={e => {
                          filterData(e.currentTarget.value);
                        }}
                          value="Closed" />
                        Closed</label>
                    </div>


                  </div>
                  <div class="table-responsive ">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Sno.</th>
                          <th>Ticket ID</th>
                          <th>Message</th>
                          <th>Category Name</th>
                          <th>Subject</th>
                          <th>Status</th>
                          <th>Reply</th>
                        </tr>
                      </thead>
                      <tbody>


                        {filteredTickets.map((ticket, i) => {
                          return (
                            <>
                              <tr>
                                {/* <td>{ticket}</td> */}
                                <td>{i + 1}</td>
                                <td>{ticket?.ticketID}</td>
                                <td dangerouslySetInnerHTML={{ __html: ticket?.message }}></td>
                                <td>{ticket?.categoryName}</td>
                                <td>{ticket?.subject}</td>
                                <td>{ticket?.statusName}</td>
                                <td> <button className="btn btn-outline-secondary"><svg className="icon align-middle me-1">
                                  <use xlinkHref="#add-plus"></use>
                                </svg> <span className="align-middle" onClick={e => {
                                  setTicketDetail(ticket);
                                  document.getElementsByClassName('modal')[0].style.display = 'block';
                                }}>Reply</span></button></td>


                              </tr>
                            </>
                          )
                        })
                        }
                        {/* <tr>
                          <td>1</td>
                          <td>254356</td>
                          <td>Sep 22, 2021, 11:39:17 AM</td>
                          <td></td>
                          <td><a href="#helperModal" data-bs-toggle="modal">Payment</a></td>
                          <td>BSC(H) Nursing</td>
                          <td>Open</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>254356</td>
                          <td>Sep 22, 2021, 11:39:17 AM</td>
                          <td></td>
                          <td><a href="#helperModal" data-bs-toggle="modal">Payment</a></td>
                          <td>BSC(H) Nursing</td>
                          <td>Open</td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                  {/* <div class="row my-3">
                    <div class="text-center">
                      <button class="btn btn-primary mx-auto" style={{ width: '15rem' }}>Submit</button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </main>




          <div class="modal" id="helperModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Helpdesk Query</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                </div>
                <div class="modal-body">
                  <div class="table-responsive ">
                    {/* <table class="table table-bordered table-accent">
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Ticket Date</th>
                          <th>Ticket Category</th>
                          <th>Subject</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Sep 22, 2021, 11:39:17 AM</td>
                          <td>Payment</td>
                          <td>BSC(H) Nursing</td>
                          <td>Open</td>
                        </tr>
                      </tbody>
                    </table> */}
                  </div>
                  <div class="table-responsive ">
                    {/* <table class="table table-bordered table-accent">
                      <thead>
                        <tr>
                          <th>Message</th>
                          <th>Ticket Date</th>
                          <th>Attachment</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Lorem ipsum dolor sit amet consectetur adipisicing, elit. Dolor, vel!</td>
                          <td>Sep 22, 2021, 11:39:17 AM</td>
                          <td></td>
                        </tr>
                        <tr class="table-danger">
                          <td>Lorem ipsum dolor vel!</td>
                          <td>Sep 22, 2021, 11:39:17 AM</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Dolor sit amet consectetur adipisicing !</td>
                          <td>Sep 22, 2021, 11:39:17 AM</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table> */}
                  </div>
                  <div class="card">
                    <div class="card-body bg-light">
                      <div class="row">
                        <div class="col-12">
                          <div class="form-wrapper">
                            <label>Message</label>
                            <textarea name="" onChange={e => setMsgReply(e.target.value)} placeholder="Please enter message" cols="30" rows="2"></textarea>
                          </div>
                        </div>
                        <div class="col-sm-8">
                          <div class="form-wrapper">
                            <label>Choose status</label>
                            <select name="" value={replyStatus} onChange={e => {
                              console.log("e", e.target.value);
                              setReplystatus(e.target.value);
                            }}>
                              <option value="1">Open</option>
                              <option value="2">Closed</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="my-3 text-center">
                            <button class="btn btn-primary w-100" onClick={submitReply}>Submit</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="table-responsive ">
                    {/* <table class="table table-bordered table-accent">
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>School Code</th>
                          <th>Ticket Description</th>
                          <th>Payment</th>

                          <th>Payment Status</th>
                          <th>Transaction Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Payment</td>
                          <td>Lorem ipsum, dolor sit amet</td>
                          <td>1000</td>

                          <td>Pending</td>
                          <td>Sep 22, 2021, 11:39:17 AM</td>
                        </tr>
                      </tbody>
                    </table> */}
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                  {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}
