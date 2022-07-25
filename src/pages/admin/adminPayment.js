import React, { useEffect, useState } from 'react'
import { API_BASE_URL, API_END_POINTS } from '../../apis/api';
import AdminSidebar from '../main/adminSidebar'
import axios from "axios";

function AdminPayment() {

    const [paymentData, setPaymentData] = useState([]);


    useEffect(() => {


        const getPaymentData = async () => {

            const isPaymentAllowed = await axios.get(`${API_BASE_URL}${API_END_POINTS.paymentTrackerHelpDesk}`);
            if (isPaymentAllowed?.status === 200) {
                console.log("isPaymentAllowed", isPaymentAllowed);
                setPaymentData(isPaymentAllowed.data.data);
            }

        };

        getPaymentData();


    }, []);



    return (

        <div className="container-fluid">
            <div className="row ">
                <div className="col-lg-3">
                    {/* side bar will come here */}
                    <AdminSidebar />
                </div>
                <div className="col-lg-9 ">
                    <main className="content ">
                        <div className="container-fluid ps-md-4 ps-lg-5 pe-md-4 py-5">
                            <div className="section-title mb-4 text-muted">
                                <h6 className="font-bold ">Payment Related Information</h6>
                                {/* <p>Schools have an option to upload students information by downloadable excel sheet OR through a form</p> */}
                            </div>
                        </div>

                        <div className="shadow bg-white p-3 rounded-16">
                            <div className="table-responsive ">
                                <table className="table table-bordered table-accent">
                                    <thead>
                                        <tr>
                                            <th>Mode</th>
                                            <th>Total No Of School</th>
                                            <th>Total No Of Candidate</th>
                                            <th>No of Candidate (Payment Received)</th>
                                            <th>No of Candidate (Payment Pending)</th>
                                            <th>Total Amount (Payment Received)</th>
                                            <th>Total Amount (Payment Pending)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            paymentData.map((row, i) => {
                                                console.log("row", row);
                                                return (
                                                    <tr>
                                                        <td>{row.Mode}</td>
                                                        <td>{row.TotalNoOfSchools === null ? 0 : row.TotalNoOfSchools}</td>
                                                        <td>{row.TotalNoOfCandidates}</td>
                                                        <td>{row.NoOfCandidatePaymentReceived}</td>
                                                        <td>{row.NoOfCandidatePaymentPending}</td>
                                                        <td>{row.TotalAmountPaymentReceived}</td>
                                                        <td>{row.TotalAmountPaymentPending}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default AdminPayment