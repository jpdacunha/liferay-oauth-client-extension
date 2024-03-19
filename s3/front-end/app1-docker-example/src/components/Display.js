import React, { useEffect } from 'react';
import {ApimClient} from '../services/ApimClient.js';
import { Portal } from 'services/common/Portal.js';

const Display = () => {

    const [debugData, setDebugData] = React.useState(null);

	useEffect(() => {
		async function fetchData() {
			const oauthConfigName = 'apim-oauth-application-user-agent';
    
			try {
				let oAuth2Client = Portal.OAuth2Client.FromUserAgentApplication(oauthConfigName);
				console.debug("Created client : " + JSON.stringify(oAuth2Client, null, 2))
			} catch (error) {
				console.error(error);
			}
	
			const apiUrl="http://apim.dev.local:8800";
			const envId="dev"
			const headers={};
	
			const apimClient = new ApimClient(apiUrl, envId, headers);
			const debugResponse = await apimClient.debugRoute();
			console.debug("Received from client 2 : " + debugResponse);
			setDebugData(debugResponse);
		}
		fetchData();
	}, []);

	return !debugData ? (
		<div>Loading ...</div>
	) : (
		<div>
			<h2>HttpBin Debug Response</h2>

            <p>
                {JSON.stringify(debugData, null, 2)}
            </p>
		</div>
	);
}

export default Display;