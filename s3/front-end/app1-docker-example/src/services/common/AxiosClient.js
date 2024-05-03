

import axios from 'axios';
import {LocalStorageService} from './LocalStorageService.js';

const NETWORK_ERROR = "Network Error";
const DEV_ENV = "dev";

export class AxiosClient {

    _axiosInstance;
    standardTimeout = 10000;
    envId;
    headers;
    apiURL;

    constructor(clientConfig) {

        const {apiURL, headers, envId} = clientConfig; 

        if (!apiURL) {
            throw new Error("Invalid apiUrl : it is mandatory to provide a valid apiUrl");
        } 
        this.apiURL = apiURL;

        //Other params
        if (!envId) {
            throw new Error("Invalid envId : it is mandatory to provide a valid envId");
        }         
        this.envId = envId;

        if (!headers) {
            throw new Error("Invalid header : it is mandatory to provide a valid header");
        }         
        this.headers = headers;

        this._axiosInstance = this.createClient();
        
    }

    getAxiosInstance() {
        return this._axiosInstance;
    }

    createClient() {

        /*let selfSigned = false;
        if (this.envId === 'dev') {
            console.log('Client is working in dev mode : please be aware of not using this in production');
            selfSigned = true;
        } else {
            console.log('Client is working in ${this.envId} mode');
        }

        const httpsAgent = new https.Agent({
            rejectUnauthorized: selfSigned,
        })*/

        const params = {
            baseURL: this.apiURL,
            //httpsAgent: httpsAgent,
            headers: this.headers, 
            withCredentials: true,
            timeout: 20000,

        }

        const localStorageService = new LocalStorageService();

        console.log('Creating Rest Client using configuration : ' + JSON.stringify(params));
        const axiosApiInstance = axios.create(params);

        //Requesting Access Token
        //https://blog.theashishmaurya.me/handling-jwt-access-and-refresh-token-using-axios-in-react-app
        //https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da
        //https://www.thedutchlab.com/en/insights/using-axios-interceptors-for-refreshing-your-api-token
        //https://liferay.dev/blogs/-/blogs/liferay-oauth-2-0-authorization-flows/maximized

        axiosApiInstance.interceptors.request.use(
            (config) => {

                const token = localStorageService.getAccessToken();

                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                } else {
                    console.debug("No authorization token provided"); 
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return axiosApiInstance;
    }

    handlePromiseError(error) {

        if (error.response) {
            console.error('Error bad returned code', error.response);
        } else if (error.request) {
            console.error('Error no responses received', error.request);
        } else {
            console.error('Error', error.message);
        }

        if (error.message === NETWORK_ERROR && this.envId === DEV_ENV) {
            console.error('Message', error.message + " : if you are working with self-signed certificate. You need to add an security exception on your browser (for example before using CARD & IAM interfaces).");
        } else {
            console.error('Message', error.message);
        }

        throw new Error('Error : ' + error);

    }

    getEnvId() {
        return this.envId;
    }

}

