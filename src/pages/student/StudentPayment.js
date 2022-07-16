import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import studentimg from "../../assets/icons/login.png";
import { Colors } from "../../assets/css/color";
import { useNavigate } from "react-router";
import SidebarStudent from "../main/sidebarStudent";
import axios from "axios";
import { API_BASE_JAVA_URL, API_BASE_URL, API_END_POINTS } from "../../apis/api";
import { StudentDataContext } from "../context/datacontext";

export default function StudentPayment() {

  useEffect(() => {
    getPaymentDetails();
  }, []);
  const [err, setErr] = useState("");
  const { state, dispatch } = useContext(StudentDataContext);
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({});
  const [currencyIcon, setCurrencyIcon] = useState();
  const [paymentstatus, setpaymentStatus] = useState("");
  const [paymentAllowedMsg, setPaymentAllowedMsg] = useState("");
  const makePayment = async () => {

    const payment = await axios.post(`${API_BASE_URL}${API_END_POINTS.payment}`, {
      amount: paymentData?.totalFees,
      type: 'INDV',
      email: state?.student.email, phone: state?.student.mobile, name: state?.student.name, productinfo: state.roll_no
    });
    //const payment = await axios.get(`${API_END_POINTS.payment}`);

    if (payment?.data?.status === 200) {
      // navigate("/school-slot");
      // console.log("payment", payment);
      navigate("/student-application-status");
      // student-application-status
      window.open(payment.data.url, "_blank");
      let paymentinsertrecordsObj = {
        schoolcode_Rollno: state?.roll_no, mode: "ONLINE",
        subscriberType: "INDV", paymentId: "", paymentReceivedStatus: "pending", createdBy: state.roll_no,
        modifyBy: state.roll_no,
        ...payment.data.data
      };


      console.log("paymentinsertrecordsObj", paymentinsertrecordsObj);

      const paymentinsertrecords = await axios.post(`${API_BASE_JAVA_URL}${API_END_POINTS.insertPaymentDetails}`, paymentinsertrecordsObj);

      console.log("paymentinsertrecords", paymentinsertrecords);


    } else {
      setErr(payment?.data?.data?.data);
    }

  }



  const getPaymentDetails = async () => {

    const getpayment = await axios.get(`${API_BASE_JAVA_URL}${API_END_POINTS.getPaymentDetailsForIndividualStudent}`, {
      params: {
        rollNumber: state.roll_no
      }
    });

    if (getpayment?.status === 200) {
      let currencyval = state?.student?.country === 'India' ? 'INR' : "$";
      setCurrencyIcon(currencyval);
      setPaymentData(getpayment.data);

      if (getpayment.data.examTheme === "" && getpayment.data.demoExam === "") {
        setPaymentAllowedMsg("Kindly choose your examtheme or demo exam  first before doing payment");
        setpaymentStatus('paid');
        return;
      }
      if (getpayment.data.paymentStatus === 0) {
        setpaymentStatus('unpaid');
      } else {
        setpaymentStatus('paid');
      }
    }

    console.log("getpayment", getpayment);

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


            <div class="section-title mb-4 text-muted">
              <h6 class="font-bold ">Make Payment</h6>
              <p>Pay after click make payment button</p>
            </div>

            <div class="shadow bg-white rounded-16">
              <div class="p-4 ">
                <div class="row">
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Roll No</label>
                      <input type="text" placeholder="" value={paymentData?.rollNo} disabled name="city" required="" />
                    </div>
                  </div>


                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Name Of Candidate</label>
                      <input type="text" placeholder="" value={paymentData?.name} disabled name="city" required="" />
                    </div>
                  </div>

                </div>

                <div class="row">
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Level Of Exam</label>
                      <input type="text" placeholder="" value={paymentData?.examLevel} disabled name="city" required="" />
                    </div>
                  </div>

                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Topic of exam</label>
                      <input type="text" placeholder="" value={paymentData?.examTheme} disabled name="city" required="" />
                    </div>
                  </div>
                </div>



                <div class="row">
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Demo of exam status</label>
                      <input type="text" placeholder="" value={paymentData?.demoExam} disabled name="city" required="" />
                    </div>
                  </div>

                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Total fees to be paid</label>
                      <input type="text" placeholder="" value={`${currencyIcon} ${paymentData?.totalFees}`} disabled name="city" required="" />
                    </div>
                  </div>
                </div>
                <div className="row my-3">
                  <div className="text-center">

                    <button class={`btn btn-primary mx-auto ${paymentstatus === 'paid' ? 'paidcls' : 'unpaidcls'}`} onClick={makePayment}>Make Payment</button>
                    {/* <button className={({ 'paidcls': paymentstatus === 'paid', 'unpaidcls': paymentstatus !== 'paid', 'btn': true, 'btn-primary': true, 'mx-auto': true })} onClick={makePayment}>Make Payment</button> */}
                  </div>
                  <div>
                    <h2>{paymentAllowedMsg}</h2>
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
