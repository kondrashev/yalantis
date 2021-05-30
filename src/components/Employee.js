import React from 'react';
import { connect } from 'react-redux';
import { ApplictationContext } from './App';
import { EmployeesContext } from './Employees';
const Employee = (props) => {
    const { employees } = props;
    const { employee } = React.useContext(EmployeesContext);
    const { values, setValues } = React.useContext(ApplictationContext);
    const colorEmployee = React.useRef('black');
    const radioNotActiveEmployee = React.useRef(null);
    const radioActiveEmployee = React.useRef(null);
    const toChoose = () => {
        colorEmployee.current.style.color = 'blue';
        radioNotActiveEmployee.current.checked = false;
        const birthdayEmployees = employees.filter(employee => employee.id === radioActiveEmployee.current.value);
        const birthdayMonth = `${new Date(birthdayEmployees[0].dob).toLocaleString('en', { month: 'long' })}`;
        const birthdayInformation = `${colorEmployee.current.textContent}-${new Date(birthdayEmployees[0].dob).getDate()} ${new Date(birthdayEmployees[0].dob).toLocaleString('en', { month: 'long' })}, ${new Date(birthdayEmployees[0].dob).getFullYear()} year`;
        const listEmployees = JSON.parse(localStorage.getItem(birthdayMonth));
        listEmployees.push(birthdayInformation);
        localStorage.setItem(birthdayMonth, JSON.stringify(listEmployees));
        setValues({
            ...values,
            listEmployeesUpdate: listEmployees
        });
    }
    const cancelToChoose = () => {
        colorEmployee.current.style.color = 'black';
        radioActiveEmployee.current.checked = false;
        const birthdayEmployees = employees.filter(employee => employee.id === radioNotActiveEmployee.current.value);
        const birthdayMonth = `${new Date(birthdayEmployees[0].dob).toLocaleString('en', { month: 'long' })}`;
        const birthdayInformation = `${colorEmployee.current.textContent}-${new Date(birthdayEmployees[0].dob).getDate()} ${new Date(birthdayEmployees[0].dob).toLocaleString('en', { month: 'long' })}, ${new Date(birthdayEmployees[0].dob).getFullYear()} year`;
        const listEmployees = JSON.parse(localStorage.getItem(birthdayMonth));
        localStorage.setItem(birthdayMonth, JSON.stringify(listEmployees.filter(employee => employee !== birthdayInformation)));
        setValues({
            ...values,
            listEmployeesUpdate: listEmployees
        });
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
                    value={employee.id}
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
                    value={employee.id}
                    ref={radioActiveEmployee}
                    onClick={toChoose}
                >
                </input>
                <label>active</label>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        employees: state
    };
}
export default connect(mapStateToProps, null)(Employee);