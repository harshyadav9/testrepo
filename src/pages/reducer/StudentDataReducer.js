export const StundentDataReducer = (state, action) => {
    switch (action.type) {



        case 'ADDINFO_REGISTER':
            console.log("action", action);
            return {
                ...state,
                ...action
            };
        case 'ADDINFO':
            console.log("action", action);
            return {
                ...state,
                ...action
            };

        case 'EMPTY_STATE':
            console.log("action", action);
            return {
                ...state,
                ...action
            };



        case 'SCHOOL_SLOT_VALID':
            console.log("action", action);
            return {
                ...state,
                ...action
            };
        case 'ADD_THEME':
            console.log("action", action);
            return {
                ...state,
                ...action
            };




        case 'ADD_ROLL_NO':
            console.log("action ADD_STUDENT_INFO", action);

            return {
                ...state,
                ...action
                // roll_no: action.roll_no,
                // reset_to_login: action.reset_to_login
            }
        case 'ADD_STUDENT_INFO':
            console.log("action ADD_STUDENT_INFO", action);

            return {
                ...state,

                ...action
            }
        case 'SAVEINFO':
            console.log("SAVEINFO", action);
            return {
                ...state,
                ...action

            };

        default:
            return state;
    }
};