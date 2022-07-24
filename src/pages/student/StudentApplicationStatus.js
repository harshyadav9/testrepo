import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import studentimg from "../../assets/icons/login.png";
import { Colors } from "../../assets/css/color";
import SidebarStudent from "../main/sidebarStudent";
import axios from "axios";
import { API_BASE_URL, API_END_POINTS } from "../../apis/api";
import { StudentDataContext } from "../context/datacontext";

export default function StudentApplicationStatus() {


  const { state, dispatch } = useContext(StudentDataContext);
  const [appStatus, setAppStatus] = useState([]);

  const getAppStatus = async () => {
    const appStatus = await axios.post(`${API_BASE_URL}${API_END_POINTS.applicationIndStatus}`, {
      roll_no: state.roll_no
    });

    if (appStatus?.status && appStatus?.data) {
      setAppStatus(appStatus?.data.data);
    }
    console.log("appStatus", appStatus);



  }

  useEffect(() => {
    getAppStatus();
  }, [])


  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-lg-3">
          {/* side bar will come here */}
          <SidebarStudent />

        </div>
        <div className="col-lg-9 ">
          <div className="application-status p-5">
            <div className="page-heading">
              <h4>Application Status</h4>
              {/* <p>Check Payment details</p> */}
            </div>
            <div className="shadow-lg p-4 bg-body rounded">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>DOB</th>
                    <th>Class</th>
                    <th>Section</th>
                    {/* <th>Level</th> */}
                    <th>Exam</th>
                    <th>ExamSlot</th>
                    <th>Mock Test</th>
                    <th>MockSlot</th>

                    <th>Roll no.</th>
                    <th>Fees</th>
                    <th>Fees Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    appStatus.map((status, i) => {
                      console.log("status", status);
                      return (
                        <tr>
                          <td>{status.Name}</td>
                          <td>{status.DOB}</td>
                          <td>{status.Class}</td>
                          <td>{status.Section}</td>
                          <td>{status.ExamTheme}</td>
                          <td>{status.ExamSlotDateTime}</td>
                          <td>{status.DemoExam}</td>
                          <td>{status.DemoSlotDateTime}</td>

                          <td>{status.Rollno === 0 ? "" : status.Rollno}</td>
                          <td>{state?.student.country === 'India' ? 'INR' : '$'} {status.Fee}</td>
                          {/* <td>{status.Fee}</td> */}
                          <td className={status.PaymentStatus === 1 ? 'paid' : 'unpaid'}>{status.PaymentStatus === 1 ? 'PAID' : 'UNPAID'}</td>
                        </tr>
                      )
                    })
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
