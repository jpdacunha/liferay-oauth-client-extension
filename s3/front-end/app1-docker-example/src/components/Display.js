import React, { useEffect } from 'react';
import {ApimClient} from '../services/ApimClient.js';
import { Portal } from 'services/common/Portal.js';

const Display = () => {

    const [debugData, setDebugData] = React.useState(null);

	useEffect(() => {
		async function fetchData() {

			const oauthConfigName = 'apim-oauth-application-user-agent';
    
			try {

				let oAuth2ClientConfig = Portal.OAuth2Client.FromUserAgentApplication(oauthConfigName);
				console.debug("Created client : " + JSON.stringify(oAuth2ClientConfig, null, 2))
				const {homePageURL: apiUrl} = oAuth2ClientConfig;

				const apimClient = new ApimClient(apiUrl);
				const debugResponse = await apimClient.debugRoute();
				console.debug("Received response from client : " + debugResponse);
				setDebugData(debugResponse);

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
			<h2>APP1 : HttpBin Debug Response</h2>

            <pre>
                {JSON.stringify(debugData, null, 2)}
            </pre>
		</div>
	);
}

export default Display;