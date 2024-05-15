import React, { useEffect } from 'react';
import {ApimService} from '../services/ApimService.js';

const Display = ( props ) => {

    const [debugData, setDebugData] = React.useState(null);
	const appId = props.appId;
	
	useEffect(() => {
		async function fetchData() {
			try {
				
				const apimClient = new ApimService(appId);
				const debugResponse = await apimClient.debugRoute();
				setDebugData(debugResponse);

			} catch (error) {
				console.error(error);
			}

		}
		fetchData();
	}, [appId]);

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