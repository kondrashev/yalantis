import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import LoadEmployeesReducer, { initialState } from '../store/reducer';
import thunk from 'redux-thunk';
import Employees from './Employees';
import EmployeesBirthday from './EmployeesBirthday';

const store = createStore(
	LoadEmployeesReducer,
	initialState,
	applyMiddleware(thunk)
);

const App = () => {
	return (
		<Provider store={store}>
			<div
				className='application'
			>
				<Employees />
				<EmployeesBirthday />
			</div>
		</Provider>
	);
};
export default App;
