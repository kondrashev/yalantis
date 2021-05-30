import React from 'react';

const EmployeesBirthday = () => {
    const months = [];
    (() => {
        for (let i = 5; i < 12; i++) {
            months.push(new Date(`${i}`).toLocaleString('en', { month: 'long' }));
        };
        for (let i = 1; i < 5; i++) {
            months.push(new Date(`${i}`).toLocaleString('en', { month: 'long' }));
        };
    })();
    const getBirthdayInformation = () => {
        for (let i = 5; i < 12; i++) {
            if (JSON.parse(localStorage.getItem(new Date(`${i}`).toLocaleString('en', { month: 'long' }))) === null) {
                localStorage.setItem(new Date(`${i}`).toLocaleString('en', { month: 'long' }), JSON.stringify([]));
            }
        };
        for (let i = 1; i < 5; i++) {
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
                months.map((month) => {
                    return (
                        <div
                            key={month}
                        >
                            <h>{month}</h>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default EmployeesBirthday;