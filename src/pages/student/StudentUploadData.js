import React from "react";
import { Link } from "react-router-dom";
import schoolimg from "../../assets/icons/school.png";
import { Colors } from "../../assets/css/color";

export default function StudentUploadData() {
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
              >
                SCHOOL DETAILS
              </p>
            </Link>
            <br />
            <Link to="">
              <p class="side-text"
                style={{ backgroundColor: Colors.MAINCOLOR, color: "#fff" }}
              >UPLOAD STUDENTS DATA</p>
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
            <Link to="/student-helpdesk-ticket">
              <p class="side-text">SUBMIT HELPDESK TICKET</p>
            </Link>
            <br />
            <Link to="/student-view-helpdesk-ticket">
              <p class="side-text">VIEW HELPDESK TICKET</p>
            </Link>
            <br />
            <Link to="/student-certificate">
              <p class="side-text">DOWNLOAD CERTIFICATE</p>
            </Link>
            <br />
            <Link to="" data-toggle="modal" data-target="#myModal">
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

        <div style={{ marginLeft: 15 }}>
          <div className="imgcontainer">
            <h5>
              If You have Excel data upload from Upload Student Data Otherwise
              Add <br /> data From Add Student Data
            </h5>
          </div>
          <div>
            <div class="form-card-second">
              <div class="">
                <h2>Upload Students Data</h2>
              </div>
              <div class="">
                <p class="upload-text">Upload Student Data from Excel</p>

                <input
                  class="upload"
                  type="file"
                  placeholder="Name"
                  name="uname"
                  required
                />

                <div class="d-flex justify-content-center btnmain">
                  <Link to="/student-payment">
                    <button className="main-btn" type="submit">
                      Save Student Data
                    </button>
                  </Link>
                  <button className="main-btn" type="submit">
                    Download Excel Format
                  </button>
                </div>
              </div>
            </div>
            <div class="form-card-second" style={{ marginTop: 20 }}>
              <div class="imgcontainer">
                <h2>Add Students Data</h2>
              </div>
              <div class="">
                <p class="upload-text">Add Student Data from Add Button</p>

                <div class="d-flex justify-content-center btnmain">
                  <a>
                    <button className="main-btn" type="submit">
                      Add data
                    </button>
                  </a>
                </div>
                <div>
                  <table className="add-school-data">
                    <tr>
                      <th>Name</th>
                      <th>E-Mail</th>
                      <th>Mobile</th>
                      <th>Roll no.</th>
                      <th>Action</th>
                    </tr>
                    <tr>
                      <td>Priya</td>
                      <td>priya23@gmail.com</td>
                      <td>8899776655</td>
                      <td>1008783</td>
                      <td style={{ display: "flew", flexDirection: "row" }}>
                        <button className="icon-btn">
                          <i className="fa fa-pencil-square"></i>
                        </button>
                        <button className="icon-btn">
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
