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

export const ApplictationContext = React.createContext();
const App = () => {
	const [values, setValues] = React.useState({
		listEmployeesUpdate: [],
		swithcListEmployeesUpdate: true
	});
	return (
		<Provider store={store}>
			<ApplictationContext.Provider
				value={{
					values: values,
					setValues: setValues
				}}
			>
				<div
					className='application'
				>
					<Employees />
					<EmployeesBirthday />
				</div>
			</ApplictationContext.Provider>
		</Provider>
	);
};
export default App;
