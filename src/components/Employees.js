import React from 'react';
import { connect } from 'react-redux';
import { loadEmployeesFetchData } from '../store/action';
const Employees = (props) => {
    const { loadEmployees, employees } = props;
    React.useEffect(() => {
        const url = `https://yalantis-react-school-api.yalantis.com/api/task0/users`;
        loadEmployees(url);
    }, []);
    return (
        <div
            className='employees'
        >
            <h>Employees</h>
            <div
                className='list_employees'
            >
                <ul>
                    {
                        employees.map((employee) => {
                            return (
                                <>
                                    <li>{`${employee.lastName} ${employee.firstName}`}</li>
                                </>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        employees: state
    };
}
const mapDispatchToProps = dispatch => {
    return {
        loadEmployees: (url) => dispatch(loadEmployeesFetchData(url))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Employees);