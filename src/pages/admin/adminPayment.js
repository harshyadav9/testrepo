import React, { useEffect, useState } from 'react'
import { API_BASE_URL, API_END_POINTS } from '../../apis/api';
import AdminSidebar from '../main/adminSidebar'
import axios from "axios";

function AdminPayment() {

    const [paymentData, setPaymentData] = useState([]);
    const [tSchool, seTSchool] = useState(0);
    const [tCandidate, seTCandidate] = useState(0);
    const [tNOPayRecieved, setTNOPayRecieved] = useState(0);
    const [tNOPayPending, setTNOPayPending] = useState(0);
    const [tAmountReceived, setTAmountReceived] = useState(0);
    const [tAmountPending, setTAmountPending] = useState(0);
    useEffect(() => {

        //totalThemeExamPay = paymentStatus.reduce((acc, el) => el.ExamTheme * el.StudentCount + acc, 0);
        const getPaymentData = async () => {

            const isPaymentAllowed = await axios.get(`${API_BASE_URL}${API_END_POINTS.paymentTrackerHelpDesk}`);
            if (isPaymentAllowed?.status === 200) {
                console.log("isPaymentAllowed", isPaymentAllowed);
                setPaymentData(isPaymentAllowed.data.data);

                seTSchool(isPaymentAllowed.data.data.reduce((acc, el) => el.TotalNoOfSchools + acc, 0));
                seTCandidate(isPaymentAllowed.data.data.reduce((acc, el) => el.TotalNoOfCandidates + acc, 0));
                setTNOPayRecieved(isPaymentAllowed.data.data.reduce((acc, el) => el.NoOfCandidatePaymentReceived + acc, 0));
                setTNOPayPending(isPaymentAllowed.data.data.reduce((acc, el) => el.NoOfCandidatePaymentPending + acc, 0));
                setTAmountReceived(isPaymentAllowed.data.data.reduce((acc, el) => el.TotalAmountPaymentReceived + acc, 0));
                setTAmountPending(isPaymentAllowed.data.data.reduce((acc, el) => el.TotalAmountPaymentPending + acc, 0));
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
                                                return (
                                                    <>                                                    <tr>
                                                        <td>{row.Mode}({row.CountryCode})</td>
                                                        <td>{row.TotalNoOfSchools === null ? 0 : row.TotalNoOfSchools}</td>
                                                        <td>{row.TotalNoOfCandidates}</td>
                                                        <td>{row.NoOfCandidatePaymentReceived}</td>
                                                        <td>{row.NoOfCandidatePaymentPending}</td>
                                                        <td>{row.TotalAmountPaymentReceived}</td>
                                                        <td>{row.TotalAmountPaymentPending}</td>
                                                    </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        {(
                                            <tr>
                                                <td><b>Total</b></td>
                                                <td><b>{tSchool}</b></td>
                                                <td><b>{tCandidate}</b></td>
                                                <td><b>{tNOPayRecieved}</b></td>
                                                <td><b>{tNOPayPending}</b></td>
                                                <td><b>{tAmountReceived}</b></td>
                                                <td><b>{tAmountPending}</b></td>
                                            </tr>
                                        )}
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