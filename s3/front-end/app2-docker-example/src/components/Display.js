import React, { useEffect } from 'react';
import {ApimClient} from '../services/ApimClient.js';

function Display() {

	const [debugData, setDebugData] = React.useState(null);

	useEffect(() => {
		async function fetchData() {

			try {

				/*const apimClient = new ApimClient();
				const debugResponse = await apimClient.debugRoute();
				console.debug("Received response from client : " + debugResponse);
				setDebugData(debugResponse);*/
				console.debug("Hello");

			} catch (error) {
				console.error(error);
			}

		}
		fetchData();
	}, []);

	return !debugData ? (
		<div>Loading ...</div>
	) : (
		<div>
			<h2>APP2 : HttpBin Debug Response</h2>
			<p>This app is designed to use OOTB Liferay client to call service using Oauth token. This implementation streamline token management but is coupled to Liferay.</p>
            <p>
                {JSON.stringify(debugData, null, 2)}
            </p>
		</div>
	);
}

export default Display;