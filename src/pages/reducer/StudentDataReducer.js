export const StundentDataReducer = (state, action) => {
    switch (action.type) {
        case 'ADDINFO':
            console.log("action", action);
            return {
                ...state,
                ...action
            };

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