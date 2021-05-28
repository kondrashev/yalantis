import React from 'react';
import { connect } from 'react-redux';
import { loadEmployeesFetchData } from '../store/action';
const Employees = (props) => {
    const { loadEmployees, employees } = props;
    const colorEmployee = React.useRef('black');
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
    const toChoose = () => {
        colorEmployee.current.style.color = 'blue';
    }
    const cancelToChoose = () => {
        colorEmployee.current.style.color = 'black';
    }
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
                                                <div
                                                    className='employee_radio'
                                                >
                                                    <div
                                                        ref={colorEmployee}
                                                    >
                                                        {`${employee.lastName} ${employee.firstName}`}
                                                    </div>
                                                    <div
                                                        className='radio_button_block'
                                                    >
                                                        <input
                                                            type='radio'
                                                            name='1'
                                                            onClick={cancelToChoose}
                                                        >
                                                        </input>
                                                        <label>not active</label>
                                                    </div>
                                                    <div
                                                        className='radio_button_block'
                                                    >
                                                        <input
                                                            type='radio'
                                                            name='1'
                                                            onClick={toChoose}
                                                        >
                                                        </input>
                                                        <label>active</label>
                                                    </div>
                                                </div>
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