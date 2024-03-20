import {Portal} from './common/Portal.js';
import {AxiosClient} from './common/AxiosClient.js';


export class ApimClient extends AxiosClient {

    constructor(apiUrl) {

        console.log("Initializing APIM client...");

        //Hard coded for POC only
        const envId="dev"
	    const headers={};

        super(apiUrl, envId, headers);

    };

    debugRoute() {

        const url = '/debug/get';

        return super.getAxiosInstance()
            .get(url)
            .then((response) => {
                console.debug("Returned response from ApimClient : " + JSON.stringify({url, response:response.data}));
                return response.data;
            })
            .catch((error) => {
                super.handlePromiseError(error);
            })

    }

    getCommunes() {
        this.oAuth2Client?.fetch('/communes').then((mockGet) => {
            console.debug("Returning : " + JSON.stringify(mockGet, null, 2));
			return mockGet;
		})      
    }

}