import React, { useReducer, useEffect, createContext } from 'react';
import { StundentDataReducer } from '../reducer/StudentDataReducer';
export const StudentDataContext = createContext();


const initialState = {
    schoolname: '', country: '', state: '', pincode: "", postal_address: "", phonestd: "", mobile: "", principal_name: "",
    email: "", district: "", coordinating_teacher: "", school_code: ""

};
const StudentDataProvider = (props) => {

    const [state, dispatch] = useReducer(StundentDataReducer, initialState);

    return (
        <StudentDataContext.Provider value={{ state, dispatch }}>
            {props.children}
        </StudentDataContext.Provider>
    )


}


export default StudentDataProvider;