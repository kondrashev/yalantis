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
    const informationBirthday = React.useRef(null);
    const updateLocalStorage = (birthdayMonth, birthdayInformation) => {
        let listEmployees = JSON.parse(localStorage.getItem(birthdayMonth));
        if (radioActiveEmployee.current.checked) {
            listEmployees.push(birthdayInformation);
        } else {
            listEmployees = listEmployees.filter(employee => employee !== birthdayInformation);
        }
        localStorage.setItem(birthdayMonth, JSON.stringify(listEmployees));
        setValues({
            ...values,
            listEmployeesUpdate: listEmployees
        });
    }
    const toChoose = () => {
        colorEmployee.current.style.color = 'blue';
        radioNotActiveEmployee.current.checked = false;
        const birthdayEmployees = employees.filter(employee => employee.id === radioActiveEmployee.current.value);
        const birthdayMonth = `${new Date(birthdayEmployees[0].dob).toLocaleString('en', { month: 'long' })}`;
        const birthdayInformation = `${colorEmployee.current.textContent}-${new Date(birthdayEmployees[0].dob).getDate()} ${new Date(birthdayEmployees[0].dob).toLocaleString('en', { month: 'long' })}, ${new Date(birthdayEmployees[0].dob).getFullYear()} year`;
        if (birthdayInformation !== informationBirthday.current) {
            updateLocalStorage(birthdayMonth, birthdayInformation);
            informationBirthday.current = `${colorEmployee.current.textContent}-${new Date(birthdayEmployees[0].dob).getDate()} ${new Date(birthdayEmployees[0].dob).toLocaleString('en', { month: 'long' })}, ${new Date(birthdayEmployees[0].dob).getFullYear()} year`;
        }
        localStorageUpdate();
    }
    const cancelToChoose = () => {
        colorEmployee.current.style.color = 'black';
        radioActiveEmployee.current.checked = false;
        const birthdayEmployees = employees.filter(employee => employee.id === radioNotActiveEmployee.current.value);
        const birthdayMonth = `${new Date(birthdayEmployees[0].dob).toLocaleString('en', { month: 'long' })}`;
        const birthdayInformation = `${colorEmployee.current.textContent}-${new Date(birthdayEmployees[0].dob).getDate()} ${new Date(birthdayEmployees[0].dob).toLocaleString('en', { month: 'long' })}, ${new Date(birthdayEmployees[0].dob).getFullYear()} year`;
        updateLocalStorage(birthdayMonth, birthdayInformation);
        informationBirthday.current = null;
        localStorageUpdate();
    }
    const localStorageUpdate = () => {
        let countEmployees = [];
        for (let i = 0; i < localStorage.length; i++) {
            countEmployees[i] = (JSON.parse(localStorage.getItem(localStorage.key(i))));
        };
        countEmployees = countEmployees.filter(employee => employee.length !== 0);
        setValues({
            ...values,
            listEmployeesEmpty: countEmployees.length ? false : true
        });
    }
    React.useEffect(() => {
        localStorageUpdate();
    }, []);
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