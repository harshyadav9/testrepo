import React, { useContext } from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../../assets/css/style_new.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Error from './ErrorList';
import { API_ADMIN_URL_2, REGISTER_API, API_BASE_URL, API_END_POINTS } from "../../apis/api";
import { StudentDataContext } from "../context/datacontext";
import { notify } from "../../Utills";
export default function SchoolRegistration({ isLogged }) {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(StudentDataContext);
  const [principalName, setprincipalName] = useState("");
  const [schoolName, setschoolName] = useState("");
  const [schoolcode, setSchoolcode] = useState("");
  const [pinCode, setpinCode] = useState("");
  const [mobile, setmobile] = useState("");
  const [country, setcountry] = useState("");
  const [email, setemail] = useState("");
  // const [state, setstate] = useState("");
  const [mobileverify, setmobileverify] = useState();
  const [emailverify, setemailverify] = useState();

  const [mobileVerMsg, setMobileVerMsg] = useState("");
  const [emailVerMsg, setEmailVerMsg] = useState("");

  const [mobileOTP, setmobileOTP] = useState([-1, -1, -1, -1]);

  const [mobileOTPValue, setMobileOTPValue] = useState("");
  const [emailOTP, setemailOTP] = useState([-1, -1, -1, -1]);
  const [error_message, setError_message] = useState('');
  const [RegisterationClicked, setRegisterationClicked] = useState(0);

  const [userRegistered, setUserRegistered] = useState(false);
  const [data, setData] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateCityName, setCityStateName] = useState('Select State/Province');
  const [cityStateList, setCityStateList] = useState([]);

  const [isIndain, setIsIndain] = useState(true);
  const [searchPin, setSearchpinCode] = useState('');
  const [cityState, setStateCity] = useState('');
  const [existingSchool, setExistingSchool] = useState([]);
  const [schoolDetail, setSchoolDetail] = useState(null);
  const [stateCityCode, setCityStateCode] = useState('');
  const [secondStateCity, setSeconStateCity] = useState([]);
  const [errorList, setErrorList] = useState(Error)
  const countryRef = useRef(null);

  const [searchcountry, setSearchCountry] = useState("");
  const [searchstate, setSearchState] = useState("");
  const [searchStateList, setSearchStateList] = useState([]);
  const [searchCountryList, setSearchCountryList] = useState([]);

  const [msgText, setMsgText] = useState("");
  const [emailOTPValue, setEmailOTPValue] = useState("");

  const [address, setAddress] = useState('');
  const handleChange = (a, k) => {
    setData((prevvalue) => { return { ...prevvalue, [k]: a } });
  };


  const formValidate = (e) => {
    const { key, value } = e;
    let err = '';
    setError_message('');
    // mobileverify
    // emailverify

    switch (key) {
      case "schoolName":
      case "principalName":
      case "country":
      case "state":
        if (value.length < 1)
          err = (errorList.find(item => item.fieldNam === key).message);
        break;
      case "mobile":

        // if (value.length < 1) {
        //   err = (errorList.find(item => item.fieldNam === key).message);

        // }
        // if (err === "") {
        //   let item = errorList.find(item => item.fieldNam === key);
        //   let regExp = RegExp(item.regex)
        //   err = (regExp.test(value) ? "" : item.message2);
        // }

        // if (isIndain) {
        if (value.length < 1)
          err = (errorList.find(item => item.fieldNam === key).message);
        if (err === "" && isIndain) {
          let item = errorList.find(item => item.fieldNam === key);
          let regExp = RegExp(item.regex)
          err = (regExp.test(value) ? "" : item.message2);
        }
        // }
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
      case "pinCode":
        if (value.length === 0 && isIndain) {
          err = (errorList.find(item => item.fieldNam === key).message);
        }
        if (err === "" && isIndain) {
          if (("" + (value) === '000000') || (value.length !== 6)) {
            err = (errorList.find(item => item.fieldNam === key).message);
          }
        }



        // if (value.length !== 6) {
        // let item = errorList.find(item => item.fieldNam === key);
        // let regExp = RegExp(item.regex)
        // err = regExp.test(value) ? "" : item.message2;
        // }


        break;
      default:
        break;
    }
    setError_message(err)
    return err;
  };



  const checkAllField = () => {
    let arr = [schoolName, principalName, pinCode, mobile, email];
    let arrKey = ['schoolName', 'principalName', 'pinCode', 'mobile', 'email'];
    let err = '';
    arr.forEach((value, index) => {
      if (err === '') {
        err = formValidate({ 'key': arrKey[index], 'value': value });
      }

    })
    // if (err === '' && !mobileverify) {
    //   err = 'Please verify mobile OTP'
    //   setError_message(err);
    // }
    if (err === '' && !emailverify) {
      err = 'Please verify Email OTP'
      setError_message(err);
    }

    return err;
  };


  const otpMobileverifcation = () => {



    console.log("emailOTP", emailOTP);
    if (mobileOTP.join('') === mobileOTPValue) {
      // if (mobileOTP.join('') === '4444') {
      setMobileVerMsg('Your mobile has been verified');
      setmobileverify(1);
    } else {
      setMobileVerMsg('Your mobile has not been verified');
      setmobileverify(0);
    }
  }



  // const otpEmailverifcation = () => {

  //   console.log("mobileOTP", mobileOTP);
  //   if (emailOTP.join('') === '4444') {
  //     setEmailVerMsg('Your email has been verified');
  //     setemailverify(1);
  //   } else {
  //     setEmailVerMsg('Your email has not been verified');
  //     setemailverify(0);
  //   }
  // }


  const mobileOTPset = (ev, index) => {
    mobileOTP[index] = ev.target.value;
    // let res = mobileOTP.includes(-1);
    // if (!res) {
    //   // match with OTP
    //   if (mobileOTP.join('') === '4444') {
    //     // alert();
    //     setmobileverify(1);
    //   }
    //   else
    //     setmobileverify(0)
    //   console.log(mobileOTP);
    // }
    setmobileOTP(mobileOTP);
  };


  // const emailOTPset = (ev, index) => {
  //   emailOTP[index] = ev.target.value;
  //   let res = emailOTP.includes(-1);
  //   if (!res) {
  //     // match with OTP
  //     if (emailOTP.join('') === '4444') {
  //       // alert();
  //       setemailverify(1);
  //     }
  //     else
  //       setemailverify(0)
  //     console.log(emailOTP);
  //     setemailOTP(emailOTP);
  //   }
  // }


  const emailOTPset = (ev, index) => {
    emailOTP[index] = ev.target.value;

    setemailOTP(emailOTP);
  };

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


  const sortSchoolList = (list) => {

    return list.sort(function (a, b) {

      if (a.schoolName < b.schoolName) {
        return -1;
      }
      if (a.schoolName > b.schoolName) {
        return 1;
      }
      return 0;
    });
  }



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
  }


  const generateOtp = async () => {
    if (mobile !== "") {
      const otp = await axios.post(`${API_BASE_URL}${API_END_POINTS.generateOtp}`, { mobile: mobile });
      if (otp?.data.status) {
        setMobileOTPValue(otp.data.otp);
        setMsgText('OTP has been sent on your registered mobile number');
        document.getElementsByClassName('modal')[0].style.display = 'block';
      } else {
        //  error in generating otp
        setMsgText('Due to some reasons Your OTP culd not be send on your registered email id');
        document.getElementsByClassName('modal')[0].style.display = 'block';
      }
    }

  }

  // console.log("Error",Error)

  const firstTimeload = async () => {
    const countryList = await axios.get(`${API_BASE_URL}${API_END_POINTS.getCountry}`);
    //const countryList = await axios.get(`${API_END_POINTS.getCountry}`);
    try {

      if (countryList?.status == 200 && countryList?.data?.status) {
        let list = sortCountryList(countryList.data.list);
        //  fill country 
        setCountryList(list);
        setSearchCountryList(list);


        setSearchCountry('IN');

        setIsIndain(true);

        setCityStateName('Select State/Province');
        setData({ "country": 'IN', "state": "" });


        //  state 
        getCityState("IN");
        getCitySearchState('IN');

      } else {
        setCountryList([]);
        setSearchCountryList([]);
      }
    } catch (e) {
      console.log("error")
    }
  }


  const getCountry = async () => {
    const countryList = await axios.get(`${API_BASE_URL}${API_END_POINTS.getCountry}`);
    //const countryList = await axios.get(`${API_END_POINTS.getCountry}`);
    try {

      if (countryList?.status == 200 && countryList?.data?.status) {
        let list = sortCountryList(countryList.data.list);
        setCountryList(list);
        // setSearchCountry('IN');
        // setIsIndain(true);
        // setCityStateName('Select State');
        // setData({ "country": 'IN', "state": "" });
        // getCityState('IN');
      } else {
        setCountryList([]);

      }
    } catch (e) {
      console.log("error")
    }
  }
  useEffect(() => {
    firstTimeload();
    // getCountry();
  }, []);

  const RegisterationApi = async (e) => {
    setRegisterationClicked(1);

    if ((data.country === undefined) || (data.country === 'volvo')) {
      setError_message('Please fill Country');
      return;
    }
    if ((data.state === undefined) || (data.state === 'volvo') || (data.state === "")) {
      setError_message('Please fill State');
      return;
    }
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
    const country_ = countryList.find(co => co.code === data.country) ?? { country: "India" };
    const statecityCode = cityStateList.find(state => {
      if (country_.code === "IN") {
        return state.statename === data.state
      } else {
        return data.state?.toLowerCase() === state?.cityname.toLowerCase()
      }
    })

    const RegisterationOptions = {
      principalname: principalName,
      schoolname: schoolName,
      pincode: pinCode,
      mobile: mobile,
      email: email,
      country: country_.country,
      state: data.state,
      mobileverify: mobileverify ?? false,
      emailverify: emailverify ?? false,
      isLocal: isIndain,
      stateCityCode: stateCityCode ? stateCityCode : country_.code === "IN" ? statecityCode?.srn : statecityCode?.citycode,
      countryCode: data.country,
      address: address || ""
    };
    axios
      .post(`${API_BASE_URL}${API_END_POINTS?.saveNewSchool}`, RegisterationOptions)
      // console.log("RegisterationOptions",)
      //.post(`${API_END_POINTS?.saveNewSchool}`, RegisterationOptions)
      .then((res) => {

        if (res.data) {
          setSchoolcode(res.data.data);
          dispatch({
            type: 'ADDINFO_REGISTER',
            school_code: res.data.data,
            schoolname: RegisterationOptions.schoolname,
            country: RegisterationOptions.country,
            state: RegisterationOptions.state,
            pincode: RegisterationOptions.pincode,
            phonestd: '',
            mobile: RegisterationOptions.mobile,
            principal_name: RegisterationOptions.principalname,
            email: RegisterationOptions.email,
            district: '',
            mode: 'ONLINE',
            postal_address: RegisterationOptions.address
          });

          setMsgText("");
          document.getElementsByClassName('modal')[0].style.display = 'block';
          // setTimeout(() => {
          //   navigate("/school-edit-details");
          // }, 2000);


          // notify(`School has been registered successfully!.`, true);

          sendConfirmationMail(RegisterationOptions, res)

          // localStorage.setItem("PrincipalName", principalName);
          // localStorage.setItem("PrincipalMobile", mobile);
          // localStorage.setItem("PrincipalEmail", email);




        } else {
          alert("something is rong");
        }
      })
      .catch((error) => {
        console.log(error);
        document.getElementsByClassName('modal')[0].style.display = 'block';
        setMsgText(error.response.data.message);
        setUserRegistered(false);
      });
  };
  // sendconfirmationToStudent


  const sendConfirmationMail = async (RegisterationOptions, res) => {
    setUserRegistered(true);
    await axios.post(`${API_BASE_URL}${API_END_POINTS.sendEmail}`, {
      roll_no: res.data.data, pass: RegisterationOptions.mobile, textheader: 'SCHOOL  CODE :', email: RegisterationOptions.email
    });

    await axios.post(`${API_BASE_URL}${API_END_POINTS.sendconfirmationToStudent}`, {
      login_id: res.data.data, password: RegisterationOptions.mobile, mobile: RegisterationOptions.mobile
    });

  }

  const semdEmail = async () => {
    // setIsfade(false);
    if (email !== "") {
      let regExp = RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
      if (regExp.test(email)) {
        const emailvalue = await axios.get(`${API_BASE_URL}${API_END_POINTS.sendEmailToCandidate}`, {
          //let response = await axios.get(`${API_BASE_JAVA_URL}${API_END_POINTS.getslots}`, {
          params: {
            email: `${email}`,
            email_header: 'New User'
          }
        });
        console.log("emailvalue", emailvalue);
        if (emailvalue?.data?.status) {
          setEmailOTPValue(emailvalue.data.otp);
          setMsgText('OTP has been sent on your registered email id');
          document.getElementsByClassName('modal')[0].style.display = 'block';

        } else {
          setMsgText('Due to either non validity of email id email could not be send on your registered email id');
          document.getElementsByClassName('modal')[0].style.display = 'block';
          setEmailOTPValue("")
        }
      }
    }

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



  const getCitySearchState = async (countryCode) => {
    const endPoint = countryCode === 'IN' ? API_END_POINTS.getIndianState : API_END_POINTS.getInternationalCities + `'${countryCode}'`
    const cityStateList = await axios.get(`${API_BASE_URL}${endPoint}`);
    //const cityStateList = await axios.get(`${endPoint}`);
    if (cityStateList.status === 200 && cityStateList.data.status) {
      let list = sortStateList(cityStateList.data.list);
      // setCityStateList(list);
      setSearchStateList(list);
      // handleChange('', 'state');
    } else {
      setSearchStateList([]);
      // setCityStateList([]);

    }


  }


  const getCityState = async (countryCode) => {
    const endPoint = countryCode === 'IN' ? API_END_POINTS.getIndianState : API_END_POINTS.getInternationalCities + `'${countryCode}'`
    const cityStateList = await axios.get(`${API_BASE_URL}${endPoint}`);
    //const cityStateList = await axios.get(`${endPoint}`);
    if (cityStateList.status === 200 && cityStateList.data.status) {
      let list = sortStateList(cityStateList.data.list);
      setCityStateList(list);
      // setSearchStateList(list);
      // handleChange('', 'state');
    } else {
      setCityStateList([]);

    }


  }

  const closeModal = () => {
    document.getElementsByClassName('modal')[0].style.display = 'none';
  }


  const movetonext = () => {
    isLogged(true);
    navigate("/school-edit-details");
    document.getElementsByClassName('modal')[0].style.display = 'none';
  }


  //  when search country is changed
  const changeSearchCountry = (event) => {
    if (event.target.value !== "IN") {
      setIsIndain(false);
      setCityStateName('Select State/Province')
    } else {
      setIsIndain(true)
      setCityStateName('Select State/Province')
    }
    setSearchCountry(event.target.value);
    getCitySearchState(event.target.value);
    // getCityState(event.target.value)

  }
  const findSchools = async () => {
    if (isIndain) {
      let serverData = {
        "state": cityState,
        "pincode": searchPin
      }
      const data = await axios.post(`${API_BASE_URL}${API_END_POINTS.getIndainSchools}`, serverData);
      //const data = await axios.post(`${API_END_POINTS.getIndainSchools}`, serverData);
      if (data.status === 200 && data.data.status) {
        let list = sortSchoolList(data.data.list);
        setExistingSchool(list);
      } else {
        setExistingSchool([])
      }
    } else {
      let serverData = {
        "city": cityState,
        "pincode": searchPin
      }
      const data = await axios.post(`${API_BASE_URL}${API_END_POINTS.getInternationalSchools}`, serverData);
      //const data = await axios.post(`${API_END_POINTS.getInternationalSchools}`, serverData);
      if (data.status === 200 && data.data.status) {
        setExistingSchool(data.data.list)
      } else {
        setExistingSchool([])
      }
      // internation schools search api //getInternationalSchools

    }
    // setData({ "country": searchcountry, "state": JSON.parse(searchstate).stateCity });
    // setpinCode(searchPin);
  }
  const getSchoolDetail = async (event) => {
    const schoolChangeValue = JSON.parse(event.target.value);
    const schoolcode = schoolChangeValue.schoolcode;
    setAddress(schoolChangeValue.address);
    const serverData = {
      schoolscode: schoolcode,
      isLocal: isIndain
    }

    if (event.target.value === 'volvo') {
      setpinCode("");
      setschoolName("");
      console.log("searchstate", searchstate);
      // setSearchCountry('IN');
      // setIsIndain(true);

      // setCityStateName('Select State');
      // setData({ "country": searchcountry, "state": JSON.parse(searchstate).stateCity });
      // getCityState('IN');
      return;
    } else {
      const responseData = await axios.post(`${API_BASE_URL}${API_END_POINTS.getSchoolDetail}`, serverData);
      //const responseData = await axios.post(`${API_END_POINTS.getSchoolDetail}`, serverData);
      if (responseData.status === 200 && responseData.data.status) {
        const schoolDetail = responseData.data.schoolDetail;
        // getCityState(event.target.value)

        setSchoolDetail(responseData.data.schoolDetail);

        //  indian school
        if (isIndain) {
          let perData = data;
          let newData = {
            ...perData,
            ... {
              'country': "IN",
              "state": schoolDetail?.state,

            }
          }
          await getCityState("IN");
          await getCitySearchState("IN");
          setData(newData)
        }
        //  international school
        else {
          let perData = data;
          let contryCode = countryList.find(co => co?.country?.toLowerCase() === schoolDetail?.country?.toLowerCase())
          let newData = {
            ...perData,
            ... {
              'country': contryCode.code,
              "state": schoolDetail?.city
            }
          }
          await getCityState(contryCode.code);
          await getCitySearchState(contryCode.code);
          setData(newData)
        }
        setpinCode(schoolDetail?.pincode)
        setschoolName(schoolDetail?.schoolName)
      } else {
        setExistingSchool(null)
      }
    }

  }

  const setSecondState = (code) => {
    if (code !== "IN") {
      setIsIndain(false)
      setCityStateName('Select State/Province');
    } else {
      setIsIndain(true);
      setCityStateName('Select State/Province');
    }
    getCityState(code)
  }
  return (
    // <div className="container-login">
    //   <marquee> Welcome to Green Olympiad</marquee>

    //   <div className="top-label-section">
    //     <select className="dropdown" id="cars" onChange={changeCityState}>
    //       <option value="volvo" >Select Country</option>
    //       {
    //         countryList.map(co => {
    //           return (
    //             <option value={co.code} key={co.code}>{co?.country}</option>)
    //         })
    //       }
    //     </select>


    // <select className="dropdown" id="cars" onChange={e => {
    //   setStateCity(JSON.parse(e.target.value).stateCity);
    //   setCityStateCode(JSON.parse(e.target.value).code)
    // }}>
    //   <option value="">{stateCityName}</option>
    //   {cityStateList && cityStateList.map(ci => {
    //     return (
    //       <option key={ci?.cityname || ci?.statename} value={JSON.stringify({ stateCity: ci?.cityname || ci?.statename, code: ci?.srn || ci?.citycode })}>{ci?.cityname || ci?.statename}</option>)
    //   })
    //   }
    // </select>

    // done >>>>

    //     <input
    //       className="top-index"
    //       type="text"
    //       placeholder="Pin code"
    //       name="uname"
    //       // required
    //       style={{ width: 170 }}
    //       onChange={e => setSearchpinCode(e.target.value)}
    //     />


    //  done>>
    //     <button className="searchbtn" style={{ marginTop: 5 }} onClick={findSchools}>
    //       Search school
    //     </button>
    //   </div>
    //   <div className="dropdown-school-section">
    //     <select className="dropdown-school" id="cars" onChange={getSchoolDetail} >
    //       {
    //         existingSchool && existingSchool.map(school => {
    //           return (
    //             <option value={school?.schoolcode} key={school?.schoolcode}>{school?.schoolName}</option>
    //           )
    //         })
    //       }
    //       <option value="volvo">Other (When Enter Your College)</option>
    //     </select>
    //   </div>
    //   <div className="container-inner-area">
    //     <div className="form-card">
    //       <div className="imgcontainer">
    //         <h2>School Registration</h2>
    //       </div>

    //       <div className="">
    //         <label>Select Country:</label>
    //         <select
    //           className="dropdown"
    //           id="cars"
    //           value={data.country || ""}
    //           default={data.country || ""}
    //           selected={data.country}

    //           onChange={(e) => {
    //             handleChange(e.target.value, "country");
    //             setSecondState(e.target.value)
    //           }}
    //         >
    //           <option value="volvo">Select Country</option>
    //           {
    //             countryList.map(co => {
    //               return (
    //                 <option value={co.code} key={co.code}>{co?.country}</option>)
    //             })
    //           }

    //         </select>
    //         <br />
    //         <label>Select State:</label>
    //         <select
    //           className="dropdown"
    //           id="cars"
    //           value={data.state || ""}
    //           onChange={(e) => {
    //             handleChange(e.target.value, "state");
    //           }}
    //         >
    //           <option value="volvo">Select State/City</option>

    //           {cityStateList && cityStateList.map(ci => {
    //             return (
    //               <option key={ci?.cityname || ci?.statename} value={ci?.cityname || ci?.statename}>{ci.cityname || ci?.statename}</option>)
    //           })
    //           }
    //         </select>


    //         <br />
    //         <label>Principal Name:</label>
    //         <input
    //           type="text"
    //           placeholder="Principal name here"
    //           name="uname"
    //           required
    //           onChange={(principalName) =>
    //             setprincipalName(principalName.target.value)
    //           }
    //         />
    //         <br />
    //         <label>Scool Name:</label>
    //         <input
    //           type="text"
    //           placeholder="Scool name here"
    //           name="uname"
    //           required
    //           onChange={(schoolName) => setschoolName(schoolName.target.value)}
    //           value={schoolName}
    //         />
    //         <br />
    //         <label>Pin code:</label>
    //         <input
    //           type="text"
    //           placeholder="Enter Pin code"
    //           name="psw"
    //           required
    //           onChange={(pinCode) => setpinCode(pinCode.target.value)}
    //           value={pinCode}
    //         />
    //         <br />
    //         <label>Mobile:</label>
    //         <input
    //           type="text"
    //           placeholder="Mobile (Principal/Teacher)"
    //           name="psw"
    //           required
    //           onChange={(mobile) => setmobile(mobile.target.value)}
    //         />
    //         <br />
    //         <button className="otpbutton" style={{ marginLeft: 120 }}>
    //           Generate OTP
    //         </button>

    //         <div
    //           style={{ marginLeft: 65 }}
    //           className=" d-flex justify-content-center"
    //         >
    //           <label style={{ marginRight: 64 }}>Mobile OTP:</label>
    //           <input
    //             type="otp"
    //             maxlength="1"
    //             placeholder=""
    //             name="psw"
    //             required
    //             placeholder-type="number"
    //             onChange={(mobileverify) =>
    //               setmobileverify(mobileverify.target.value)
    //             }
    //           />
    //           <input
    //             type="otp"
    //             maxlength="1"
    //             placeholder=""
    //             name="psw"
    //             required
    //           />
    //           <input
    //             type="otp"
    //             maxlength="1"
    //             placeholder=""
    //             name="psw"
    //             required
    //           />
    //           <input
    //             type="otp"
    //             maxlength="1"
    //             placeholder=""
    //             name="psw"
    //             required
    //           />
    //           <button className="otpbutton">Verify</button>
    //         </div>

    //         <label>E-Mail:</label>
    //         <input
    //           type="text"
    //           placeholder="E-mail (Principal/Teacher)"
    //           name="psw"
    //           required
    //           onChange={(email) => setemail(email.target.value)}
    //         />
    //         <br />
    //         <button className="otpbutton" style={{ marginLeft: 120 }}>
    //           Generate OTP
    //         </button>
    //         <div
    //           style={{ marginLeft: 65 }}
    //           className=" d-flex justify-content-center"
    //         >
    //           <label style={{ marginRight: 64 }}>E-Mail OTP:</label>
    //           <input
    //             type="otp"
    //             maxlength="1"
    //             placeholder=""
    //             name="psw"
    //             required
    //             onChange={(emailverify) =>
    //               setemailverify(emailverify.target.value)
    //             }
    //           />
    //           <input
    //             type="otp"
    //             maxlength="1"
    //             placeholder=""
    //             name="psw"
    //             required
    //           />
    //           <input
    //             type="otp"
    //             maxlength="1"
    //             placeholder=""
    //             name="psw"
    //             required
    //           />
    //           <input
    //             type="otp"
    //             maxlength="1"
    //             placeholder=""
    //             name="psw"
    //             required
    //           />
    //           <button className="otpbutton">Verify</button>
    //         </div>
    //         <div>
    //           <button className="main-btn" onClick={RegisterationApi}>
    //             Registration
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>


    // code new start 
    <div className="container-fluid p-0 bg-left">
      <div className="row ">
        <div className="col-lg-7 mx-auto">
          <main className="p-3 p-sm-4 p-lg-5">
            <div className="section-title mb-4 text-muted">
              <h6 className="font-bold ">School Registration</h6>
              {/* <p>Fill this form for registration</p> */}
            </div>

            <div className="shadow mb-5 rounded-16">
              <div className="p-4">
                <div className="row">
                  <div className="col-sm ">
                    <div className="form-wrapper ">
                      <label>Country:</label>
                      <select required value={searchcountry} onChange={changeSearchCountry}>
                        <option value="volvo" id="country_id">Select Country</option>
                        {
                          searchCountryList.map(co => {
                            return (
                              <option value={co.code} key={co.code}>{co?.country}</option>)
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
                  <div className="col-sm ">
                    <div className="form-wrapper ">
                      <label>State/Province:</label>
                      <select className="dropdown" id="cars" value={searchstate} onChange={e => {
                        setSearchState(e.target.value);
                        setStateCity(JSON.parse(e.target.value).stateCity);
                        setCityStateCode(JSON.parse(e.target.value).code);
                      }}>
                        <option value="">{stateCityName}</option>
                        {searchStateList && searchStateList.map(ci => {
                          return (
                            <option key={ci?.cityname || ci?.statename} value={JSON.stringify({ stateCity: ci?.cityname || ci?.statename, code: ci?.srn || ci?.citycode })}>{ci?.cityname || ci?.statename}</option>)
                        })
                        }
                      </select>

                      {/* <select required>
                        <option>State</option>
                        <option value="up">Uttar Pradesh</option>
                        <option value="mp">Madhya Pradesh</option>
                        <option value="goa">Goa</option>
                        <option value="uk">Uttrakhand</option>
                      </select> */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm ">
                    <div className="form-wrapper ">

                      {/* <input type="number" placeholder="Pin code" required="" /> */}
                      <label>Pin Code:</label>
                      <input

                        type="text"
                        placeholder=""
                        name="uname"
                        // required

                        onChange={e => setSearchpinCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm">
                    <button className="searchbtn btn btn-primary w-100" onClick={findSchools}>Search school</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-wrapper ">
                      {/* <select>
                        <option value="school-1">School 1</option>
                        <option value="school-2">School 2</option>
                        <option value="school-3">School 4</option>
                      </select> */}


                      <select className="dropdown-school" id="cars" onChange={getSchoolDetail} >
                        {
                          existingSchool && existingSchool.map(school => {
                            return (
                              // <option value={school?.schoolcode} key={school?.schoolcode}>{school?.schoolName}/{school?.address}</option>
                              <option value={JSON.stringify(school)} key={school?.schoolcode}>{school?.schoolName}/{school?.address}</option>
                            )
                          })
                        }
                        <option value="volvo">Others</option>
                      </select>
                    </div>
                    <div>
                      <h3><span style={{ color: 'red' }}>*</span>If you do not find your school, please choose 'Other' and then the required details</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="shadow bg-light rounded-16">
              <div className="p-4 ">


                <div className="row">
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>Country:<span style={{ color: 'red' }}>*</span></label>
                      {/* <select className="dropdown" id="cars">
                        <option value="volvo">Country</option>
                        <option value="volvo">India</option>
                        <option value="saab">Japan</option>
                        <option value="opel">Nepal</option>
                        <option value="audi">Bhutan</option>
                      </select> */}

                      <select
                        className="dropdown"
                        id="cars"
                        value={data.country || ""}
                        default={data.country || ""}
                        selected={data.country}

                        onChange={(e) => {
                          setData((prevalue) => { return { "country": e.target.value, "state": "" } });
                          // handleChange(e.target.value, "country");
                          setSecondState(e.target.value);
                          formValidate({ 'key': 'country', 'value': e.target.value });
                        }}
                      >
                        <option value="volvo">Select Country</option>
                        {
                          countryList.map(co => {
                            return (
                              <option value={co.code} key={co.code}>{co?.country}</option>)
                          })
                        }

                      </select>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>State/Province:<span style={{ color: 'red' }}>*</span></label>
                      {/* <select className="dropdown" id="cars">
                        <option value="volvo">State</option>
                        <option value="volvo">Uttar Pradesh</option>
                        <option value="saab">Madhya Pradesh</option>
                        <option value="opel">Goa</option>
                        <option value="audi">Uttrakhand</option>
                      </select> */}
                      <select
                        className="dropdown"
                        id="cars"
                        value={data.state || ""}
                        onChange={(e) => {
                          handleChange(e.target.value, "state");
                          formValidate({ 'key': 'state', 'value': e.target.value });
                        }}
                      >
                        <option value="volvo">Select State/Province</option>

                        {cityStateList && cityStateList.map(ci => {
                          return (
                            <option key={ci?.cityname || ci?.statename} value={ci?.cityname || ci?.statename}>{ci.cityname || ci?.statename}</option>)
                        })
                        }
                      </select>
                    </div>
                  </div>



                </div>

                <div className="row">
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>School Name:<span style={{ color: 'red' }}>*</span></label>
                      <input type="text" placeholder="" name="uname" value={schoolName} required={true}
                        onChange={(schoolName) => {
                          setschoolName(schoolName.target.value);
                          formValidate({ 'key': 'schoolName', 'value': schoolName.target.value })
                        }}
                      />
                    </div>

                  </div>
                </div>

                <div className="row">
                  <div className=" col-sm">
                    <div className="form-wrapper">
                      <label>Principal Name:<span style={{ color: 'red' }}>*</span></label>
                      {/* <input type="text" placeholder="Principal name here" name="uname" required="" /> */}
                      <input
                        type="text"
                        placeholder=""
                        name="uname"
                        required
                        onChange={(principalName) => {
                          setprincipalName(principalName.target.value);
                          formValidate({ 'key': 'principalName', 'value': principalName.target.value })
                        }
                        }
                      />
                    </div>
                  </div>
                  <div className=" col-sm">
                    <div className="form-wrapper">
                      <label>Pin code:<span style={{ color: 'red' }}>*</span></label>
                      {/* <input type="text" placeholder="Enter Pin code" name="psw" required="" /> */}
                      <input
                        type="number"
                        placeholder=""
                        name="psw"
                        required
                        onChange={(pinCode) => {
                          setpinCode(pinCode.target.value);
                          formValidate({ 'key': 'pinCode', 'value': pinCode.target.value })
                        }}
                        value={pinCode}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="row">
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>School Name:<span style={{ color: 'red' }}>*</span></label>
                      <input type="text" placeholder="School name here" name="uname" value={schoolName} required={true}
                        onChange={(schoolName) => {
                          setschoolName(schoolName.target.value);
                          formValidate({ 'key': 'schoolName', 'value': schoolName.target.value })
                        }}
                      />
                    </div>

                  </div>
                </div>
 */}


                <div className="row">
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>Mobile:<span style={{ color: 'red' }}>*</span></label>
                      <div className="d-flex">
                        {/* <input type="text" className="me-3" placeholder="Mobile (Principal/Teacher)" name="psw" required="" /> */}
                        <input
                          type="text"
                          maxLength={10}
                          className="me-3"
                          placeholder=""
                          name="psw"
                          required={true}
                          onChange={(mobile) => {
                            setmobile(mobile.target.value);
                            formValidate({ 'key': 'mobile', 'value': mobile.target.value });
                          }}
                        />

                        {isIndain && (
                          <button className="otbutton flex-grow-1 btn btn-accent" style={{ whiteSpace: 'nowrap' }} onClick={generateOtp}>Generate OTP</button>
                        )}


                      </div>
                    </div>
                  </div>



                  {isIndain && (
                    <div className="col-sm">
                      <div className="form-wrapper">
                        <label>Mobile OTP:<span style={{ color: 'red' }}>*</span></label>
                        <div className=" d-flex justify-content-between">
                          <input type="text" className="me-3 pw1" maxLength={1} onChange={(ev) => { mobileOTPset(ev, 0) }} name="psw0" placeholder-type="number" />
                          <input type="text" className="me-3 pw2" maxLength={1} onChange={(ev) => { mobileOTPset(ev, 1) }} name="psw1" />
                          <input type="text" className="me-3 pw3" maxLength={1} onChange={(ev) => { mobileOTPset(ev, 2) }} name="psw2" />
                          <input type="text" className="me-3 pw4" maxLength={1} onChange={(ev) => { mobileOTPset(ev, 3) }} name="psw3" />

                          <button className="otbutton btn btn-accent" onClick={otpMobileverifcation}>Verify</button>
                        </div>
                        <div>
                          <h5>{mobileVerMsg}</h5>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="row">
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>E-Mail:<span style={{ color: 'red' }}>*</span></label>
                      <div className="d-flex">
                        {/* <input type="text" className="me-3" placeholder="Mobile (Principal/Teacher)" name="psw" required="" /> */}
                        <input
                          type="text"
                          placeholder=""
                          name="psw"
                          required
                          onChange={(email) => {
                            setemail(email.target.value.toLowerCase());
                            formValidate({ 'key': 'email', 'value': email.target.value.toLowerCase() })
                          }}
                        />
                        <button className="otbutton btn btn-accent" style={{ whiteSpace: 'nowrap' }} onClick={semdEmail}>Generate OTP</button>
                      </div>

                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>E-Mail OTP:<span style={{ color: 'red' }}>*</span></label>
                      <div className=" d-flex justify-content-between">
                        <input type="text" className="me-3" maxLength={1} onChange={(ev) => { emailOTPset(ev, 0) }} placeholder="" name="psw_1" required="" placeholder-type="number" />
                        <input type="text" className="me-3" maxLength={1} onChange={(ev) => { emailOTPset(ev, 1) }} placeholder="" name="psw_2" required="" />
                        <input type="text" className="me-3" maxLength={1} onChange={(ev) => { emailOTPset(ev, 2) }} placeholder="" name="psw_3" required="" />
                        <input type="text" className="me-3" maxLength={1} onChange={(ev) => { emailOTPset(ev, 3) }} placeholder="" name="psw_4" required="" />
                        <button className="otbutton btn btn-accent" onClick={otpEmailVerifcation}>Verify</button>
                      </div>
                      <div>
                        <h5>{emailVerMsg}</h5>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="mt-4 mb-3">
                  {RegisterationClicked === 1 && error_message && (<div className="alert alert-danger w-100" role="alert">
                    {error_message}
                  </div>)}
                  <h3>All fields marked with <span style={{ color: 'red' }}>*</span> are mandatory</h3>
                  <div className="d-flex justify-content-center">
                    {/* <button className="btn btn-primary w-50" type="submit">Registration</button> */}
                    <button className="btn btn-primary w-50" onClick={RegisterationApi}>Register</button>
                    {/* <!-- <button class="btn btn-secondary" type="reset">Cancel</button> --> */}
                  </div>
                  {/* <!-- <a href="./uploadstudentdata.html"> --> */}
                </div>

                <div className="modal" id="myModalexam">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      {/* <div className="modal-header">
                        <h5 className="modal-title">Slots for Examination</h5>
                        <button type="button" className="btn-close" data-dismiss="modal">wqwqwq</button>
                      </div> */}

                      {(msgText.length > 0) && (
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


                      {userRegistered && (
                        <>
                          <div className="modal-body">
                            <div className="table-responsive ">


                              <h3>School Code is {schoolcode} and password is {mobile}</h3>
                              <h4>Remember this code and password for logging in future.</h4>
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

              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
    //  code new ends
  );
}
