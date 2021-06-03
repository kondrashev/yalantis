import React from 'react';
import { ApplictationContext } from './App';

const EmployeesBirthday = () => {
    const { values } = React.useContext(ApplictationContext);
    const months = [];
    (() => {
        for (let i = 1; i < 13; i++) {
            months.push(new Date(`${i}`).toLocaleString('en', { month: 'long' }));
        };
    })();
    const getBirthdayInformation = () => {
        for (let i = 1; i < 13; i++) {
            if (JSON.parse(localStorage.getItem(new Date(`${i}`).toLocaleString('en', { month: 'long' }))) === null) {
                localStorage.setItem(new Date(`${i}`).toLocaleString('en', { month: 'long' }), JSON.stringify([]));
            }
        };
    }
    React.useEffect(() => {
        getBirthdayInformation();
    }, []);
    return (
        <div
            className='employees_birthday'
        >
            <h
                className='birthday_employees'
            >
                Employees birthday
            </h>
            {
                localStorage.length ?
                    months.map((month) => {
                        const employees = JSON.parse(localStorage.getItem(month));
                        return (
                            <div
                                key={month}
                            >
                                {
                                    employees.length !== 0 &&
                                    <h>
                                        {month}
                                    </h>
                                }
                                <ul>
                                    {
                                        employees.map((employee) => {
                                            return (
                                                <li
                                                    key={employee}
                                                >
                                                    {employee}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    }) :
                    <h>Employees List is empty</h>
            }
            {
                values.listEmployeesEmpty &&
                <h>Employees List is empty</h>
            }
        </div>
    )
}
export default EmployeesBirthday;