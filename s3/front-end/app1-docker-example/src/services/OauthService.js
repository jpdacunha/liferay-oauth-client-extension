import {AxiosClient} from './common/AxiosClient.js';
import {Portal} from './common/Portal.js';
import {LocalStorageService} from './common/LocalStorageService.js';
import sha256 from 'crypto-js/sha256';
import Base64URL from "crypto-js/enc-base64url"
import Utf8 from "crypto-js/enc-utf8"

export class OauthService extends AxiosClient {

    config = {

        "authorizeURL": "http://portal.dev.local:8080/o/oauth2/authorize",
        "clientId": "id-2ede2606-9967-e3af-db74-4d94c68ebd",
        "tokenURL": "http://portal.dev.local:8080/o/oauth2/token"
    }

    appId

    constructor(appId) {

        console.log("Initializing OauthService ...");

        const clientConfig = {
            "apiURL": "http://portal.dev.local:8800",
            "envId": "dev",
            "headers": []
        }

        super(clientConfig);

        this.appId = appId;

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

        const localStorageService = new LocalStorageService();
        const codeVerifier = localStorageService.getVerifier(this.appId);

        const body = {
            "client_id": this.config.clientId,
            "grant_type": "authorization_code",
            "code": code,
            "code_verifier": codeVerifier,
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

                const tokenObject = {
                    "access_token": response.data.access_token,
                    "refresh_token": response.data.refresh_token 
                }
                const localStorageService = new LocalStorageService();
                localStorageService.setTokens(tokenObject);
                console.debug("Returned tokens successfully stored.");
            })
            .catch((error) => {
                super.handlePromiseError(error);
            })

    }

    getPKCEAuthorizeUrl(redirectURL) {

        const codeVerifier = this.getCodeVerifier();
        const codeChallenge = this.getCodeChallenge(codeVerifier);

        console.debug("Generated codeChallenge : " + codeChallenge);

        //Initializing local storage
        const localStorageService = new LocalStorageService();
        localStorageService.clear(this.appId);
        localStorageService.setVerifier(this.appId, codeVerifier);

        const authorizeURLWithParams = new URL(this.config.authorizeURL);
        authorizeURLWithParams.searchParams.append("client_id", this.config.clientId);
        authorizeURLWithParams.searchParams.append("response_type", 'code');
        authorizeURLWithParams.searchParams.append("code_challenge", codeChallenge);

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

    getCodeVerifier() {

        var length = 12;
        var verifier  = "";
        var dictionary = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            verifier  += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
        }

        return verifier;
    }

    getCodeChallenge(verifier){

        var code = Utf8.parse(verifier);
        var codeSHA256 = sha256(code);

        return Base64URL.stringify(codeSHA256);
    }

}