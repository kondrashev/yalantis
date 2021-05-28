import { LOAD_EMPLOYEES_DATA_SUCCESS } from './action';
export const initialState = {};

const LoadEmployeesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EMPLOYEES_DATA_SUCCESS:
            return action.employees;
        default:
            return state;
    }
}
export default LoadEmployeesReducer;