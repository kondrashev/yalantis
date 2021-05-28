import React from 'react';
import { EmployeesContext } from './Employees';
const Employee = () => {
    const { employee } = React.useContext(EmployeesContext);
    const colorEmployee = React.useRef('black');
    const radioNotActiveEmployee = React.useRef(null);
    const radioActiveEmployee = React.useRef(null);
    const toChoose = () => {
        colorEmployee.current.style.color = 'blue';
        radioNotActiveEmployee.current.checked = false;
    }
    const cancelToChoose = () => {
        colorEmployee.current.style.color = 'black';
        radioActiveEmployee.current.checked = false;
    }
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
                    ref={radioNotActiveEmployee}
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
                    ref={radioActiveEmployee}
                    onClick={toChoose}
                >
                </input>
                <label>active</label>
            </div>
        </div>
    )
}
export default Employee;