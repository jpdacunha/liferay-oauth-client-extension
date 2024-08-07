import {AxiosClient} from './common/AxiosClient.js';
import {Portal} from './common/Portal.js';
import {StorageService} from './common/StorageService.js';
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
    storageService

    constructor(appId) {

        console.log("Initializing OauthService ...");

        const clientConfig = {
            "apiURL": "http://portal.dev.local:8800",
            "envId": "dev",
            "headers": [],
            "addToken": false
        }

        super(clientConfig, null);

        this.appId = appId;
        this.storageService = new StorageService(appId);

    }

    getOauthConfiguration() {
        return this.config;
    }

    async redirectToLogin() {

        const codeVerifier = this.getCodeVerifier();
        console.debug("Generated codeVerifier : " + codeVerifier);

        const codeChallenge = this.getCodeChallenge(codeVerifier);
        console.debug("Generated codeChallenge : " + codeChallenge);

        //Initializing local storage
        await this.storageService.clear();
        await this.storageService.setVerifier(codeVerifier);

        const redirect = this.getPKCEAuthorizeUrl(codeChallenge, null);
        console.debug("Redirecting to [" + redirect + "] ...")
        window.location.href = redirect;
    }

    async exhangeForToken(code, redirectURL) {

        const url = this.config.tokenURL;

        const headers = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const codeVerifier = this.storageService.getVerifier();

        console.debug("codeVerifier : " + codeVerifier);

        const body = {
            "client_id": this.config.clientId,
            "grant_type": "authorization_code",
            "code": code,
            "code_verifier": codeVerifier,
        }

        let finalRedirectURL = null;
        if (redirectURL) {
            finalRedirectURL = redirectURL
        } else {
            finalRedirectURL = this.getDefaultRedirectURL();
        }

        body["redirect_uri"] = finalRedirectURL
 
        console.debug("Requesting [" + url + "] with code [" + code + "] for access token.")

        super.getAxiosInstance()
            .post(url, body, headers)
            .then(async (response) => {
                console.debug("Returned response from client : " + JSON.stringify({url, response:response.data}, null, 2));

                const tokenObject = {
                    "access_token": response.data.access_token,
                    "refresh_token": response.data.refresh_token 
                }
                 this.storageService.clear();
                await this.storageService.setTokens(tokenObject);
                console.debug("Returned tokens successfully stored.");

                window.location.href = finalRedirectURL;

            })
            .catch((error) => {
                super.handlePromiseError(error);
            })

    }

    getPKCEAuthorizeUrl(codeChallenge, redirectURL) {

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

    isToken() {
        const token = this.storageService.getAccessToken()
        if (token) {
            return true;
        }
        return false;
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