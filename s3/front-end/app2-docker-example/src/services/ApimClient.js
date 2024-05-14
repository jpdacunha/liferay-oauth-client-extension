import {Portal} from './common/Portal.js';

export class ApimClient {

    oAuth2Client

    async _initializeClient() {
        
        const oauthConfigName = 'app2-apim-oauth-application-user-agent';
        try {

            if (typeof(this.oAuth2Client) == 'undefined') {        
                console.debug("Initializing APIM client...");
                this.oAuth2Client = await Portal.OAuth2Client.FromUserAgentApplication(oauthConfigName);  
                console.debug("Client initialized : " + JSON.stringify(this.oAuth2Client, null, 2));
            } else {
                console.debug("APIM client is already initialized ...");
            }
           
        } catch (error) {
            console.error(error);
        }
    
    }

    get client() {
        return this.oAuth2Client;
    }

}