import {Portal} from './Portal.js'

export class Oauth {

    config = {

        "authorizeURL": "http://portal.dev.local:8080/o/oauth2/authorize",
        "clientId": "id-b9550348-fed3-e109-1159-07a81865cb",
        "clientSecret": "secret-f041faea-58da-539f-a5a1-5e1aa17d2",
        "tokenURL": "http://portal.dev.local:8080/o/oauth2/token"

    }

    get configuration() {
        return this.config;
    }

    getAuthorizeUrl(redirectURL) {

        const authorizeURLWithParams = new URL(this.config.authorizeURL);
        authorizeURLWithParams.searchParams.append("client_id", this.config.clientId);
        authorizeURLWithParams.searchParams.append("response_type", 'code');

        let finalRedirectURL = redirectURL;
        if (!finalRedirectURL) {
            const defaultURL = this.getDefaultRedirectURL();
            console.debug("No redirect URL provided. Setting the default one : [" + defaultURL + "]");
            finalRedirectURL = defaultURL
        }
        authorizeURLWithParams.searchParams.append("redirect_uri", finalRedirectURL);

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

}