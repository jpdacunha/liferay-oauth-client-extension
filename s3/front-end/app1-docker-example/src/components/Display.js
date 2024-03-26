import React, { useEffect } from 'react';
import {ApimClient} from '../services/ApimClient.js';

const Display = () => {

    const [debugData, setDebugData] = React.useState(null);

	useEffect(() => {
		async function fetchData() {

			try {
				const apimClient = new ApimClient();
				const debugResponse = await apimClient.debugRoute();
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