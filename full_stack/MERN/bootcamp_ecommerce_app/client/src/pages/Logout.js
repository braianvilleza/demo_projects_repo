import {Navigate} from 'react-router-dom';
import {useEffect, useContext} from 'react';

import UserContext from '../UserContext.js';

export default function Logout(){

	const {unsetUser} = useContext(UserContext);


	const reset = () => {
		unsetUser();
	}

	useEffect(() => {		
			reset();	
		}
	);

	return(
		<>
			<Navigate to="/login"/>
		</>
	)
}