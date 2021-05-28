import React from 'react';
import { connect } from 'react-redux';
import { loadEmployeesFetchData } from '../store/action';
import Employee from './Employee';

export const EmployeesContext = React.createContext();
const Employees = (props) => {
    const { loadEmployees, employees } = props;
    const alphabet = [];
    (() => {
        for (let i = 65; i < 91; i++) {
            alphabet.push(String.fromCharCode(i));
        }
    })();
    React.useEffect(() => {
        const url = `https://yalantis-react-school-api.yalantis.com/api/task0/users`;
        loadEmployees(url);
    }, []);
    return (
        <div
            className='employees'
        >
            <h
                className='title_employees'
            >Employees
            </h>
            <div
                className='list_employees'
            >
                {alphabet.map((letter) => {
                    let countGroupOfEmployees = employees.filter(employee => letter === employee.lastName[0]);
                    if (countGroupOfEmployees.length) {
                        return (
                            <div
                                className='employee'
                            >
                                <h>{letter}</h>
                                {
                                    employees
                                        .filter(employee => letter === employee.lastName[0])
                                        .sort((a, b) => a.lastName > b.lastName ? 1 : -1)
                                        .map(employee => {
                                            return (
                                                <EmployeesContext.Provider
                                                    value={{
                                                        employee: employee
                                                    }}
                                                >
                                                    <Employee
                                                        key={employee.id}
                                                    />
                                                </EmployeesContext.Provider>
                                            )
                                        })
                                }
                            </div>
                        )
                    } else {
                        return (
                            <div
                                className='employee'
                            >
                                <h>{letter}</h>
                                <div>{`-----`}</div>
                            </div>
                        )
                    }
                })}
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