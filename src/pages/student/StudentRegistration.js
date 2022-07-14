import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from '../school/ErrorList';
import { API_ADMIN_URL_2, REGISTER_API, API_BASE_URL, API_END_POINTS, API_BASE_JAVA_URL } from "../../apis/api";
export default function StudentRegistration() {

  const [mobileOTP, setmobileOTP] = useState([-1, -1, -1, -1]);
  const [mobileOTPValue, setMobileOTPValue] = useState("");
  const [error_message, setError_message] = useState('');
  const [errorList, setErrorList] = useState(Error);
  const [countryList, setCountryList] = useState([]);



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
  const generateOtp = async () => {
    let obj = {
      "add1": "string",
      "add2": "string",
      "city": "JAWA TIMUR",
      "country": "United Arab Emirates",
      "countryCode": "AE",
      "createdBy": "",
      "demoExam": "",
      "dob": "2022-01-01",
      "email": "harshy110@gmail.com",
      "examLevel": "",
      "examTheme": "",
      "gender": "",
      "mobile": "9312364889",
      "modifiedby": "",
      "name": "",
      "password": "",
      "pgEmail": "",
      "pgMobile": "",
      "pin": "",
      "rollNoPrefix": "AE22019999",
      "school": "string",
      "section": "string",
      "standard": "string",
      "state": "string",
      "state_city_cd": "string"
    }
    const otp = await axios.post(`${API_BASE_JAVA_URL}${API_END_POINTS.registerStudent}`, obj);
    if (otp?.data.status) {
      console.log(otp);
      // setMobileOTPValue(otp.data.otp);
    } else {
      //  error in generating otp
    }
  };





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
      setCityStateList([])

    }


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
      "password": date,
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

    const otp = await axios.post(`${API_BASE_JAVA_URL}${API_END_POINTS.registerStudent}`, obj);
    if (otp?.data.status) {
      console.log(otp);
      // setMobileOTPValue(otp.data.otp);
    } else {
      //  error in generating otp
    }
  }

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
    let arr = [country, state, name, mobile, date, email];
    let arrKey = ['country', 'state', 'name', 'mobile', 'date', 'email'];
    let err = '';
    arr.forEach((value, index) => {
      if (err === '') {
        err = formValidate({ 'key': arrKey[index], 'value': value });
      }
    });
    return err;
  };



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
        if (value.length < 1)
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
                      <label>Country</label>



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
                      <label>State/City</label>
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
                      <label>Name</label>
                      <input type="text" placeholder="name here" value={name} onChange={(e) => {
                        setName(e.target.value);
                      }}



                        name="name" required="" />
                    </div>
                  </div>
                  <div class=" col-sm">
                    <div class="form-wrapper">
                      <label>Date of Birth</label>
                      <input type="date" placeholder="choose date" value={date} onChange={(e) => {
                        setDate(e.target.value);
                      }}

                        name="dob" required="" />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Mobile</label>
                      <div class="d-flex">
                        <input type="text" class="me-3" placeholder="Mobile "
                          onChange={(e) => {

                            setMobile(e.target.value);
                            formValidate({ 'key': 'mobile', 'value': e.target.value });
                          }}

                          name="mobile" required="" />
                        <button class="otbutton flex-grow-1 btn btn-accent" style={{ whiteSpace: 'nowrap' }}>Generate OTP</button>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>Mobile OTP</label>
                      <div class=" d-flex justify-content-between">
                        <input type="number" class="me-3" maxlength="1" placeholder="" name="otp" required="" />
                        <input type="number" class="me-3" maxlength="1" placeholder="" name="otp" required="" />
                        <input type="number" class="me-3" maxlength="1" placeholder="" name="otp" required="" />
                        <input type="number" class="me-3" maxlength="1" placeholder="" name="otp" required="" />
                        <button class="otbutton btn btn-accent">Verify</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>E-Mail</label>
                      <div class="d-flex">
                        <input type="email" class="me-3" placeholder="Email" value={email} name="email"

                          onChange={(e) => {

                            setEmail(e.target.value);
                            formValidate({ 'key': 'email', 'value': e.target.value });
                          }}



                          required="" />
                        <button class="otbutton btn btn-accent" style={{ whiteSpace: 'nowrap' }}>Generate OTP</button>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="form-wrapper">
                      <label>E-Mail OTP</label>
                      <div class=" d-flex justify-content-between">
                        <input type="number" class="me-3" maxlength="1" placeholder="" name="eotp" required="" />
                        <input type="number" class="me-3" maxlength="1" placeholder="" name="eotp" required="" />
                        <input type="number" class="me-3" maxlength="1" placeholder="" name="eotp" required="" />
                        <input type="number" class="me-3" maxlength="1" placeholder="" name="eotp" required="" />
                        <button class="otbutton btn btn-accent">Verify</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4 mb-3">
                  <div class="d-flex flex-column flex-sm-row align-items-center justify-content-center">
                    <button class="btn btn-primary mx-2  mb-4 mb-sm-0" style={{ minWidth: '15rem' }} onClick={submitvalue} >Save &amp; Proceed</button>
                    <button class="btn btn-secondary mx-2 " style={{ minWidth: '10rem' }}>Cancel</button>
                  </div>

                </div>

                {error_message && (<div className="alert alert-danger w-100" role="alert">
                  {error_message}
                </div>)}


              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
