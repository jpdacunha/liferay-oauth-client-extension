

import axios, { AxiosInstance } from 'axios';


const NETWORK_ERROR = "Network Error";
const DEV_ENV = "dev";

export class AxiosClient {

    envId;
    apiUrl; 
    _axiosInstance;
    headers;
    standardTimeout = 10000;

    constructor(apiUrl, envId, headers) {

        if (!apiUrl) {
            throw new Error("Invalid apiUrl : it is mandatory to provide a valid url");
        } 
        this.apiUrl = apiUrl;

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

    createClient() {

        let selfSigned = false;
        if (this.envId === 'dev') {
            console.log('Client is working in dev mode : please be aware of not using this in production');
            selfSigned = true;
        } else {
            console.log('Client is working in ${this.envId} mode');
        }

        /*const httpsAgent = new https.Agent({
            rejectUnauthorized: selfSigned,
        })*/

        const params = {
            baseURL: this.apiUrl,
            //httpsAgent: httpsAgent,
            headers: this.headers, 
            timeout: 20000
        }

        console.log('Creating Rest Client using configuration : ' + JSON.stringify(params));
        return axios.create(params);
    }
    
    getAxiosInstance() {
        return this._axiosInstance;
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

        if (error.response) {
            throw error.response;
        } else {
            throw new Error('Error : ' + error);
        }

    }

    getEnvId() {
        return this.envId;
    }

}

