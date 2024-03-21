import {Portal} from './common/Portal.js';
import {AxiosClient} from './common/AxiosClient.js';
import {EndPointsApimUrls} from './common/EndPointsApimUrls';


export class ApimClient extends AxiosClient {

    constructor(apiUrl) {

        console.log("Initializing APIM client...");

        //Hard coded for POC only
        const envId="dev"
	    const headers={};

        super(apiUrl, envId, headers);

    };

    debugRoute() {

        const url = EndPointsApimUrls.DEBUG;

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

        const url = EndPointsApimUrls.COMMUNES;

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

}