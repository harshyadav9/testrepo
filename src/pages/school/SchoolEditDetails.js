import React from "react";
import { Link } from "react-router-dom";
import schoolimg from "../../assets/icons/school.png";
import { Colors } from "../../assets/css/color";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, API_END_POINTS } from "../../apis/api";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";


export default function SchoolEditDetails() {

  const userToken = localStorage.getItem("token") ? localStorage.getItem("token") : "";
  let token = userToken;
  let decoded = token !== "" ? jwt_decode(token) : {};
  console.log('userToken', decoded)
  const navigate = useNavigate();
  const [postalAddress, setpostalAddress] = useState("");
  const [district, setdistrict] = useState("");
  const [phoneStd, setphoneStd] = useState("");

  const [coordinatingTeacher, setcoordinatingTeacher] = useState("");

  const RegisterationApi = () => {
    // console.log("editschool", `${API_ADMIN_URL_2}${EDIT_SCHOOL_API}`);
    const editschooloption = {
      postaladdress: postalAddress,
      district: district,
      coordinatingteacher: coordinatingTeacher,
      phoneStd: phoneStd,
      code: decoded?.schoolsCode
    };
    axios
      // .post(`${API_BASE_URL}${API_END_POINTS?.updateShoolData}`, editschooloption)
      .post(`${API_END_POINTS?.updateShoolData}`, editschooloption)
      .then((res) => {
        console.log("hhhhhhh", res.data);
        if (res.data) {
          alert("data updated");
          navigate("/school-upload-data");
        } else {
          alert("something is rong");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
              <p
                class="side-text"
                style={{ backgroundColor: Colors.MAINCOLOR, color: "#fff" }}
              >
                SCHOOL DETAILS
              </p>
            </Link>
            <br />
            <Link to="">
              <p class="side-text">UPLOAD STUDENTS DATA</p>
            </Link>
            <br />
            <Link to="">
              <p class="side-text">MAKE PAYMENT</p>
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
            <Link to="/school-change-password">
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

        <div className="form-card-second">
          <div className="imgcontainer">
            <h2>Edit School Details</h2>
          </div>

          <div class="">
            <label className="form-label">School Name:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder={decoded?.schoolname}
              name="uname"
              required
            />
            <br />

            <label className="form-label">Postal Address:</label>

            <input
              type="text"
              placeholder={decoded?.PostalAddress}
              name="phone"
              required
              onChange={(postalAddress) =>
                setpostalAddress(postalAddress.target.value)
              }
            />
            <br />

            <label className="form-label">District:</label>
            <input
              type="text"
              placeholder={decoded?.district}
              name="phone"
              required
              onChange={(district) => setdistrict(district.target.value)}
            />
            <br />
            <label className="form-label">State:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder={decoded?.state}
              name="uname"
              required
            />
            <br />
            <label className="form-label">Pin Code:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder={decoded?.pincode}
              name="uname"
              required
            />
            <br />
            <label className="form-label">Country:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder={decoded?.country}
              name="uname"
              required
            />
            <br />
            <label className="form-label">Phone No. with STD code :</label>
            <input
              type="text"
              placeholder={decoded?.PhoneStd}
              name="phone"
              required
              onChange={(phoneStd) => setphoneStd(phoneStd.target.value)}
            />
            <br />
            <label className="form-label">Mobile:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder={decoded?.mobile}
              name="uname"
              required
            />
            <br />
            <label className="form-label">E-mail Id (School/Principal):</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder={decoded?.email}
              name="uname"
              required
            />
            <br />
            <label className="form-label">Name of the Principal:</label>
            <input
              type="text"
              style={{ backgroundColor: "#dfdbdb" }}
              disabled
              placeholder={decoded?.principalname}
              name="uname"
              required
            />
            <br />
            <label className="form-label">
              Name of the Coordinating Teacher:
            </label>
            <input
              type="text"
              placeholder={decoded?.coordinating_teacher}
              name="uname"
              required
              onChange={(coordinatingTeacher) =>
                setcoordinatingTeacher(coordinatingTeacher.target.value)
              }
            />
            <br />

            <div class="d-flex justify-content-end btnmain">
              <button
                className="main-btn"
                type="submit"
                onClick={RegisterationApi}
              >
                Save & Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
