import axios from "axios";
import React, { useContext, useEffect, useState } from 'react'
import { API_BASE_JAVA_URL, API_BASE_URL, API_END_POINTS } from '../../apis/api';
import { StudentDataContext } from '../context/datacontext';
import Sidebar from '../main/sidebar';

function SchoolRollNoGenerate() {

    const [rollNo, setRollNo] = useState('');
    const { state, dispatch } = useContext(StudentDataContext);
    const [rollNoAllowed, setRollNoAllowed] = useState(false);
    const [showSlotErr, setShowSlotErr] = useState("");
    const generateRollNo = async () => {
        const rollNoGeneration = await axios.post(`${API_BASE_JAVA_URL}${API_END_POINTS.generateSchoolRollNumber}`, {
            schoolId: state?.school_code
        });
        console.log("rollNoGeneration", rollNoGeneration);
    }

    useEffect(() => {
        const isRollNoGenerate = async () => {

            const isRollNoAllowed = await axios.post(`${API_BASE_URL}${API_END_POINTS.checkRollNo}`, {
                school_code: state?.school_code
            });
            console.log("isRollNoAllowed", isRollNoAllowed);
            if (isRollNoAllowed?.status === 200) {
                if (isRollNoAllowed?.data.data.count > 0) {
                    setRollNoAllowed(true);

                } else {
                    setRollNoAllowed(false);
                    setShowSlotErr("Roll no are already generated.");
                }
            } else {
                setShowSlotErr("There is some error in generating roll number please try after sometime");
            }
        }
        isRollNoGenerate();

    }, []);
    return (
        <div className="row ">
            <div className="col-lg-3">
                <Sidebar />
            </div>
            <div className="col-lg-9 ">
                <div className="dashboard-wraper d-flex ">

                    <main className="content ">
                        <div className="container-fluid ps-md-4 ps-lg-5 pe-md-4 py-5">
                            <div className="section-title mb-4 text-muted">
                                <h6 className="font-bold ">Roll No Generation</h6>
                                <p>Generate Roll No For School students</p>
                            </div>
                            <div class="row my-3"><button class="btn btn-primary mx-auto" style={{ width: '15rem' }} disabled={!rollNoAllowed} onClick={generateRollNo}>Generate Roll No</button></div>
                            <div>
                                <h2>{showSlotErr}</h2>
                            </div>
                        </div>
                    </main>
                </div>

            </div>
        </div>

    )
}




export default SchoolRollNoGenerate




