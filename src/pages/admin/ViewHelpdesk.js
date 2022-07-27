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
import Sidebar from "../main/sidebar";
import AdminSidebar from "../main/adminSidebar";
const dayjs = require('dayjs');

export default function HelpDeskViewHelpdeskTicket() {
    let i = 0;
    let decodedSchoolData = {};

    const { state, dispatch } = useContext(StudentDataContext);
    let [tickets, setTickets] = useState([]);
    let [filteredTickets, setFilteredTickets] = useState([]);
    let [savedCopy, setSavedCopy] = useState([]);
    let [replyStatus, setReplystatus] = useState(1);
    let [messageReply, setMsgReply] = useState("");
    let [radioVal, setRadioVal] = useState("All");
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
        setMsgReply("");
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
        const getAllTickets = await axios.get(`${API_BASE_JAVA_URL}${API_END_POINTS.getHelpdeskTicketDetailsForAdmin}`, {
            params: {
                school_roll_id: state.school_code
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
                    <AdminSidebar />

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
                                                <input class="form-check-input" type="radio" checked={radioVal === 'All'} value={radioVal} name="query" onChange={e => {

                                                    setRadioVal('All');
                                                    filterData('All');
                                                }}
                                                />All
                                            </label>
                                        </div>

                                        <div class="form-check form-check-inline">
                                            <label class="form-check-label">

                                                <input class="form-check-input" type="radio" checked={radioVal === 'Open'} value={radioVal} name="query" onChange={e => {
                                                    setRadioVal('Open');
                                                    filterData('Open');
                                                }}
                                                />
                                                Open</label>
                                        </div>


                                        <div class="form-check form-check-inline">
                                            <label class="form-check-label">
                                                <input class="form-check-input" type="radio" checked={radioVal === 'Closed'} value={radioVal} name="query" onChange={e => {
                                                    setRadioVal('Closed');
                                                    filterData('Closed');
                                                }}
                                                />
                                                Closed</label>
                                        </div>


                                    </div>
                                    <div class="table-responsive ">
                                        <table style={{
                                            borderCollapse: 'separate',
                                            borderSpacing: '8px'
                                        }} class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>S.No.</th>
                                                    <th>Created By</th>
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
                                                                <td style={{ padding: '18px' }}>{ticket?.createdBy}</td>
                                                                <td>{ticket?.ticketID}</td>
                                                                <td style={{
                                                                    border: '2px solid grey',
                                                                    borderRadius: '#212529',
                                                                }}>
                                                                    <div style={{ width: '32em' }} dangerouslySetInnerHTML={{ __html: ticket?.message }}>

                                                                    </div>
                                                                </td>
                                                                <td></td>
                                                                <td>{ticket?.categoryName}</td>
                                                                <td>{ticket?.subject}</td>
                                                                <td>{ticket?.statusName}</td>
                                                                <td> <button className="btn btn-outline-secondary" onClick={e => {
                                                                    setTicketDetail(ticket);
                                                                    document.getElementsByClassName('modal')[0].style.display = 'block';
                                                                }}>Reply</button></td>


                                                            </tr>
                                                        </>
                                                    )
                                                })
                                                }

                                            </tbody>
                                        </table>
                                    </div>

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

                                    </div>
                                    <div class="table-responsive ">

                                    </div>
                                    <div class="card">
                                        <div class="card-body bg-light">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="form-wrapper">
                                                        <label>Message</label>
                                                        <textarea name="" value={messageReply} onChange={e => setMsgReply(e.target.value)} placeholder="Please enter message" cols="30" rows="2"></textarea>
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

                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
