import {Portal} from './Portal.js';


export class ApimClient {

    constructor(oAuth2Client) {

        console.log("Initializing APIM client...");
        const oauthConfigName = 'apim-oauth-application-user-agent';
    
        try {
            this.oAuth2Client = Portal.OAuth2Client.FromUserAgentApplication(oauthConfigName);
            console.debug("Created client : " + JSON.stringify(this.oAuth2Client, null, 2))
        } catch (error) {
            console.error(error);
        }

    };

    debugRoute() {
        this.oAuth2Client?.fetch('/debug/get').then((mockGet) => {
            console.debug("Returning : " + JSON.stringify(mockGet, null, 2));
			return mockGet;
		});
    }

    getCommunes() {
        this.oAuth2Client?.fetch('/communes').then((mockGet) => {
            console.debug("Returning : " + JSON.stringify(mockGet, null, 2));
			return mockGet;
		})      
    }

}