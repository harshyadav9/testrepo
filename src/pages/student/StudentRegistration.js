import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from '../school/ErrorList';
import { useNavigate } from "react-router";
import { API_ADMIN_URL_2, REGISTER_API, API_BASE_URL, API_END_POINTS, API_BASE_JAVA_URL } from "../../apis/api";
import { StudentDataContext } from "../context/datacontext";
export default function StudentRegistration() {


  const { dispatch } = useContext(StudentDataContext);
  const navigate = useNavigate();
  const [mobileOTP, setmobileOTP] = useState([-1, -1, -1, -1]);
  const [emailOTP, setemailOTP] = useState([-1, -1, -1, -1]);
  const [mobileOTPValue, setMobileOTPValue] = useState("");
  const [emailOTPValue, setEmailOTPValue] = useState("");
  const [error_message, setError_message] = useState('');
  const [errorList, setErrorList] = useState(Error);
  const [countryList, setCountryList] = useState([]);
  const [dateOriginal, setDateOriginal] = useState("");
  const [roll_no, setRoll_no] = useState("");



  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [state, setStateVal] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");


  const [stateCityName, setCityStateName] = useState('Select State');
  const [isIndain, setIsIndain] = useState(true);
  const [cityStateList, setCityStateList] = useState([]);
  const [data, setData] = useState("");

  const [mobileverify, setmobileverify] = useState(0);
  const [mobileVerMsg, setMobileVerMsg] = useState("");

  const [emailverify, setemailverify] = useState(0);
  const [emilVerMsg, setEmailVerMsg] = useState("");


  const [isFade, setIsfade] = useState(true);

  const [msgText, setMsgText] = useState("");


  const generateOtp = async () => {

    if (mobile !== "") {
      const otp = await axios.post(`${API_BASE_URL}${API_END_POINTS.generateOtp}`, { mobile: mobile });
      if (otp?.data.status) {
        setMobileOTPValue(otp.data.otp);
        setMsgText('Your otp has been send on your registered mobile number');
        document.getElementsByClassName('modal')[0].style.display = 'block';
      } else {
        setMsgText('Due to some reasons Your otp culd not be send on your registered email id');
        document.getElementsByClassName('modal')[0].style.display = 'block';
        //  error in generating otp
      }
    }

  }



  const handleChange = (a, k) => {
    setData((prevvalue) => { return { ...prevvalue, [k]: a } });
  };


  const sortCountryList = (list) => {

    return list.sort(function (a, b) {

      if (a.country < b.country) {
        return -1;
      }
      if (a.country > b.country) {
        return 1;
      }
      return 0;
    });
  };

  const changeCityState = (event) => {

    let countryData = JSON.parse(event.target.value);


    setCountry(event.target.value);
    if (countryData.countryCode !== "IN") {
      setIsIndain(false)
      setCityStateName('Select Provinced');
    } else {
      setIsIndain(true);
      setCityStateName('Select State');
    }
    getCityState(countryData.countryCode);

  };

  const getCityState = async (countryCode) => {
    const endPoint = countryCode === 'IN' ? API_END_POINTS.getIndianState : API_END_POINTS.getInternationalCities + `'${countryCode}'`
    const cityStateList = await axios.get(`${API_BASE_URL}${endPoint}`);
    //const cityStateList = await axios.get(`${endPoint}`);
    if (cityStateList.status === 200 && cityStateList.data.status) {
      let list = sortStateList(cityStateList.data.list);
      setCityStateList(list);
      // handleChange('', 'state');
    } else {
      setCityStateList([]);

    }


  }



  const closeModal = () => {
    document.getElementsByClassName('modal')[0].style.display = 'none';
  }



  const semdEmail = async () => {
    setIsfade(false);
    if (email !== "") {
      let regExp = RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
      if (regExp.test(email)) {
        const emailvalue = await axios.get(`${API_BASE_URL}${API_END_POINTS.sendEmailToCandidate}`, {
          //let response = await axios.get(`${API_BASE_JAVA_URL}${API_END_POINTS.getslots}`, {
          params: {
            email: `${email}`
          }
        });
        console.log("emailvalue", emailvalue);
        if (emailvalue?.data?.status) {
          setEmailOTPValue(emailvalue.data.otp);
          setMsgText('Your otp has been send on your registered email id');
          document.getElementsByClassName('modal')[0].style.display = 'block';

        } else {
          setMsgText('Due to either non validity of email id email could not be send on your registered email id');
          document.getElementsByClassName('modal')[0].style.display = 'block';
          setEmailOTPValue("")
        }
      }
    }



    // console.log("emailvalue", emailvalue);
  }


  const movetonext = () => {
    navigate("/student-edit-details");
    document.getElementsByClassName('modal')[0].style.display = 'none';
  }



  const handleCloseModal = () => {
    setIsfade(true);
  }


  const sortStateList = (list) => {

    return list.sort(function (a, b) {

      if (a.statename < b.statename) {
        return -1;
      }
      if (a.statename > b.statename) {
        return 1;
      }
      return 0;
    });
  }



  const submitvalue = async () => {

    let err = checkAllField();

    if (err)
      return err;


    if (isIndain) {
      if (mobileverify === 0) {
        setError_message('Please validate mobile otp');
        return;
      }
    }

    if (emailverify === 0) {
      setError_message('Please validate email otp');
      return;
    }


    console.log(country, state, name, mobile, date, email);

    let countryval = JSON.parse(country);
    let stateVal = JSON.parse(state);
    let statecode = stateVal.stateCode.length === 1 ? `0${stateVal.stateCode}` : stateVal.stateCode;
    let rollNoPrefix = `${countryval.countryCode}22${statecode}9999`;
    let obj = {
      "add1": "",
      "add2": "",
      "city": "",
      "country": countryval.countryname,
      "countryCode": countryval.countryCode,
      "createdBy": "",
      "demoExam": "",
      "dob": date,
      "email": email,
      "examLevel": "",
      "examTheme": "",
      "gender": "",
      "mobile": mobile,
      "modifiedby": "",
      "name": name,
      "password": mobile,
      "pgEmail": "",
      "pgMobile": "",
      "pin": "",
      "rollNoPrefix": rollNoPrefix,
      "school": "",
      "section": "",
      "standard": "",
      "state": stateVal.state,
      "state_city_cd": stateVal.stateCode
    }

    const reg_res = await axios.post(`${API_BASE_JAVA_URL}${API_END_POINTS.registerStudent}`, obj);
    if (reg_res?.status && reg_res?.data !== "") {
      console.log(reg_res?.data);
      setRoll_no(reg_res?.data);
      dispatch({
        type: 'ADD_ROLL_NO',
        roll_no: reg_res?.data
      });
      document.getElementsByClassName('modal')[0].style.display = 'block';
      // navigate("/student-edit-details");
      // setMobileOTPValue(otp.data.otp);
    }
  }


  const mobileOTPset = (ev, index) => {
    mobileOTP[index] = ev.target.value;

    setmobileOTP(mobileOTP);
  };


  const emailOTPset = (ev, index) => {
    emailOTP[index] = ev.target.value;

    setemailOTP(emailOTP);
  };









  const getCountry = async () => {
    const countryList = await axios.get(`${API_BASE_URL}${API_END_POINTS.getCountry}`);
    //const countryList = await axios.get(`${API_END_POINTS.getCountry}`);
    try {

      if (countryList?.status === 200 && countryList?.data?.status) {
        let list = sortCountryList(countryList.data.list);
        setCountryList(list);
      } else {
        setCountryList([]);

      }
    } catch (e) {
      console.log("error")
    }
  }




  useEffect(() => {
    getCountry()
  }, []);



  const checkAllField = () => {
    let arr = [country, state, name, date, mobile, email];
    let arrKey = ['country', 'state', 'name', 'date', 'mobile', 'email'];
    let err = '';
    arr.forEach((value, index) => {
      if (err === '') {
        err = formValidate({ 'key': arrKey[index], 'value': value });
      }
    });
    return err;
  };


  const otpMobileverifcation = () => {

    // document.getElementsByClassName('modal')[0].style.display = 'block';
    if (mobileOTP.join('') === mobileOTPValue) {
      setMobileVerMsg('Your mobile has been verified');
      setmobileverify(1);
    } else {
      setMobileVerMsg('Your mobile has not been verified');
      setmobileverify(0);
    }
  }



  const goToHome = () => {
    navigate("/");
  }

  const otpEmailVerifcation = () => {


    if (emailOTP.join('') === emailOTPValue) {
      setEmailVerMsg('Your email has been verified');
      setemailverify(1);
    } else {
      setEmailVerMsg('Your email has not been verified');
      setemailverify(0);
    }
  }





  const formValidate = (e) => {
    const { key, value } = e;
    let err = '';
    setError_message('');
    // mobileverify
    // emailverify

    switch (key) {
      case "country":
      case "state":
        if (value.length < 1)
          err = errorList.find(item => item.fieldNam === key).message;
        break;
      case "date":
        if (value === "" || value === undefined)
          err = errorList.find(item => item.fieldNam === key).message;
        break;
      case "name":
        if (value.length < 1)
          err = errorList.find(item => item.fieldNam === key).message;
        break;

      case "mobile":
        if (value.length < 1 && isIndain)
          err = (errorList.find(item => item.fieldNam === key).message);
        if (err === "") {
          let item = errorList.find(item => item.fieldNam === key);
          let regExp = RegExp(item.regex)
          err = (regExp.test(value) ? "" : item.message2);
        }
        break;
      case "email":
        if (value.length === 0)
          err = (errorList.find(item => item.fieldNam === key).message);
        if (err === '') {
          let item = errorList.find(item => item.fieldNam === key);
          let regExp = RegExp(item.regex)
          err = (regExp.test(value) ? "" : item.message2);
        }
        break;
      default:
        break;
    }
    setError_message(err)
    return err;
  };

  return (
    <div class="container-fluid ">
      <div class="row ">
        <div class="col-lg-10 mx-auto">
          <main class="p-3 p-sm-4 p-lg-5">
            <div class="section-title mb-4 text-muted">
              <h6 class="font-bold ">New Registration</h6>
              <p>Fill this form for registration</p>
            </div>

            <div class="shadow bg-light rounded-16">
              <div class="p-4 ">
                <div class="row">
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Country<span style={{ color: 'red' }}>*</span></label>



                      <select value={country} required onChange={changeCityState}>
                        <option value="volvo" id="country_id">Select Country</option>
                        {
                          countryList.map(co => {
                            return (
                              <option value={JSON.stringify({ countryCode: co?.code, countryname: co?.country })} key={co.code}>{co?.country}</option>)
                          })
                        }
                        {/* <option>Country</option>
                        <option value="India">India</option>
                        <option value="Japan">Japan</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Bhutan">Bhutan</option> */}
                      </select>
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>State/City<span style={{ color: 'red' }}>*</span></label>
                      <select
                        className="dropdown"
                        id="cars"
                        onChange={(e) => {
                          setStateVal(e.target.value);
                        }}

                        value={state || ""}
                      >

                        <option value="volvo">Select State/City</option>

                        {cityStateList && cityStateList.map(ci => {
                          return (
                            <option key={ci?.cityname || ci?.statename} value={JSON.stringify({ stateCode: ci?.srn || ci?.citycode, state: ci?.cityname || ci?.statename })}>{ci.cityname || ci?.statename}</option>)
                        })
                        }
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class=" col-sm">
                    <div class="form-wrapper">
                      <label>Name<span style={{ color: 'red' }}>*</span></label>
                      <input type="text" placeholder="" value={name} onChange={(e) => {
                        setName(e.target.value);
                      }}



                        name="name" required="" />
                    </div>
                  </div>
                  <div class=" col-sm">
                    <div class="form-wrapper">
                      <label>Date of Birth<span style={{ color: 'red' }}>*</span></label>
                      <input type="date" placeholder="" value={dateOriginal} onChange={(e) => {
                        let date = e.target.value.split("-").reverse().join('-');
                        setDate(date);
                        setDateOriginal(e.target.value);
                      }}

                        name="dob" required="" />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Mobile<span style={{ color: 'red' }}>*</span></label>
                      <div class="d-flex">
                        <input type="text" class="me-3" placeholder=""
                          onChange={(e) => {

                            setMobile(e.target.value);
                            formValidate({ 'key': 'mobile', 'value': e.target.value });
                          }}

                          name="mobile" required="" />
                        <button class="otbutton flex-grow-1 btn btn-accent" style={{ whiteSpace: 'nowrap' }} onClick={generateOtp}>Generate OTP</button>
                      </div>
                    </div>
                  </div>
                  {isIndain && (
                    <div class="col-sm">
                      <div class="form-wrapper">
                        <label>Mobile OTP<span style={{ color: 'red' }}>*</span></label>
                        <div class=" d-flex justify-content-between">
                          <input type="text" class="me-3" maxLength={1} placeholder="" onChange={(ev) => { mobileOTPset(ev, 0) }} name="otp" required="" />
                          <input type="text" class="me-3" maxLength={1} placeholder="" onChange={(ev) => { mobileOTPset(ev, 1) }} name="otp" required="" />
                          <input type="text" class="me-3" maxLength={1} placeholder="" onChange={(ev) => { mobileOTPset(ev, 2) }} name="otp" required="" />
                          <input type="text" class="me-3" maxLength={1} placeholder="" onChange={(ev) => { mobileOTPset(ev, 3) }} name="otp" required="" />
                          <button class="otbutton btn btn-accent" onClick={otpMobileverifcation}>Verify</button>
                        </div>
                        <div>
                          <h5>{mobileVerMsg}</h5>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                <div class="row">
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>E-Mail<span style={{ color: 'red' }}>*</span></label>
                      <div class="d-flex">
                        <input type="email" class="me-3" placeholder="" value={email} name="email"

                          onChange={(e) => {

                            setEmail(e.target.value);
                            formValidate({ 'key': 'email', 'value': e.target.value });
                          }}



                          required="" />
                        <button class="otbutton btn btn-accent" style={{ whiteSpace: 'nowrap' }} onClick={semdEmail}>Generate OTP</button>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>E-Mail OTP<span style={{ color: 'red' }}>*</span></label>
                      <div class=" d-flex justify-content-between">
                        <input type="text" class="me-3" maxLength={1} placeholder="" onChange={(ev) => { emailOTPset(ev, 0) }} name="eotp" required="" />
                        <input type="text" class="me-3" maxLength={1} placeholder="" onChange={(ev) => { emailOTPset(ev, 1) }} name="eotp" required="" />
                        <input type="text" class="me-3" maxLength={1} placeholder="" onChange={(ev) => { emailOTPset(ev, 2) }} name="eotp" required="" />
                        <input type="text" class="me-3" maxLength={1} placeholder="" onChange={(ev) => { emailOTPset(ev, 3) }} name="eotp" required="" />
                        <button class="otbutton btn btn-accent" onClick={otpEmailVerifcation}>Verify</button>
                      </div>
                      <div>
                        <h5>{emilVerMsg}</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4 mb-3">
                  <div class="d-flex flex-column flex-sm-row align-items-center justify-content-center">
                    <button class="btn btn-primary mx-2  mb-4 mb-sm-0" style={{ minWidth: '15rem' }} onClick={submitvalue} >Save &amp; Proceed</button>
                    <button class="btn btn-primary mx-2 " style={{ minWidth: '10rem' }} onClick={goToHome}>Cancel</button>
                  </div>
                  <div>
                    <h3>All fields marked with <span style={{ color: 'red' }}>*</span> are mandatory!!!</h3>
                  </div>

                </div>

                {error_message && (<div className="alert alert-danger w-100" role="alert">
                  {error_message}
                </div>)}
                {/* modal start */}

                <div className="modal" id="myModalexam">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      {/* <div className="modal-header">
                        <h5 className="modal-title">Slots for Examination</h5>
                        <button type="button" className="btn-close" data-dismiss="modal">wqwqwq</button>
                      </div> */}

                      {(msgText.length > 0 && roll_no.length === 0) && (
                        <>
                          <div className="modal-body">
                            <div className="table-responsive ">
                              <h3>{msgText}</h3>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={closeModal}>Ok</button>
                          </div>
                        </>
                      )}

                      {roll_no.length > 0 && (
                        <>
                          <div className="modal-body">
                            <div className="table-responsive ">
                              <div className="table-responsive ">
                                <h3>Registration number is {roll_no} and password is {mobile}</h3>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={movetonext}>Ok</button>
                          </div>
                        </>
                      )}





                    </div>
                  </div>
                </div>
                {/* modal end */}

              </div>


            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
