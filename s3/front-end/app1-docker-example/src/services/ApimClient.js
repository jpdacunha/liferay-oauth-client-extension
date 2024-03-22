import {Portal} from './common/Portal.js';
import {AxiosClient} from './common/AxiosClient.js';
import {EndPointsApimUrls} from './common/EndPointsApimUrls';


export class ApimClient extends AxiosClient {

    constructor() {

        console.log("Initializing APIM client...");

        const oAuth2ClientConfig = {
            "authorizeURL": "http://portal.dev.local:8080/o/oauth2/authorize",
            "clientId": "id-6fb14480-a7c3-3d16-f828-a93d7bfadd2",
            "clientSecret": "secret-161cae96-73f6-c858-7e5e-4decacde2bb2",
            "apiURL": "http://apim.dev.local:8800",
            "redirectURI": [
              "http://portal.dev.local:8080/o/oauth2/redirect"
            ],
            "tokenURL": "http://portal.dev.local:8080/o/oauth2/token",
        }

         //Hard coded for POC only
        const envId="dev"
	    const headers={};

        super(envId, headers, oAuth2ClientConfig);

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
                console.debug("Returned response from ApimClient : " + JSON.stringify({url, response:response.data}, null, 2));
                return response.data;
            })
            .catch((error) => {
                super.handlePromiseError(error);
            }) 

    }

}