import React from "react";
import { Link } from "react-router-dom";
import schoolimg from "../../assets/icons/school.png";
import "../../assets/css/style_new.css";
import { Colors } from "../../assets/css/color";
import jwt_decode from "jwt-decode";

export default function SchoolPayment() {
  let paymentData = {};
  let tMockStu = 0;
  let mockFee = 0;
  let totalThemeExamPay = 0;
  let currency = '';
  try {
    const userToken = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    let token = userToken;
    let decodedSchoolData = token !== "" ? jwt_decode(token) : {};
    currency = decodedSchoolData.country === 'India' ? 'INR' : "$"

  } catch (e) {
    console.log('e', e)
  }
  try {
    paymentData = JSON.parse(localStorage.getItem('payment') ?? '[]');
    mockFee = paymentData[0]?.mockfee;
    tMockStu = paymentData.reduce((acc, t) => t.optMock + acc, 0);
    totalThemeExamPay = paymentData.reduce((acc, el) => el.themefee * el.totalCount + acc, 0)

    console.log("total mocak", +tMockStu)
  } catch (e) {

  }
  return (
    <div className="container-home">
      <div className="card">
        <div className="card-body">
          <h6 class="card-title">
            <span>
              <img class="card-img-top" src={schoolimg} alt="Card image" />
            </span>
            SCHOOL DESK
          </h6>
          <ul class="sidebar">
            <Link to="">
              <p class="side-text">SCHOOL DETAILS</p>
            </Link>
            <br />
            <Link to="">
              <p
                class="side-text"
              >
                UPLOAD STUDENTS DATA
              </p>
            </Link>
            <br />
            <Link to="">
              <p class="side-text"
                style={{ backgroundColor: Colors.MAINCOLOR, color: "#fff" }}
              >MAKE PAYMENT</p>
            </Link>
            <br />
            <Link to="">
              <p class="side-text">SELECT SLOT DETAILS</p>
            </Link>
            <br />
            <Link to="">
              <p class="side-text">APPLICATION STATUS</p>
            </Link>
            <br />
            <Link to="/school-helpdesk-ticket">
              <p class="side-text">SUBMIT HELPDESK TICKET</p>
            </Link>
            <br />
            <Link to="/school-view-helpdesk-ticket">
              <p class="side-text">VIEW HELPDESK TICKET</p>
            </Link>
            <br />
            <Link to="/school-certificate">
              <p class="side-text">DOWNLOAD CERTIFICATE</p>
            </Link>
            <br />
            <Link to="/school-change-password" >
              <p class="side-text">CHANGE PASSWORD</p>
            </Link>
            <br />
            <Link to="/">
              <p class="side-text">LOGOUT</p>
            </Link>
            <br />
          </ul>
        </div>
      </div>

      <div className="main-head">
        <div className="main">
          <marquee> Welcome to Green Olympiad</marquee>
        </div>

        <div class="paymeny-service">
          <div>
            {
              paymentData.map(theme => (<>
                <h6>Total Candidate who opted {theme?.theme} : {theme?.totalCount}</h6>
                <h6>Fee per candidate: {currency}{theme?.themefee}</h6>
                <h6>Total amount: {currency}{theme?.themefee * theme?.totalCount}</h6>

              </>))
            }
            <div>
              <h6> Total mock opt studants are:{tMockStu}</h6>
              <h6> Mock fee per studants :{currency}{mockFee}</h6>
              <h6> Total mock fee = {currency}{tMockStu * mockFee}</h6>
            </div>

          </div>
          <h4>Gross Total={currency}{totalThemeExamPay + (tMockStu * mockFee)}</h4>
          <div class="btnmain">
            <Link to="/school-slot">
              <button className="main-btn" type="submit">
                Make Payment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
