export class StorageService {

    keys = { 
        CODE_VERIFIER: "_code_verifier",
        ACCESS_TOKEN: "_access_token",
        REFRESH_TOKEN: "_refresh_token"
     };

     prefix

     constructor(prefix) {
        this.prefix = prefix;
     }

    getVerifier() {
        let key = this.getKey(this.prefix, this.keys.CODE_VERIFIER);
        return sessionStorage.getItem(key);
    }

    async setVerifier(verifier) {
        let key = this.getKey(this.prefix, this.keys.CODE_VERIFIER);
        sessionStorage.setItem(key, verifier);
    }

    async setTokens(tokenObj) {

        let key_access_token = this.getKey(this.prefix, this.keys.ACCESS_TOKEN);
        sessionStorage.setItem(key_access_token, tokenObj.access_token);

        let key_refresh_token = this.getKey(this.prefix, this.keys.REFRESH_TOKEN);
        sessionStorage.setItem(key_refresh_token, tokenObj.refresh_token);

    }

    getAccessToken() {
        let key_access_token = this.getKey(this.prefix, this.keys.ACCESS_TOKEN);
        return sessionStorage.getItem(key_access_token);
    }

    getRefreshToken() {
        let key_refresh_token = this.getKey(this.prefix, this.keys.REFRESH_TOKEN);
        return sessionStorage.getItem(key_refresh_token);
    }

    async clear() {
        console.debug("Clearing storage ...");
        this.clearTokens();
        let key = this.getKey(this.prefix, this.keys.CODE_VERIFIER);
        sessionStorage.removeItem(key);
    }

    async clearTokens() {

        let key_access_token = this.getKey(this.prefix, this.keys.ACCESS_TOKEN);
        sessionStorage.removeItem(key_access_token);

        let key_refresh_token = this.getKey(this.prefix, this.keys.REFRESH_TOKEN);
        sessionStorage.removeItem(key_refresh_token);
    }

    getKey(prefix, key) {

        if (prefix) {
            return prefix + key;
        }
        return key;
    }
 
}