import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import schoolimg from "../../assets/icons/school.png";
import "../../assets/css/style_new.css";
import { Colors } from "../../assets/css/color";
import jwt_decode from "jwt-decode";
import "./SchoolPayment.scss";
import Sidebar from "../main/sidebar";
import { API_ADMIN_URL_2, REGISTER_API, API_BASE_URL, API_END_POINTS, API_BASE_JAVA_URL } from "../../apis/api";
import { notify } from '../../Utills'
import { useNavigate } from "react-router";

import axios from "axios";
import { StudentDataContext } from "../context/datacontext";

export default function SchoolPayment() {

  let paymentData = {};
  let tMockStu = 0;
  let mockFee = 0;
  let totalThemeExamPay = 0;
  let currency = '';
  let decodedSchoolData = {};
  let mockTotal = 0;

  // let tFee = 0;
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState([]);
  const { state, dispatch } = useContext(StudentDataContext);
  const [tFee, setTFee] = useState(0);
  const [err, setErr] = useState("");





  useEffect(() => {

    const getPaymentData = async () => {

      const isPaymentAllowed = await axios.post(`${API_BASE_URL}${API_END_POINTS.ispaymentallowed}`, {
        schoolCode: state.school_code
      });




      console.log("isPaymentAllowed", isPaymentAllowed);


      if (isPaymentAllowed?.status === 200) {
        if (isPaymentAllowed.data.data.TotalStudent > 0) {
          // complete the slot allocation first

          if (isPaymentAllowed.data.data.PendingSlotCount === 0) {
            if (isPaymentAllowed.data.data.PendingPaymentCount > 0) {
              const paymentDetails = await axios.post(`${API_BASE_URL}${API_END_POINTS.getpaymentdetails}`, {
                school_code: state.school_code
              });
              // const paymentDetails = await axios.post(`${API_END_POINTS.getpaymentdetails}`, {
              //   school_code: state.school_code
              // }
              // );
              try {
                console.log("paymentDetails", paymentDetails);
                if (paymentDetails?.status === 200) {
                  let totalFees = 0;
                  console.log("paymentDetails", paymentDetails)
                  for (let i = 0; i < paymentDetails.data.data.length; i++) {
                    // if (paymentDetails.data.data[i]['ExamTheme'] === 'MOCK') {
                    totalFees += paymentDetails.data.data[i]?.Fee;
                    // }
                  }
                  setTFee(totalFees);

                  setPaymentStatus(paymentDetails.data.data);

                } else {
                  setPaymentStatus([]);
                  setErr("something wnet wrong");

                }
              } catch (e) {
                console.log("error")
              }
            } else {
              setErr(`Payment for all the students has been done`);
            }
          } else {
            setErr(`Slot allocation is pending for ${isPaymentAllowed.data.data.PendingSlotCount} students. `);
          }
        } else {
          setErr(`There are no students uploaded!!!`);
        }

      }



    }
    getPaymentData();

  }, []);



  try {
    // paymentData = JSON.parse(localStorage.getItem('payment') ?? '[]');
    console.log("paymentStatus", paymentStatus)
    for (let i = 0; i < paymentStatus.length; i++) {
      // if (paymentStatus[i]['ExamTheme'] === 'MOCK') {
      tFee += paymentStatus[i]?.Fee;
      // }
    }
    // mockFee = paymentStatus[0]?.mockfee;
    // tFee = paymentStatus.reduce((acc, t) => t.Fee + acc, 0);
    console.log("tFee", tFee);
    // totalThemeExamPay = paymentStatus.reduce((acc, el) => el.ExamTheme * el.StudentCount + acc, 0);
    // mockTotal = tMockStu * mockFee;

    console.log("total mocak", +tMockStu);

  } catch (e) {

  }

  try {
    // const userToken = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    // let token = userToken;
    // let decodedSchoolData = token !== "" ? jwt_decode(token) : {};

    let decodedSchoolData = { ...state };

    currency = decodedSchoolData.country === 'India' ? 'INR' : "$"
    console.log("decodedSchoolData", decodedSchoolData)
  } catch (e) {
    console.log('e', e)
  }
  // try {
  //   const userToken = localStorage.getItem("token") ? localStorage.getItem("token") : "";
  //   let token = userToken;
  //   decodedSchoolData = token !== "" ? jwt_decode(token) : {};

  // } catch (e) {

  // }










  const handlePayment = async (e) => {
    e.preventDefault();
    let SCHOOLID = decodedSchoolData?.school_code
    let paymentStatus = await axios.post(`${API_BASE_URL}${API_END_POINTS.updatePaymentStatus}`, { SchoolID: decodedSchoolData?.school_code });
    //let paymentStatus = await axios.post(`${API_END_POINTS.updatePaymentStatus}`, { SchoolID: decodedSchoolData?.school_code });
    if (paymentStatus && paymentStatus.data.status) {
      notify(`Studant payment status changed!.`, true)
      // navigate("/school-slot");
    } else {
      notify(`payment updation Failed!.`, false)

    }
  }


  const makePayment = async () => {
    let obj = {
      type: 'SCHOOL',
      // amount: totalThemeExamPay + tMockStu * mockFee,
      amount: tFee,
      idval: state.school_code,
      email: state.email, phone: "", name: state.schoolname, productinfo: state.school_code
    };

    if (state?.country === 'India') {
      obj.phone = state.mobile;
    } else {
      obj.phone = '9818542645';
    }

    const payment = await axios.post(`${API_BASE_URL}${API_END_POINTS.payment}`, obj);
    //const payment = await axios.get(`${API_END_POINTS.payment}`);

    if (payment?.data?.status === 200) {
      // navigate("/school-slot");
      // console.log("payment", payment);
      window.open(payment.data.url, "_blank");
      let paymentinsertrecordsObj = {
        schoolcode_Rollno: state?.school_code, mode: "ONLINE",
        subscriberType: "SCHOOL", paymentId: "", paymentReceivedStatus: "pending", createdBy: state?.school_code,
        modifyBy: state?.school_code,
        ...payment.data.data
      };

      const paymentinsertrecords = await axios.post(`${API_BASE_JAVA_URL}${API_END_POINTS.insertPaymentDetails}`, paymentinsertrecordsObj);

      console.log("paymentinsertrecords", paymentinsertrecords);


    } else {
      setErr(payment?.data?.data?.data);
    }

  }
  return (
    <div className="row ">
      <div className="col-lg-3">
        <Sidebar />
      </div>

      <div className="col-lg-9 ">
        <div className={`make-payment p-5 ${err.length > 0 ? 'hidepayment' : 'showpayment'}`}>
          <div class="section-title mb-4 text-muted">
            <h6 class="font-bold ">Submit registration fee</h6>
            {/* <p>Pay after click make payment button</p> */}
          </div>
          <div className="shadow-lg p-4 bg-body rounded">
            <div className="table-bordered">
              <table className="table">
                <tbody className="blank-tbody">
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
                <tbody>

                  {
                    paymentStatus?.map((theme, i) => {
                      return (
                        <>
                          <tr>
                            <td>Total candidate who opted <b>{theme?.ExamTheme}</b></td>
                            <td>{theme?.StudentCount}</td>
                          </tr>
                          <tr>
                            <td>Amount</td>
                            <td>{currency}{theme?.Fee}</td>
                          </tr>
                          <tbody className="blank-tbody">
                            <tr>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                            </tr>
                          </tbody>
                        </>
                      )
                    })
                  }
                </tbody>
                <tbody className="blank-tbody">
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>

                {/* <tbody>
                  <tr>
                    <td>Total candidate who opted <b>Mock</b></td>
                    <td>{tMockStu}</td>
                  </tr>
                  <tr>
                    <td>Amount</td>
                    <td>{mockTotal}</td>
                  </tr>
                </tbody> */}
                <tfoot>
                  <tr>
                    <td>Total Amount</td>
                    <td>{currency} {tFee}.</td>
                  </tr>
                </tfoot>


              </table>
              <div>
                <h3 style={{ textAlign: 'center', color: 'red' }}>{err}</h3>
              </div>
            </div>

            {/* Variants Use contextual classe
         {
            paymentData.map(theme =>(<>
              <h6>Total Candidate who opted {theme?.theme } : {theme?.totalCount}</h6>
              <h6>Fee per candidate: {currency}{theme?.themefee}</h6>
              <h6>Total amount: {currency}{theme?.themefee*theme?.totalCount}</h6>
        
            </>))
          }
           <h4>Gross Total={currency}{ totalThemeExamPay +(tMockStu * mockFee) }</h4>
          <div>
           
          </div>
          <h4>
            Gross Total={currency}
            {totalThemeExamPay + tMockStu * mockFee}
          </h4> */}
          </div>
          <div className="btnmain">
            {state?.mode === 'ONLINE' && (
              <a> <button className="btn btn-primary" onClick={makePayment}>
                Save & Proceed
              </button></a>
            )}



          </div>
        </div>

        <div className="paymentErr">
          <h2 style={{ textAlign: 'center', color: 'red' }}>{err}</h2>
        </div>
      </div>
    </div>

  );
}
