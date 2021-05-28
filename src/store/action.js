export const LOAD_EMPLOYEES_DATA_SUCCESS = 'LOAD_EMPLOYEES_DATA_SUCCESS';

export const loadEmployeesFetchDataSuccess = (employees) => {
    return {
        type: LOAD_EMPLOYEES_DATA_SUCCESS,
        employees
    }
}
export const loadEmployeesFetchData = (url) => {
    return async (dispatch) => {
        let response = await fetch(url);
        if (response.status === 200) {
            response = await response.json();
            dispatch(loadEmployeesFetchDataSuccess(response));
        } else {
            alert('Error from server!!!');
        }
    }
}