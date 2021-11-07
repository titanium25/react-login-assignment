import React, { useReducer, createContext, useContext } from 'react';
import { initialState, AuthReducer } from './reducer';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

export function useAuthState() {
	const context = useContext(AuthStateContext);
	if (context === undefined) {
		throw new Error('useAuthState must be used within a AuthProvider');
	}

	return context;
}

export function useAuthDispatch() {
	const context = useContext(AuthDispatchContext);
	if (context === undefined) {
		throw new Error('useAuthDispatch must be used within a AuthProvider');
	}

	return context;
}

export const AuthProvider = ({ children }) => {
	const localState = JSON.parse(localStorage.getItem("currentUser"));

	const [user, dispatch] = useReducer(AuthReducer, localState || initialState);

	return (
		<AuthStateContext.Provider value={user}>
			<AuthDispatchContext.Provider value={dispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
};