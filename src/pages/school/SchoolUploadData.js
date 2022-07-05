import React from "react";
import { Link } from "react-router-dom";
import schoolimg from "../../assets/icons/school.png";
import { Colors } from "../../assets/css/color";
import { API_BASE_URL, API_END_POINTS } from "../../apis/api";
import { ExcelDateToJSDate, notify, checkRowDuplicacy } from '../../Utills'
import { useEffect, useState } from "react";
import axios from "axios";

const MINIMUMROW = 4;
const XLSX = require("xlsx");
const dayjs = require('dayjs')

function processExcel(data) {
  var workbook = XLSX.read(data, {
    type: 'binary'
  });

  var firstSheet = workbook.SheetNames[0];
  var data = to_json(workbook);
  return data
};

function to_json(workbook) {
  var result = {};
  workbook.SheetNames.forEach(function (sheetName) {
    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1
    });
    if (roa.length) result[sheetName] = roa;
  });
  return JSON.stringify(result, 2, 2);
};



export default function SchoolUploadData() {
  const [file, setFile] = useState(null);
  const [studantData, setStudanntData] = useState([])
  const UPLOAD_ENDPOINT = API_END_POINTS.uploadStudantdata

  const submitStudantData = async e => {
    e.preventDefault();
    if (studantData.length <= MINIMUMROW) {
      notify(`Studant record minmum of ${MINIMUMROW} rows`, false)
      return
    }
    //if await is removed, console log will be called before the uploadFile() is executed completely.
    //since the await is added, this will pause here then console log will be called
    let res = await uploadFile(file);
    if (res.data) {
      setStudanntData([])
      notify(`studant data uploaded.`, true)
    } else {
      notify(`please try again!.`, false)
    }
  };

  const uploadFile = async file => {
    const formData = new FormData();
    formData.append("studant", file);

    // return await axios.post(`${API_BASE_URL}${UPLOAD_ENDPOINT}`, formData, {
    return await axios.post(`${UPLOAD_ENDPOINT}`, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  };
  // Name  DOB  Class   Section ExamTheme MockTest

  const handleOnChange = e => {
    // console.log(e.target.files[0],'file name');
    let correctData = []
    const f = e.target.files[0];
    if (f) {
      var r = new FileReader();
      r.onload = e => {
        var contents = processExcel(e.target.result);
        try {
          let d = JSON.parse(contents)?.Sheet1;
          d.shift();
          correctData = d.map((exData, i) => [...exData.slice(0, 5), dayjs(ExcelDateToJSDate(exData[5])).format('YYYY-MM-DD'), ...exData.slice(6, 15)]);

          if (correctData.length <= MINIMUMROW) {
            notify(`this file must contain minimum ${MINIMUMROW} rows.`, false)
            return
          }
          let duplicateRows = checkRowDuplicacy(correctData);
          if (duplicateRows.length > 0) {
            notify(`${duplicateRows.join()}`, false)

          }
          console.log('duplicateRows', duplicateRows);
          setStudanntData(correctData)

        } catch (e) {
          notify(`file could not uploaded, please try again!.`, false)
        }
      }
      r.readAsBinaryString(f);
    } else {
      notify('Failed to load file!', false);
    }
    setFile(e.target.files[0]);
  };
  console.log("studantData", studantData)
  return (<div className="container-home">
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
                onChange={handleOnChange}
              />

              <div class="d-flex justify-content-center btnmain">
                <Link to="/school-payment">
                  <button className="main-btn" onClick={submitStudantData}>
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
                    <th>DOB</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>ExamTheme</th>
                    <th>MockTest</th>
                    <th>Action</th>

                  </tr>
                  {
                    studantData.map(tbData => {
                      return (
                        <tr>
                          <td>{tbData[4] ?? ''} </td>
                          <td>{tbData[5] ?? ''}</td>
                          <td>{tbData[7] ?? ''}</td>
                          <td>{tbData[8] ?? ''}</td>
                          <td>{tbData[10] ?? ''}</td>
                          <td>{tbData[11] ?? ''}</td>

                          <td style={{ display: "flew", flexDirection: "row" }}>
                            <button className="icon-btn">
                              <i className="fa fa-pencil-square"></i>
                            </button>
                            <button className="icon-btn">
                              <i className="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }

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
