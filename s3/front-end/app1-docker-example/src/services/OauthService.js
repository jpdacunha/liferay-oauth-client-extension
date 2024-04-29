import {AxiosClient} from './common/AxiosClient.js';
import {Portal} from './common/Portal.js';

export class OauthService extends AxiosClient {

    config = {

        "authorizeURL": "http://portal.dev.local:8080/o/oauth2/authorize",
        "clientId": "id-b9b1a6b9-7a59-4bf9-6a63-bd067c9dfcd",
        "clientSecret": "secret-824ae6e5-d1e6-35dd-2048-f11ce61e4f",
        "tokenURL": "http://portal.dev.local:8080/o/oauth2/token"

    }

    constructor() {

        console.log("Initializing OauthService ...");

        const clientConfig = {
            "apiURL": "http://portal.dev.local:8800",
            "envId": "dev",
            "headers": []
        }

        super(clientConfig);

    }

    getOauthConfiguration() {
        return this.config;
    }

    exhangeForToken(code, redirectURL) {

        const url = this.config.tokenURL;

        const headers = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const body = {
            "client_id": this.config.clientId,
            "client_secret": this.config.clientSecret,
            "grant_type": "authorization_code",
            "code": code,
        }

        if (redirectURL) {
            body["redirect_uri"] = redirectURL
        } else {
            body["redirect_uri"] = this.getDefaultRedirectURL();
        }

        console.debug("Requesting [" + url + "] with code [" + code + "] for access token.")

        super.getAxiosInstance()
            .post(url, body, headers)
            .then((response) => {
                console.debug("Returned response from client : " + JSON.stringify({url, response:response.data}, null, 2));
                console.debug("+++++++++++++++++++++++++++++ " + response.data);
            })
            .catch((error) => {
                super.handlePromiseError(error);
            })

}

    getAuthorizeUrl(redirectURL) {

        const authorizeURLWithParams = new URL(this.config.authorizeURL);
        authorizeURLWithParams.searchParams.append("client_id", this.config.clientId);
        authorizeURLWithParams.searchParams.append("response_type", 'code');

        this.appendRedirectUri(authorizeURLWithParams, redirectURL);

        return authorizeURLWithParams.href;

    }

    getDefaultRedirectURL() {

        let defaultURL = window.location.origin + window.location.pathname;
        const length = defaultURL.length;

        if (length >= 1 && defaultURL.endsWith("/")) {
            defaultURL = defaultURL.substring(0, defaultURL.length -1);
        } 

        return defaultURL;

    }

    isSignedIn() {
        return Portal.ThemeDisplay.isSignedIn();
    }

    appendRedirectUri(urlObject, redirectURL) {

        let finalRedirectURL = redirectURL;
        if (!finalRedirectURL) {
            const defaultURL = this.getDefaultRedirectURL();
            console.debug("No redirect URL provided. Setting the default one : [" + defaultURL + "]");
            finalRedirectURL = defaultURL
        }
        urlObject.searchParams.append("redirect_uri", finalRedirectURL);

    }

}