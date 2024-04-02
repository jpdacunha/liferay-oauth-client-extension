import {AxiosClient} from './common/AxiosClient.js';

export class ApimService extends AxiosClient {

    endPointsApimUrls = { 
        DEBUG: "/debug/get",
        COMMUNES: "/communes",
     };

    constructor() {

        console.log("Initializing APIM Service ...");

        const oAuth2ClientConfig = {
            "apiURL": "http://apim.dev.local:8800",
            "envId": "dev",
            "headers": ["Content-Type: application/json"]
        }

        super(oAuth2ClientConfig);

    };

    debugRoute() {

        const url = this.endPointsApimUrls.DEBUG;

        return super.getAxiosInstance()
            .get(url)
            .then((response) => {
                console.debug("Returned response from client : " + JSON.stringify({url, response:response.data}));
                return response.data;
            })
            .catch((error) => {
                super.handlePromiseError(error);
            })

    }

    getCommunes() {

        const url = this.endPointsApimUrls.COMMUNES;

        return super.getAxiosInstance()
            .get(url)
            .then((response) => {
                console.debug("Returned response from client : " + JSON.stringify({url, response:response.data}, null, 2));
                return response.data;
            })
            .catch((error) => {
                super.handlePromiseError(error);
            }) 

    }

}