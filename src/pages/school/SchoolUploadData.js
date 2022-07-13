import React, { useContext } from "react";
import { Link } from "react-router-dom";
import schoolimg from "../../assets/icons/school.png";
import uploadfiles from "../../assets/icons/upload_files.svg";
import { Colors } from "../../assets/css/color";
import "../../assets/icons/common.svg";
import { API_BASE_URL, API_END_POINTS, API_BASE_JAVA_URL } from "../../apis/api";
import { ExcelDateToJSDate, notify, checkRowDuplicacy } from '../../Utills'
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";
import Sidebar from "../main/sidebar";
import { StudentDataContext } from "../context/datacontext";
var md5 = require('md5');

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
  const { state, dispatch } = useContext(StudentDataContext);
  const [file, setFile] = useState(null);
  const [studantData, setStudanntData] = useState([]);
  const [duplicateRows, setDuplicateRows] = useState([]);
  const [headers, setHeaders] = useState([])
  const UPLOAD_ENDPOINT = API_END_POINTS.uploadStudantdata;
  const navigate = useNavigate();
  const [stName, setStName] = useState('');
  const [stDOB, setDOB] = useState('');
  const [stClass, setClass] = useState('');
  const [stSection, setSection] = useState('');
  const [examTheme, setexamTheme] = useState('');
  const [demoExam, setDemoExam] = useState('');
  const [idCount, setIdCount] = useState(0);
  const classesdropdown = [4, 5, 6, 7, 8, 9, 10, 11, 12, 'UG', 'PG'];
  const examThemedropdown = ['ESD', 'ESDGREEN'];
  const userToken = localStorage.getItem("token") ? localStorage.getItem("token") : "";
  let token = userToken;
  // let decodedSchoolData = token !== "" ? jwt_decode(token) : {};

  let decodedSchoolData = { ...state };


  const submitStudantData = async e => {
    e.preventDefault();
    let serverData = [...studantData];
    if (studantData.length <= MINIMUMROW) {
      notify(`Studant record minmum of ${MINIMUMROW} rows. Duplicate data in files`, false)
      return
    }
    // let messge = checkRowDuplicacy(serverData)
    // if (messge.length > 0) {
    //   notify(`${messge.join()}`, false);
    //   return
    // }


    // let studantDataExist = await axios.post(`${API_BASE_URL}${API_END_POINTS.getStudantData}`, {
    //   "SchoolID": decodedSchoolData?.schoolsCode
    // })

    // let studantDataExist = await axios.post(`${API_BASE_URL}${API_END_POINTS.getStudantData}`, {
    //   "SchoolID": decodedSchoolData?.schoolsCode
    // })

    // if (studantDataExist?.data && studantDataExist?.data?.status && studantDataExist.data.data.length > 0) {
    //   let serverStudant = studantDataExist.data.data;
    //   let existingStud = serverStudant.map(st => [st.Name, st.DOB, st.Class, st.Section, st.ExamTheme, st.DemoExam]);
    //   let newCheckUP = [...studantData, ...existingStud];
    //   let hashes = {};
    //   let message = []
    //   newCheckUP.forEach(function (row, idx) {

    //     var hash = md5(row.slice(0, 2).join('~~~'));

    //     if (hash in hashes) {
    //       hashes[hash].push(idx);
    //     } else {
    //       hashes[hash] = [idx];
    //     }
    //   })

    //   Object.keys(hashes).forEach(function (key, idx) {
    //     var msg = '';
    //     if (hashes[key].length > 1) {
    //       msg = 'Rows ' + hashes[key].join(' and ') + ' are duplicate\n';
    //       message.push(msg);
    //       // console.log(msg);
    //     }
    //   });
    //   if (message.length > 0) {
    //     notify(`${"These studants are already in DB \'n" + message.join()}`, false);
    //     return
    //   }

    //   console.log("studantData", serverStudant, studantData, existingStud)

    // }
    // return ;



    // let res = await uploadFile(JSON.stringify(serverData));
    let studentuploaddone = await uploadFile();

    // if (res?.data && res?.data?.status) {
    //   localStorage.setItem('payment', JSON.stringify(res.data.data))
    //   setStudanntData([])
    //   navigate("/school-payment");
    //   notify(`studant data uploaded.`, true)
    // } else {
    //   notify(`please try again!.`, false)
    // }
  };

  const uploadFile = async () => {
    // let SCHOOLID = decodedSchoolData?.schoolsCode
    // return await axios.post(`${API_BASE_URL}${UPLOAD_ENDPOINT}/${SCHOOLID}`, { fileData: file });
    // return await axios.post(`${UPLOAD_ENDPOINT}/${SCHOOLID}`, { fileData: file });
    console.log("student data", studantData);
    let finalData = [];
    let studantDataVal = [...studantData];
    let errRows = [];
    let invalidDate = false;
    //  check the date validation
    for (let i = 0; i < studantDataVal.length; i++) {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if ((studantDataVal[i]['dob'].match(regex) === null) || (classesdropdown.indexOf(parseInt(studantDataVal[i]['className'])) === -1) ||
        (examThemedropdown.indexOf(studantDataVal[i]['examTheme']) === -1) || (['YES', 'NO'].indexOf(studantDataVal[i]['demoExam']) === -1)) {
        invalidDate = true;
        studantDataVal[i]['error'] = 'invalid';
        errRows.push(i + 1);
      } else {
        studantDataVal[i]['error'] = 'valid';
      }

    }
    setStudanntData([...studantDataVal]);
    if (invalidDate) {
      notify(`Please correct the respective  columns of row number ${errRows}`, false);
      return;
    }
    // else {
    finalData = [...studantData];
    for (let i = 0; i < finalData.length; i++) {
      delete finalData[i]['id'];
      delete finalData[i]['error'];
    }
    //   console.log("finalData", finalData);


    await axios.post(`${API_BASE_JAVA_URL}${API_END_POINTS.uploadApi}`, finalData);
    notify(`Students successfully uploaded!.`, true);
    // }




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
          let arr = [];
          for (let i = 0; i < d.length; i++) {
            if (d[i].length === 0) {
              continue;
            } else {
              arr.push(d[i]);
            }
          }
          setHeaders(arr.shift());
          correctData = arr.map((exData, i) => [...exData.slice(0, 1), dayjs(ExcelDateToJSDate(exData[1])).format('YYYY-MM-DD'), ...exData.slice(2, 15)]);
          console.log("correctData", correctData);

          let correctDatawithErr = correctData.map((row, i) => [...row, 'valid']);
          console.log("correctDatawithErr", correctDatawithErr);
          if (correctData.length <= MINIMUMROW) {
            notify(`this file must contain minimum ${MINIMUMROW} rows.`, false)
            return
          }
          // let duplicateRows = checkRowDuplicacy(correctData);
          // // console.log("=tetst",duplicateRows)
          // // setDuplicateRows(duplicateRows)
          // if (duplicateRows.length > 0) {
          //   notify(`${duplicateRows.join()}`, false)
          // }
          let finalArr = [];
          let idVal = 0;
          for (let i = 0; i < correctData.length; i++) {
            let resultset = {};
            resultset['id'] = idVal++;
            resultset['name'] = correctData[i][0];
            resultset['dob'] = correctData[i][1];
            resultset['className'] = correctData[i][2];
            resultset['section'] = correctData[i][3];
            resultset['examTheme'] = correctData[i][4];
            resultset['demoExam'] = correctData[i][5];
            resultset['schoolId'] = state.school_code;
            resultset['error'] = 'valid';
            finalArr.push(resultset);
          };
          setIdCount(prevCount => prevCount + idVal);
          console.log("idCount", idCount);
          // setStudanntData(correctDatawithErr);
          setStudanntData([...finalArr]);

        } catch (e) {
          notify(`file could not uploaded, please try again!.`, false)
        }
      }
      r.readAsBinaryString(f);
    } else {
      notify('Failed to load file!', false);
    }
    setFile(e.target.files[0]);

    console.log("studantData", studantData);
  };
  const deleteRow = (data, i) => {
    // console.log("0900899x",studantData.filter((d,index) => i !== index ))
    // setStudanntData(studantData.filter((d, index) => i !== index));
    // let deletarray = [...studantData];
    // deletarray.splice(i, 1);
    // setStudanntData([deletarray]);
    // studantData.splice(i, 1);

    // let newval =;
    // console.log("newval", newval);  
    setStudanntData([...studantData.filter((d, index) => { return index !== i })]);
  }
  const editRow = (data, i) => {
    let inDom = document.querySelectorAll(`._tbls${i}`);
    inDom.forEach(function (node) {
      node.removeAttribute('disabled')
      // Do whatever you want with the node object.
    });
  }
  const handleOnChangeCell = (e, columnName, i) => {

    let cellValue = e.target.value
    let perData = [...studantData];
    let updatedate = perData.map((value, index) => {
      if (index === i) {
        value[columnName] = cellValue;
        return value;
      } else { return value }
    })



    // let cellValue = e.target.value
    // let perData = [...studantData];
    // let updatedate = perData.map((sd, ii) => {
    //   if (ii == i) {
    //     sd[+cell] = cellValue
    //     return sd;
    //   } else { return sd }
    // })

    setStudanntData(updatedate)
  }

  const addNewRow = (e) => {
    e.preventDefault();
    if (!(stName && stDOB && stClass && stSection && examTheme && demoExam)) {
      // notify(`Please fill all fields!.`, false)
      return
    }
    console.log("idCount", idCount);

    let runningId = JSON.parse(JSON.stringify(idCount));
    let exceldataset = [...studantData];
    let resultset = {};
    resultset['id'] = runningId++;
    resultset['name'] = stName;
    resultset['dob'] = stDOB;
    resultset['className'] = stClass;
    resultset['section'] = stSection;
    resultset['examTheme'] = examTheme;
    resultset['demoExam'] = demoExam;
    resultset['schoolId'] = state.school_code;
    resultset['error'] = 'valid';

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    let invalidDate = false;
    let errRows = [];
    if ((resultset['dob'].match(regex) === null) || (classesdropdown.indexOf(parseInt(resultset['dob']['className'])) === -1) ||
      (examThemedropdown.indexOf(resultset['dob']['examTheme']) === -1) || (['YES', 'NO'].indexOf(resultset['dob']['demoExam']) === -1)) {
      resultset['error'] = 'invalid';

      errRows.push(exceldataset.length + 1);
    }

    notify(`Please correct the respective  columns of row number ${errRows}`, false);
    exceldataset.push(resultset);

    setStudanntData([...exceldataset]);
    setIdCount(runningId);
    // let cpyStudantData = [...studantData, [stName, stDOB, stClass, stSection, examTheme, demoExam, 'valid']];

    // setStName('');
    // setDOB('');
    // setClass('');
    // setexamTheme('');
    // setSection('');
    // setDemoExam('');
    // setStudanntData(cpyStudantData)

  }
  return (
    // <div className="container-home">
    //   <div className="card">
    //     <div className="card-body">
    //       <h6 class="card-title">
    //         <span>
    //           <img class="card-img-top" src={schoolimg} alt="Card image" />
    //         </span>
    //         SCHOOL DESK
    //       </h6>
    //       <ul class="sidebar">
    //         <Link to="">
    //           <p
    //             class="side-text"
    //           >
    //             SCHOOL DETAILS
    //           </p>
    //         </Link>
    //         <br />
    //         <Link to="">
    //           <p class="side-text"
    //             style={{ backgroundColor: Colors.MAINCOLOR, color: "#fff" }}
    //           >UPLOAD STUDENTS DATA</p>
    //         </Link>
    //         <br />
    //         <Link to="">
    //           <p class="side-text">MAKE PAYMENT</p>
    //         </Link>
    //         <br />
    //         <Link to="">
    //           <p class="side-text">SELECT SLOT DETAILS</p>
    //         </Link>
    //         <br />
    //         <Link to="">
    //           <p class="side-text">APPLICATION STATUS</p>
    //         </Link>
    //         <br />
    //         <Link to="/school-helpdesk-ticket">
    //           <p class="side-text">SUBMIT HELPDESK TICKET</p>
    //         </Link>
    //         <br />
    //         <Link to="/school-view-helpdesk-ticket">
    //           <p class="side-text">VIEW HELPDESK TICKET</p>
    //         </Link>
    //         <br />
    //         <Link to="/school-certificate">
    //           <p class="side-text">DOWNLOAD CERTIFICATE</p>
    //         </Link>
    //         <br />
    //         <Link to="/school-change-password" >
    //           <p class="side-text">CHANGE PASSWORD</p>
    //         </Link>
    //         <br />
    //         <Link to="/">
    //           <p class="side-text">LOGOUT</p>
    //         </Link>
    //         <br />
    //       </ul>
    //     </div>
    //   </div>

    //   <div className="main-head">
    //     <div className="main">
    //       <marquee> Welcome to Green Olympiad</marquee>
    //     </div>

    //     <div style={{ marginLeft: 15 }}>
    //       <div className="imgcontainer">
    //         <h5>
    //           If You have Excel data upload from Upload Student Data Otherwise
    //           Add <br /> data From Add Student Data
    //         </h5>
    //       </div>
    //       <div>
    //         <div class="form-card-second">
    //           <div class="">
    //             <h2>Upload Students Data</h2>
    //           </div>
    //           <div class="">
    //             <p class="upload-text">Upload Student Data from Excel</p>

    //             <input
    //               class="upload"
    //               type="file"
    //               placeholder="Name"
    //               name="uname"
    //               required
    //               onChange={handleOnChange}
    //             />

    //             <div class="d-flex justify-content-center btnmain">
    //               <Link to="/school-payment">
    //                 <button className="main-btn" onClick={submitStudantData}>
    //                   Save Student Data
    //                 </button>
    //               </Link>
    //               <button className="main-btn" type="submit">
    //                 Download Excel Format
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //         <div class="form-card-second" style={{ marginTop: 20 }}>
    //           <div class="imgcontainer">
    //             <h2>Add Students Data</h2>
    //           </div>
    //           <div class="">
    //             <p class="upload-text">Add Student Data from Add Button</p>
    //             <table className="add-school-data">
    //               <tr>
    //                 <th>Name</th>
    //                 <th>DOB</th>
    //                 <th>Class</th>
    //                 <th>Section</th>
    //                 <th>ExamTheme</th>
    //                 <th>DemoExam</th>

    //               </tr>

    //               <tr>
    //                 <td contenteditable="true">
    //                   <input type="text" name="add1" style={{
    //                     "width": "90%",
    //                     "padding": "6px 15px",
    //                     "margin": "0px",
    //                     display: "inline-block",
    //                     border: "1px solid #ccc",
    //                     "box-sizing": "border-box",
    //                     "border-radius": "14px"
    //                   }}
    //                     value={stName}

    //                     onChange={e => setStName(e.target.value)}

    //                   /></td>
    //                 <td contenteditable="true"><input type="text" name="add1"

    //                   style={{
    //                     "width": "90%",
    //                     "padding": "6px 15px",
    //                     "margin": "0px",
    //                     display: "inline-block",
    //                     border: "1px solid #ccc",
    //                     "box-sizing": "border-box",
    //                     "border-radius": "14px"
    //                   }}

    //                   onChange={e => setDOB(e.target.value)}
    //                   value={stDOB}

    //                 /></td>
    //                 <td contenteditable="true"><input type="text" name="add1"
    //                   style={{
    //                     "width": "90%",
    //                     "padding": "6px 15px",
    //                     "margin": "0px",
    //                     display: "inline-block",
    //                     border: "1px solid #ccc",
    //                     "box-sizing": "border-box",
    //                     "border-radius": "14px"
    //                   }}

    //                   onChange={e => setClass(e.target.value)}
    //                   value={stClass}


    //                 /></td>
    //                 <td contenteditable="true"><input type="text" name="add1"
    //                   style={{
    //                     "width": "90%",
    //                     "padding": "6px 15px",
    //                     "margin": "0px",
    //                     display: "inline-block",
    //                     border: "1px solid #ccc",
    //                     "box-sizing": "border-box",
    //                     "border-radius": "14px"
    //                   }}

    //                   onChange={e => setSection(e.target.value)}
    //                   value={stSection}


    //                 /></td>
    //                 <td contenteditable="true"><input type="text" name="add1"

    //                   style={{
    //                     "width": "90%",
    //                     "padding": "6px 15px",
    //                     "margin": "0px",
    //                     display: "inline-block",
    //                     border: "1px solid #ccc",
    //                     "box-sizing": "border-box",
    //                     "border-radius": "14px"
    //                   }}

    //                   onChange={e => setexamTheme(e.target.value)}

    //                   value={examTheme}

    //                 /></td>
    //                 <td contenteditable="true"><input type="text" name="add1"

    //                   style={{
    //                     "width": "90%",
    //                     "padding": "6px 15px",
    //                     "margin": "0px",
    //                     display: "inline-block",
    //                     border: "1px solid #ccc",
    //                     "box-sizing": "border-box",
    //                     "border-radius": "14px"
    //                   }}

    //                   onChange={e => setDemoExam(e.target.value)}


    //                   value={demoExam}

    //                 /></td>
    //               </tr>


    //             </table>
    //             <div class="d-flex justify-content-center btnmain">
    //               <a>
    //                 <button className="main-btn" onClick={addNewRow}>
    //                   Add data
    //                 </button>
    //               </a>
    //             </div>
    //             <div>
    //               <table className="add-school-data">
    //                 <tr>
    //                   <th>Name</th>
    //                   <th>DOB</th>
    //                   <th>Class</th>
    //                   <th>Section</th>
    //                   <th>ExamTheme</th>
    //                   <th>DemoExam</th>
    //                   <th>Action</th>

    //                 </tr>
    //                 {
    //                   studantData.map((tbData, i) => {
    //                     return (
    //                       <tr>
    //                         <td contenteditable="true"><input type="text" name="add1" defaultValue={tbData[0] ?? ''} style={{
    //                           "width": "90%",
    //                           "padding": "6px 15px",
    //                           "margin": "0px",
    //                           display: "inline-block",
    //                           border: "1px solid #ccc",
    //                           "box-sizing": "border-box",
    //                           "border-radius": "14px"
    //                         }}
    //                           className={`_tbls${i}`}
    //                           disabled

    //                           onChange={e => handleOnChangeCell(e, '0', i)}
    //                         /></td>
    //                         <td contenteditable="true"><input type="text" name="add1" defaultValue={tbData[1] ?? ''}

    //                           style={{
    //                             "width": "90%",
    //                             "padding": "6px 15px",
    //                             "margin": "0px",
    //                             display: "inline-block",
    //                             border: "1px solid #ccc",
    //                             "box-sizing": "border-box",
    //                             "border-radius": "14px"
    //                           }}
    //                           className={`_tbls${i}`}
    //                           disabled
    //                           onChange={e => handleOnChangeCell(e, '1', i)}

    //                         /></td>
    //                         <td contenteditable="true"><input type="text" name="add1" defaultValue={tbData[2] ?? ''}
    //                           style={{
    //                             "width": "90%",
    //                             "padding": "6px 15px",
    //                             "margin": "0px",
    //                             display: "inline-block",
    //                             border: "1px solid #ccc",
    //                             "box-sizing": "border-box",
    //                             "border-radius": "14px"
    //                           }}
    //                           className={`_tbls${i}`}
    //                           disabled
    //                           onChange={e => handleOnChangeCell(e, '2', i)}

    //                         /></td>
    //                         <td contenteditable="true"><input type="text" name="add1" defaultValue={tbData[3] ?? ''}
    //                           style={{
    //                             "width": "90%",
    //                             "padding": "6px 15px",
    //                             "margin": "0px",
    //                             display: "inline-block",
    //                             border: "1px solid #ccc",
    //                             "box-sizing": "border-box",
    //                             "border-radius": "14px"
    //                           }}
    //                           className={`_tbls${i}`}
    //                           disabled
    //                           onChange={e => handleOnChangeCell(e, '3', i)}

    //                         /></td>
    //                         <td contenteditable="true"><input type="text" name="add1" defaultValue={tbData[4] ?? ''}

    //                           style={{
    //                             "width": "90%",
    //                             "padding": "6px 15px",
    //                             "margin": "0px",
    //                             display: "inline-block",
    //                             border: "1px solid #ccc",
    //                             "box-sizing": "border-box",
    //                             "border-radius": "14px"
    //                           }}
    //                           className={`_tbls${i}`}
    //                           disabled
    //                           onChange={e => handleOnChangeCell(e, '4', i)}

    //                         /></td>
    //                         <td contenteditable="true"><input type="text" name="add1" defaultValue={tbData[5] ?? ''}

    //                           style={{
    //                             "width": "90%",
    //                             "padding": "6px 15px",
    //                             "margin": "0px",
    //                             display: "inline-block",
    //                             border: "1px solid #ccc",
    //                             "box-sizing": "border-box",
    //                             "border-radius": "14px"
    //                           }}
    //                           className={`_tbls${i}`}
    //                           disabled
    //                           onChange={e => handleOnChangeCell(e, '4', i)}

    //                         /></td>




    //                         <td style={{ display: "flew", flexDirection: "row" }}>
    //                           <button className="icon-btn" onClick={(e) => editRow(tbData, i)}>
    //                             <i className="fa fa-pencil-square"></i>
    //                           </button>
    //                           <button className="icon-btn" onClick={(e) => deleteRow(tbData, i)}>
    //                             <i className="fa fa-trash"></i>
    //                           </button>
    //                         </td>
    //                       </tr>
    //                     )
    //                   })
    //                 }

    //               </table>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    // </div>

    <div className="container-fluid">
      <div className="row ">
        <div className="col-lg-3">
          <Sidebar />
        </div>
        <div className="col-lg-9 ">
          <main className="content ">
            <div className="container-fluid ps-md-4 ps-lg-5 pe-md-4 py-5">
              <div className="section-title mb-4 text-muted">
                <h6 className="font-bold ">Upload Student Data</h6>
                <p>Upload Student Data from Excel</p>
              </div>

              <div className="section-title mb-4 text-muted">
                <div className="d-flex">
                  <div className="me-auto">
                    <h6 className="font-bold ">Add Student Data</h6>
                    <p>Add Student Data from Add button</p>
                  </div>
                  <button className="btn btn-outline-secondary" data-bs-toggle="collapse" data-bs-target="#newStudentRow"><svg className="icon align-middle me-1">
                    <use xlinkHref="#add-plus"></use>
                  </svg> <span className="align-middle">Add Data</span></button>
                </div>
              </div>


              <div id="newStudentRow" className="collapse">
                <div className="table-responsive ">
                  <table className="table table-bordered table-accent">
                    <thead>
                      <tr>
                        <th>NAME</th>
                        <th>DOB</th>
                        <th>CLASS</th>
                        <th>SECTION</th>
                        <th>EXAM THEME</th>
                        <th>MOCK TEST</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-wrapper">
                            {/* <input type="text" placeholder="Enter name" style={{ width: '220px' }} /> */}
                            <input type="text" name="add1" style={{
                              "width": "90%",
                              "padding": "6px 15px",
                              "margin": "0px",
                              display: "inline-block",
                              border: "1px solid #ccc",
                              "box-sizing": "border-box",
                              "border-radius": "14px"
                            }}
                              value={stName}

                              onChange={e => setStName(e.target.value)}

                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-wrapper">
                            {/* <input type="text" placeholder="02-08-2001" style={{ width: '100px' }} /> */}
                            <input type="text" name="add1"

                              style={{ width: '100px' }}

                              onChange={e => setDOB(e.target.value)}
                              value={stDOB}

                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-wrapper">
                            {/* <input type="text" placeholder="V" style={{ width: '60px' }} /> */}
                            <input type="text" name="add1"
                              style={{ width: '60px' }}

                              onChange={e => setClass(e.target.value)}
                              value={stClass}


                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-wrapper">
                            {/* <input type="text" placeholder="A" style={{ width: '60px' }} /> */}
                            <input type="text" name="add1"
                              style={{ width: '60px' }}

                              onChange={e => setSection(e.target.value)}
                              value={stSection}


                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-wrapper">
                            {/* <input type="text" style={{ width: '150px' }} /> */}
                            <input type="text" name="add1"

                              style={{ width: '150px' }}
                              onChange={e => setexamTheme(e.target.value)}

                              value={examTheme}

                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-wrapper">
                            {/* <input type="text" style={{ width: '150px' }} /> */}
                            <input type="text" name="add1"

                              style={{ width: '150px' }}

                              onChange={e => setDemoExam(e.target.value)}


                              value={demoExam}

                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="shadow bg-white mb-5 rounded-16">
                <div className="p-4">
                  <div className="row">
                    <div className="col-sm-7 mb-5 mb-sm-0">
                      <div className="upload-box text-center h-100">
                        <label>
                          {/* <input type="file" name="upload" accept=".xlsx" /> */}
                          <input
                            className="upload"
                            type="file"
                            placeholder="Name"
                            name="uname"
                            required
                            onChange={handleOnChange}
                          />
                          <img src={uploadfiles} alt="" />
                          <br />
                          <strong>browse excel</strong>
                        </label>

                      </div>
                    </div>

                    <div className="col-sm-5">
                      <div className="d-flex h-100 flex-column justify-content-around">
                        <button className="btn btn-primary mb-4 mb-sm-0 w-100">Download Excel Format</button>
                        <button className="btn btn-primary w-100 ">Upload Student Data</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-title mb-4 text-muted">
                <div className="d-flex">
                  <div className="me-auto">
                    <h6 className="font-bold ">Add Student Data</h6>
                    <p>Add Student Data from Add button</p>
                  </div>
                  <button className="btn btn-outline-secondary"><svg className="icon align-middle me-1">
                    <use xlinkHref="#add-plus"></use>
                  </svg> <span className="align-middle" onClick={addNewRow}>Add Data</span></button>
                </div>
              </div>

              <div className="shadow bg-white p-3 rounded-16">
                <div className="table-responsive ">
                  <table className="table table-bordered table-accent">
                    <thead>
                      <tr>
                        <th>NAME</th>
                        <th>DOB</th>
                        <th>CLASS</th>
                        <th>SECTION</th>
                        <th>EXAM THEME</th>
                        <th>MOCK TEST</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>

                    </tbody>
                    <tbody>
                      {
                        studantData.map((tbData, i) => {
                          console.log("tbData", tbData);
                          return (
                            <tr key={tbData.id} className={tbData['error'] === 'invalid' ? 'invalid' : 'valid'}>
                              <td contenteditable="true"><input type="text" name="add1" defaultValue={tbData['name'] ?? ''} style={{
                                "width": "90%",
                                "padding": "6px 15px",
                                "margin": "0px",
                                display: "inline-block",
                                border: "1px solid #ccc",
                                "box-sizing": "border-box",
                                "border-radius": "14px"
                              }}
                                className={`_tbls${i}`}
                                disabled

                                onChange={e => handleOnChangeCell(e, 'name', i)}
                              /></td>
                              <td contenteditable="true"><input type="text" name="add1" defaultValue={tbData['dob'] ?? ''}

                                style={{
                                  "width": "90%",
                                  "padding": "6px 15px",
                                  "margin": "0px",
                                  display: "inline-block",
                                  border: "1px solid #ccc",
                                  "box-sizing": "border-box",
                                  "border-radius": "14px"
                                }}
                                className={`_tbls${i}`}
                                disabled
                                onChange={e => handleOnChangeCell(e, 'dob', i)}

                              /></td>
                              <td contenteditable="true"><input type="text" name="add1" defaultValue={tbData['className'] ?? ''}
                                style={{
                                  "width": "90%",
                                  "padding": "6px 15px",
                                  "margin": "0px",
                                  display: "inline-block",
                                  border: "1px solid #ccc",
                                  "box-sizing": "border-box",
                                  "border-radius": "14px"
                                }}
                                className={`_tbls${i}`}
                                disabled
                                onChange={e => handleOnChangeCell(e, 'className', i)}

                              /></td>
                              <td contenteditable="true"><input type="text" name="add1" defaultValue={tbData['section'] ?? ''}
                                style={{
                                  "width": "90%",
                                  "padding": "6px 15px",
                                  "margin": "0px",
                                  display: "inline-block",
                                  border: "1px solid #ccc",
                                  "box-sizing": "border-box",
                                  "border-radius": "14px"
                                }}
                                className={`_tbls${i}`}
                                disabled
                                onChange={e => handleOnChangeCell(e, 'section', i)}

                              /></td>
                              <td contenteditable="true"><input type="text" name="add1" defaultValue={tbData['examTheme'] ?? ''}

                                style={{
                                  "width": "90%",
                                  "padding": "6px 15px",
                                  "margin": "0px",
                                  display: "inline-block",
                                  border: "1px solid #ccc",
                                  "box-sizing": "border-box",
                                  "border-radius": "14px"
                                }}
                                className={`_tbls${i}`}
                                disabled
                                onChange={e => handleOnChangeCell(e, 'examTheme', i)}

                              /></td>
                              <td contenteditable="true"><input type="text" name="add1" defaultValue={tbData['demoExam'] ?? ''}

                                style={{
                                  "width": "90%",
                                  "padding": "6px 15px",
                                  "margin": "0px",
                                  display: "inline-block",
                                  border: "1px solid #ccc",
                                  "box-sizing": "border-box",
                                  "border-radius": "14px"
                                }}
                                className={`_tbls${i}`}
                                disabled
                                onChange={e => handleOnChangeCell(e, 'demoExam', i)}

                              /></td>




                              <td style={{ display: "flew", flexDirection: "row" }}>
                                {/* <button className="icon-btn" onClick={(e) => editRow(tbData, i)}>
                                  <i className="fa fa-pencil-square"></i>
                                </button>
                                <button className="icon-btn" onClick={(e) => deleteRow(tbData, i)}>
                                  <i className="fa fa-trash"></i>
                                </button> */}

                                <div className="btn-group btn-group-sm" role="group">
                                  <button type="button" className="btn btn-link" onClick={(e) => editRow(tbData, i)}><svg className="icon">
                                    <use xlinkHref="#edit"></use>
                                  </svg></button>
                                  <div className="vr"></div>
                                  <button type="button" className="btn btn-link" onClick={(e) => deleteRow(tbData, i)}><svg className="icon">
                                    <use xlinkHref="#delete"></use>
                                  </svg></button>
                                </div>


                              </td>
                            </tr>
                          )
                        })
                      }



                    </tbody>
                  </table>
                </div>
                <div>
                  <h3>Points to keep in mind
                    <ul>
                      <li>Date of Birth should be in YYYY-MM-DD format</li>
                      <li>Value of examTheme should be either ESD/ESDGREEN</li>
                      <li>Value of mock test should be either YES/NO</li>
                      <li>Value of class  should be btween 4,5,6,7,8,9,10,11,12,UG,PG</li>
                    </ul>
                  </h3>
                </div>
                <div className="row my-3">
                  <button className="btn btn-primary mx-auto" style={{ width: '15rem' }} onClick={submitStudantData}>Save Student Data</button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );


}
