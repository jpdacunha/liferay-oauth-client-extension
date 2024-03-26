import {AxiosClient} from './common/AxiosClient.js';
import {EndPointsApimUrls} from './common/EndPointsApimUrls';


export class ApimClient extends AxiosClient {

    constructor() {

        console.log("Initializing APIM client...");

        const redirectURL = window.location.origin + window.location.pathname

        const oAuth2ClientConfig = {
            "authorizeURL": "http://portal.dev.local:8080/o/oauth2/authorize",
            "clientId": "id-b9550348-fed3-e109-1159-07a81865cb",
            "clientSecret": "secret-f041faea-58da-539f-a5a1-5e1aa17d2",
            "apiURL": "http://apim.dev.local:8800",
            "redirectURI": redirectURL,
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