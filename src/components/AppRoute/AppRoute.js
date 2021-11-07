import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuthState } from '../../context/auth';

const AppRoutes = ({ component: Component, path, exact, isPrivate, ...rest }) => {
	const userDetails = useAuthState();
	return (
		<Route
            exact={exact}
			path={path}
			render={(props) =>
				isPrivate && !Boolean(userDetails.token) ? (
					<Redirect to={{ pathname: '/' }} />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default AppRoutes;