import React from "react";
import { Link } from "react-router-dom";
import schoolimg from "../../assets/icons/school.png";
import "../../assets/css/style_new.css";
import { Colors } from "../../assets/css/color";
import jwt_decode from "jwt-decode";
import "./SchoolPayment.scss";
import Sidebar from "../main/sidebar";

export default function SchoolPayment() {
  let paymentData = {};
  let tMockStu = 0;
  let mockFee = 0;
  let totalThemeExamPay = 0;
  let currency = "";
  try {
    const userToken = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    let token = userToken;
    let decodedSchoolData = token !== "" ? jwt_decode(token) : {};
    console.log("decodedSchoolData", decodedSchoolData)
    currency = decodedSchoolData.country === "India" ? "INR" : "$";
  } catch (e) {
    console.log("e", e);
  }
  try {
    paymentData = JSON.parse(localStorage.getItem("payment") ?? "[]");
    mockFee = paymentData[0]?.mockfee;
    tMockStu = paymentData.reduce((acc, t) => t.optMock + acc, 0);
    totalThemeExamPay = paymentData.reduce(
      (acc, el) => el.themefee * el.totalCount + acc,
      0
    );

    console.log("total mocak", +tMockStu);
  } catch (e) { }
  return (
    <div className="row ">
      <div className="col-lg-3">
        <Sidebar />
      </div>

      <div className="col-lg-9 ">
        <div className="make-payment p-5">
          <div className="page-heading">
            <h4>Make Payment</h4>
            <p>Check Payment details</p>
          </div>
          <div className="shadow-lg p-4 bg-body rounded">
            <div className="table-bordered">
              <table class="table">
                <tbody>
                  <tr>
                    <td>Total candidate who opted Theme 1 </td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>Fees of per condidate for Theme 1</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>Amount</td>
                    <td>$ 5000</td>
                  </tr>
                </tbody>
                {/* BLACK SPACE ROW */}
                <tbody className="blank-tbody">
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>

                <tbody>
                  <tr>
                    <td>Total candidate who opted Theme 1 </td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>Fees of per condidate for Theme 1</td>
                    <td>100</td>
                  </tr>
                  <tr>
                    <td>Amount</td>
                    <td>$ 5000</td>
                  </tr>
                </tbody>

                {/* BLACK SPACE ROW */}
                <tbody className="blank-tbody">
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>Total Amount</td>
                    <td>$ 17460.</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Variants Use contextual classe
          {paymentData.map((theme) => (
            <>
              <h6>
                Total Candidate who opted {theme?.theme} : {theme?.totalCount}
              </h6>
              <h6>
                Fee per candidate: {currency}
                {theme?.themefee}
              </h6>
              <h6>
                Total amount: {currency}
                {theme?.themefee * theme?.totalCount}
              </h6>
            </>
          ))}
          <div>
            <h6> Total mock opt studants are:{tMockStu}</h6>
            <h6>
              {" "}
              Mock fee per studants :{currency}
              {mockFee}
            </h6>
            <h6>
              {" "}
              Total mock fee = {currency}
              {tMockStu * mockFee}
            </h6>
          </div>
          <h4>
            Gross Total={currency}
            {totalThemeExamPay + tMockStu * mockFee}
          </h4> */}
          </div>
          <div class="btnmain">
            <Link to="/school-slot">
              <button className="btn btn-primary" type="submit">
                Make Payment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
}
