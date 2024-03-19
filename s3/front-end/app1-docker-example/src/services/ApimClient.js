import {Portal} from './common/Portal.js';
import {AxiosClient} from './common/AxiosClient.js';


export class ApimClient extends AxiosClient {

    constructor(apiUrl, envId, headers) {
        console.log("Initializing APIM client...");
        super(apiUrl, envId, headers);
    };

    debugRoute() {

        const url = '/debug/get';

        return super.getAxiosInstance()
            .get(url)
            .then((response) => {
                console.debug("Returned response for ApimClient : " + JSON.stringify({url, response:response.data}));
                return response.data;
            })
            .catch((error) => {
                super.handlePromiseError(error);
            })


        /*super.getAxiosInstance().get('http:/apim.de.local:8800/debug/get').then((mockGet) => {
            console.debug("Returning : " + JSON.stringify(mockGet, null, 2));
			return mockGet;
		});*/
    }

    getCommunes() {
        this.oAuth2Client?.fetch('/communes').then((mockGet) => {
            console.debug("Returning : " + JSON.stringify(mockGet, null, 2));
			return mockGet;
		})      
    }

}