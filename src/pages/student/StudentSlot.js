import React, { useContext } from "react";
import { Link } from "react-router-dom";
import schoolimg from "../../assets/icons/school.png";
import { Colors } from "../../assets/css/color";
import { API_BASE_URL, API_END_POINTS, API_BASE_JAVA_URL } from "../../apis/api";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";

import { notify } from '../../Utills'
import Sidebar from "../main/sidebar";
import { StudentDataContext } from "../context/datacontext";
import SidebarStudent from "../main/sidebarStudent";
const dayjs = require('dayjs');

export default function StudentSlot() {
  const { state, dispatch } = useContext(StudentDataContext);

  console.log("state", state);
  const [slots, setSlot] = useState([]);
  const [isFade, setFade] = useState(true)
  const [availableSlots, setavailableSlots] = useState([]);
  const [studantWithSlot, setstudantWithSlot] = useState([]);
  const [serverPayLoad, setPayload] = useState([]);
  const [slotErrmsg, setSlotErrmsg] = useState("");
  const [examtypes, setExamTypes] = useState({});
  const [isthemeChoosen, setIsThemeChoosen] = useState(false);
  const [showSlotErr, setShowSlotErr] = useState("");
  const [serverPayloadData, setServerPayloadData] = useState([]);
  const navigation = useNavigate()

  let decodedSchoolData = {}
  const getSlots = async () => {
    setShowSlotErr("");
    let getslots = await axios.get(`${API_BASE_JAVA_URL}${API_END_POINTS.getSlotsDataForIndividualStudent}`, {
      params: {
        mode: 'ONLINE', rollNumber: `${state.roll_no}`
      }
    });

    if (getslots?.data && getslots.status) {
      // if (!getslots?.data?.data.isSlottingAllowed) {
      //   setSlotErrmsg(isSlotAllowedRes.data.message);
      // } else {

      console.log("response", getslots);

      if (getslots?.data && getslots.status) {
        // setSlot(response.data.list)
        setSlot(getslots.data);
        let obj = {};
        let examTypevalues = new Set(getslots?.data.map(value => value.examTheme));
        examTypevalues.forEach((examtheme => {
          obj[examtheme] = false;
        }));

        if (state?.student.examTheme === null || state?.student.demoExam === null || state?.student.examTheme === "" || state?.student.demoExam === "") {
          setIsThemeChoosen(false);
        } else {
          setIsThemeChoosen(true);
        }
        console.log(obj);
        setExamTypes(obj);
      }
      // }
    }
  }

  useEffect(() => {
    getSlots();
    // setStudantAndSlot()
  }, []);


  const checkslotFill = () => {
    console.log("examtypes", examtypes);
    let chooseboth = true;
    for (let key in examtypes) {
      if (!examtypes[key]) {
        chooseboth = false;
      }
    }

    if (!chooseboth) {
      setShowSlotErr("Please select the slots in the above options");
      return false;
    } else {
      setShowSlotErr("");
      return true;
    }
    // let examTypes = new Set(slots.map(value => value.examTheme));
    // let chooseboth = true;
    // examTypes.forEach((examtheme => {
    //   if (!obj[examtheme]) {
    //     chooseboth = false;
    //   }
    // }));




  }
  const togglePop = (slot) => {
    setavailableSlots(slot)
    setFade(false);
    document.getElementsByClassName('modal')[0].style.display = 'block';
  }
  const handleCloseModal = () => {
    setFade(true);
    document.getElementsByClassName('modal')[0].style.display = 'none';
  }
  try {
    const userToken = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    let token = userToken;
    decodedSchoolData = token !== "" ? jwt_decode(token) : {};

  } catch (e) {

  }
  // const setStudantAndSlot = () => {
  //   try {
  //     let paymentData = JSON.parse(localStorage.getItem('payment') ?? '[]');
  //     let mock = 0
  //     paymentData.map(d => {
  //       if (d?.optMock) {
  //         mock = mock + d.optMock
  //       }
  //     })
  //     let pp = [...paymentData.map(s => ({ theme: s.theme, totalStudant: s.totalCount })), { theme: "MOCK", totalStudant: mock }]
  //     setstudantWithSlot(pp)
  //   } catch (e) {
  //     console.log("Error")
  //   }
  // }

  //  logic for choose slot 

  const chooseSlot = (test, value) => {
    // setServerPayloadData
    let currentSlectedSlot = [];
    let servercopy = [];
    let xfilter = slots.filter(s => s.examTheme === test)
    if (xfilter && xfilter.length > 0) {
      //  current id slot chosen
      currentSlectedSlot = xfilter.filter(t => t.slotID === value)[0];
    }
    if (serverPayloadData.filter(v => v.examTheme === test).length > 0) {
      let indexVal = serverPayloadData.findIndex((item) => item.examTheme === test);
      servercopy = [...serverPayloadData];
      servercopy.splice(indexVal, 1);
      servercopy.push(currentSlectedSlot);
      setServerPayloadData(servercopy);
    } else {
      setServerPayloadData(serverPayloadData.concat(currentSlectedSlot));
    }




  }
  //  submit slots

  const submitSlots = async () => {

    let saveslots = checkslotFill();
    if (saveslots) {
      let response = await axios.post(`${API_BASE_JAVA_URL}${API_END_POINTS.updateSlotsDataForIndividualStudent}`, serverPayloadData);
      console.log('submit', response)
      if (response && response?.data && response?.status) {
        // notify('Slot booked successfully', true);
        getSlots();
        navigation('/student-payment');
      }
      else {
        // notify('Please select ESD OR EADGREEN ')
      }
    }

    // return;
  }




  const setTestSlot = (test, value) => {
    let currentSlectedSlot = [];

    let xfilter = slots.filter(s => s.examTheme === test)
    if (xfilter && xfilter.length > 0) {
      currentSlectedSlot = xfilter.filter(t => t.slotId === +value)
    }
    console.log('currentSlectedSlot', currentSlectedSlot, value)

    if (currentSlectedSlot.length > 0) {
      let avail = [];
      let Sfilter = studantWithSlot.filter(avs => avs.theme === test)
      console.log("Sfilter", Sfilter)

      if (Sfilter.length > 0 && currentSlectedSlot[0].seatAvailable > Sfilter[0].totalStudant) {
        let tim = {
          theme: Sfilter[0]?.theme,
          time: `${dayjs(currentSlectedSlot[0].DateofExam).format('DD-MM-YYYY')} | ${currentSlectedSlot[0]?.Slotdatetime}`,
          seatCount: Sfilter[0]?.totalStudant,
          slotID: currentSlectedSlot[0].SlotID
        }
        let xpayload = []
        let isFound = serverPayLoad.find(v => v.theme == tim.theme);
        if (isFound) {
          let serverPayLoadX = serverPayLoad.map(p => {
            if (p.theme == tim.theme) {
              p.time = tim.time;
              p.seatCount = tim?.seatCount
            }
            return p;
          })
          setPayload(serverPayLoadX)
        } else {
          setPayload([...serverPayLoad, ...[tim]])

        }

      } else {
        notify('seat not available', false)
      }
    }
    console.log(test, value, "onChanag", studantWithSlot, xfilter);


  }
  console.log("payLoad", serverPayLoad, studantWithSlot)

  const handleSlotBooking = async () => {
    let test = serverPayLoad.find(s => s.theme === "ESD" || s.theme == "ESDGREEN");
    console.log("test", test)
    if (test) {
      let payload = {
        "SchoolID": decodedSchoolData.schoolsCode,
        "timing": [
          ...serverPayLoad
        ],

      }
      let response = await axios.post(`${API_BASE_URL}${API_END_POINTS.bookSlot}`, payload);
      //let response = await axios.post(`${API_END_POINTS.bookSlot}`, payload);
      console.log('test', response)
      if (response && response?.data && response?.data?.status) {
        notify('Slot booked successfully', true);
        navigation('/school-application-status')
      }
    } else {
      notify('Please select ESD OR EADGREEN ');
      return;
    }
  }

  console.log("slots", slots)
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
    //           <p class="side-text">SCHOOL DETAILS</p>
    //         </Link>
    //         <br />
    //         <Link to="">
    //           <p
    //             class="side-text"
    //           >
    //             UPLOAD STUDENTS DATA
    //           </p>
    //         </Link>
    //         <br />
    //         <Link to="">
    //           <p class="side-text">MAKE PAYMENT</p>
    //         </Link>
    //         <br />
    //         <Link to="">
    //           <p class="side-text"
    //             style={{ backgroundColor: Colors.MAINCOLOR, color: "#fff" }}
    //           >SELECT SLOT DETAILS</p>
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
    //       <div>
    //         <div class="form-card-second">
    //           <div class="">
    //             <h2>Select Slot For Exam / Mock Test</h2>

    //           </div>
    //           <div class="">
    //             <label className="form-label" for="cars">Slot of Examination Test 1st</label>

    //             <select class="dropdown-school" id="cars" onChange={e => setTestSlot('ESD', e.target.value)}>
    //               <option value="volvo">Select Slot</option>
    //               {
    //                 slots && Array.isArray(slots) ? slots.filter(s => s.Examtheme === "ESD").map(slot => (
    //                   <option value={slot.SlotID}>{dayjs(slot?.DateofExam).format('DD-MM-YYYY')}/{slot?.Slotdatetime}</option>
    //                 )) : null
    //               }


    //             </select>






    //             <a href="javascript:void(0)" data-toggle="modal" data-target="#myModalexam"
    //               onClick={_ => togglePop(slots.filter(s => s.Examtheme === "ESD"))}
    //             >
    //               <span className="slot-check">
    //                 <i class="fa fa-question-circle slot-check-icon"> Check Slot</i>
    //               </span>
    //             </a>
    //             <br />
    //             <label className="form-label" for="cars">Slot of Examination Test 2nd</label>
    //             <select class="dropdown-school" id="cars" onChange={e => setTestSlot('ESDGREEN', e.target.value)}>
    //               <option value="volvo">Select Slot</option>

    //               {
    //                 slots && Array.isArray(slots) ? slots.filter(s => s.Examtheme === "ESDGREEN").map(slot => (
    //                   <option value={slot.SlotID}>{dayjs(slot?.DateofExam).format('DD-MM-YYYY')} / {slot?.Slotdatetime}</option>
    //                 )) : null
    //               }
    //             </select>
    //             <a href="javascript:void(0)" data-toggle="modal" data-target="#myModalexam" onClick={_ => togglePop(slots.filter(s => s.Examtheme === "ESDGREEN"))}>
    //               <span className="slot-check">
    //                 <i class="fa fa-question-circle slot-check-icon"> Check Slot</i>
    //               </span>
    //             </a>
    //             <br />
    //             <label className="form-label" for="cars">Slot of Mock Test</label>
    //             <select class="dropdown-school" id="cars" onChange={e => setTestSlot('MOCK', e.target.value)}>
    //               <option value="volvo">Select Slot</option>

    //               {
    //                 slots && Array.isArray(slots) ? slots.filter(s => s.Examtheme === "MOCK").map(slot => (
    //                   <option value={slot.SlotID}>{dayjs(slot?.DateofExam).format('DD-MM-YYYY')} / {slot?.Slotdatetime}</option>
    //                 )) : null
    //               }
    //             </select>
    //             <a href="javascript:void(0)" data-toggle="modal" data-target="#myModalmock" onClick={_ => togglePop(slots.filter(s => s.Examtheme === "MOCK"))}>
    //               <span className="slot-check">
    //                 <i class="fa fa-question-circle slot-check-icon"> Check Slot</i>
    //               </span>
    //             </a>
    //             <br />
    //             <div style={{ marginLeft: 155 }}>

    //               <button className="main-btn" onClick={handleSlotBooking}>
    //                 Book slot for Exam and Mock Test
    //               </button>

    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div class={`modal ${isFade ? 'fade' : ''}`} id="myModalexam">
    //     <div class="modal-dialog modal-dialog-centered">
    //       <div class="modal-content">

    //         <div class="modal-header">
    //           <h4 class="modal-title" style={{ "color": "#1560bd;" }}>Slots for Examination</h4>
    //           <button type="button" class="close" data-dismiss="modal" onClick={handleCloseModal}>
    //             &times;
    //           </button>
    //         </div>
    //         <div class="modal-body">
    //           <table style={{ "width": "100%" }}>
    //             <tr>
    //               <th>Date</th>
    //               <th>Time</th>
    //               <th>Available Seat</th>
    //             </tr>
    //             {
    //               availableSlots && Array.isArray(availableSlots) ? availableSlots.map(slot => (
    //                 <tr>
    //                   <td>{dayjs(slot.DateofExam).format('DD-MM-YYYY')}</td>
    //                   <td>{slot?.Slotdatetime}</td>
    //                   <td>{slot?.SeatAvailable}</td>
    //                 </tr>
    //               )) : null
    //             }

    //           </table>
    //           <button class="modalbutton" data-dismiss="modal" onClick={handleCloseModal}>Ok Got it</button>
    //         </div>

    //       </div>
    //     </div>
    //   </div>



    // </div>









    <div className="row ">
      <div className="col-lg-3">
        <SidebarStudent />
      </div>
      <div className="col-lg-9 ">
        <div className="dashboard-wraper d-flex ">

          <main className="content ">
            <div className="container-fluid ps-md-4 ps-lg-5 pe-md-4 py-5">
              <div className="section-title mb-4 text-muted">
                <h6 className="font-bold ">Select Slot for Exam/Mock Test</h6>
                <p>Slot selection for exam</p>
              </div>
              <div className="shadow bg-white rounded-16">
                <div className="p-4 " >
                  <p><h2>{slotErrmsg}</h2></p>
                  <div className="row">

                    {
                      slots.filter(s => s.examTheme === "ESD").length !== 0 &&
                      (
                        <div className="col-sm">
                          <div className="form-wrapper">
                            <label>Slot for ESD Exam</label>


                            <select onChange={e => {
                              chooseSlot('ESD', e.target.value);
                              setExamTypes(ev => ({
                                ...ev,
                                ['ESD']: true,
                              }))



                            }}>
                              <option value="volvo" >Select Slot</option>
                              {
                                slots && Array.isArray(slots) ? slots.filter(s => s.examTheme === "ESD").map(slot => (
                                  // <option value={slot.slotId}>{dayjs(slot?.dateOfExam).format('DD-MM-YYYY')}/{slot?.slotDatetime}</option>
                                  <option value={slot.slotID}>{dayjs(slot?.dateofExam).format('DD-MM-YYYY')}/{slot?.slotdatetime}</option>
                                )) : null
                              }


                            </select>


                            <a href="javascript:void(0)" className="check-slot d-inline-block mt-2 font-bold" data-toggle="modal" data-target="#myModalexam"
                              onClick={_ => togglePop(slots.filter(s => s.examTheme === "ESD"))}
                            ><svg className="icon align-middle">
                                <use xlinkHref="#check-slot"></use>
                              </svg> <span className="align-middle">Check Slot</span></a>


                          </div>
                        </div>
                      )

                    }



                    {
                      slots.filter(s => s.examTheme === "ESDGREEN").length !== 0 &&
                      (
                        <div className="col-sm">
                          <div className="form-wrapper">
                            <div className="form-wrapper">
                              <label>Slot for ESDGREEN Exam</label>

                              <select class="dropdown-school" id="cars" onChange={e => {
                                chooseSlot('ESDGREEN', e.target.value);
                                setExamTypes(ev => ({
                                  ...ev,
                                  ['ESDGREEN']: true,
                                }))

                              }}>
                                <option value="volvo" >Select Slot</option>

                                {
                                  slots && Array.isArray(slots) ? slots.filter(s => s.examTheme === "ESDGREEN").map(slot => (
                                    <option value={slot.slotID}>{dayjs(slot?.dateofExam).format('DD-MM-YYYY')} / {slot?.slotdatetime}</option>
                                  )) : null
                                }
                              </select>





                              <a href="javascript:void(0)" className="check-slot d-inline-block mt-2 font-bold" data-toggle="modal" data-target="#myModalexam" onClick={_ => togglePop(slots.filter(s => s.examTheme === "ESDGREEN"))}>
                                <svg className="icon align-middle">
                                  <use xlinkHref="#check-slot"></use>
                                </svg> <span className="align-middle">Check Slot</span>
                              </a>



                            </div>
                          </div>
                        </div>
                      )
                    }


                  </div>
                  <div className="row">

                    {
                      slots.filter(s => s.examTheme === "MOCK").length !== 0 &&



                      (
                        <div className="col-sm">
                          <div className="form-wrapper">
                            <label>Slot of Mock Test</label>

                            <select class="dropdown-school" id="cars" onChange={e => {
                              chooseSlot('MOCK', e.target.value);
                              setExamTypes(ev => ({
                                ...ev,
                                ['MOCK']: true,
                              }))
                            }
                            }>
                              <option value="volvo" >Select Slot</option>

                              {
                                slots && Array.isArray(slots) ? slots.filter(s => s.examTheme === "MOCK").map(slot => (
                                  <option value={slot.slotID}>{dayjs(slot?.dateofExam).format('DD-MM-YYYY')} / {slot?.slotdatetime}</option>
                                )) : null
                              }
                            </select>




                            <a href="javascript:void(0)" data-toggle="modal" data-target="#myModalmock" onClick={_ => togglePop(slots.filter(s => s.examTheme === "MOCK"))}>
                              <svg className="icon align-middle">
                                <use xlinkHref="#check-slot"></use>
                              </svg> <span className="align-middle">Check Slot</span>
                            </a>


                          </div>
                        </div>
                      )

                    }

                  </div>
                  {(slots.length > 0) && (
                    <>
                      <div className="row my-3">
                        <div className="text-center">
                          <button className="btn btn-primary mx-auto" onClick={submitSlots}>Book slot for exam and mock test</button>
                        </div>

                        {showSlotErr.length > 0 && (
                          <div>
                            <h2> {showSlotErr}</h2>

                          </div>
                        )}



                      </div>
                      <div>
                        <h2 style={{ color: 'red' }}>Slot once booked cannot be changed again.</h2>
                      </div>
                    </>
                  )}


                  {
                    (isthemeChoosen !== true) && (
                      <div>
                        <h2>Choose your theme or demo exam.</h2>
                      </div>
                    )
                  }

                  {
                    ((isthemeChoosen === true) && (slots.length === 0)) && (
                      <div>
                        <h2>You have booked your slots .</h2>
                      </div>
                    )
                  }






                  {/* <Slotmodal show={show} /> */}




                  <div className={`modal ${isFade ? 'fade' : ''}`} id="myModalexam">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Slots for Examination</h5>
                          <button type="button" className="btn-close" data-dismiss="modal" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                          <div className="table-responsive ">
                            <table className="table table-bordered table-accent">
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Time</th>
                                  <th>Available Seat</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  availableSlots && Array.isArray(availableSlots) ? availableSlots.map(slot => (
                                    <tr>
                                      <td>{dayjs(slot.dateofExam).format('DD-MM-YYYY')}</td>
                                      <td>{slot?.slotdatetime}</td>
                                      <td>{slot?.seatAvailable}</td>
                                    </tr>
                                  )) : null
                                }


                              </tbody>
                            </table>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
