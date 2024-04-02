import {AxiosClient} from './common/AxiosClient.js';
import {OauthService} from './common/OauthService.js';
import {EndPointsApimUrls} from './common/EndPointsApimUrls';


export class ApimClient extends AxiosClient {

    constructor() {

        console.log("Initializing APIM client...");

        const redirectURL = window.location.origin + window.location.pathname

        const oAuth2ClientConfig = {
            "apiURL": "http://apim.dev.local:8800",
            "redirectURI": redirectURL
        }

        const oAuth = new OauthService();

        let mergedConfig = {
            ...oAuth2ClientConfig,
            ...oAuth.getOauthConfiguration()
        };

         //Hard coded for POC only
        const envId="dev"
	    const headers={};

        super(envId, headers, mergedConfig);

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