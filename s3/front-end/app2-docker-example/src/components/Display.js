import React, { useEffect } from 'react';
import {ApimClient} from '../services/ApimClient.js';
import {EndPointsApimUrls} from '../services/common/EndPointsApim.js'

function Display() {

	const [debugData, setDebugData] = React.useState(null);

	useEffect(() => {

		const fetchData = async() => {

			try {

				const oAuth2Client = new ApimClient();
				await oAuth2Client._initializeClient();
				oAuth2Client.client.fetch(EndPointsApimUrls.DEBUG).then(response => {
					console.debug("Returning from APIM 02 : " + JSON.stringify(response, null, 2));
					setDebugData(response);
				});

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
            <pre>
                {JSON.stringify(debugData, null, 2)}
            </pre>
		</div>
	);
}

export default Display;