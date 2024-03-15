import React from 'react';
import {ApimClient} from '../services/ApimClient.js';

function Display() {

    const getDebugMessage = async () => {
        return await new ApimClient().debugRoute();
    }

	const [debugData, setDebugData] = React.useState(null);

	React.useEffect(() => {
        const datas = getDebugMessage();
		setDebugData(datas);
	}, []);

	return !debugData ? (
		<div>Loading ...</div>
	) : (
		<div>
			<h2>HttpBin Debug  Response</h2>

            <p>
                {JSON.stringify(debugData, null, 2)}
            </p>
		</div>
	);
}

export default Display;