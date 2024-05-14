export class StorageService {

    getVerifier(prefix) {
        let key = this.getKey(prefix, '_code_verifier');
        return sessionStorage.getItem(key);
    }

    setVerifier(prefix, verifier) {
        let key = this.getKey(prefix, '_code_verifier');
        sessionStorage.setItem(key, verifier);
    }

    setTokens(tokenObj) {
        sessionStorage.setItem('access_token', tokenObj.access_token);
        sessionStorage.setItem('refresh_token', tokenObj.refresh_token);
    }

    getAccessToken() {
        return sessionStorage.getItem('access_token');
    }

    getRefreshToken() {
        return sessionStorage.getItem('refresh_token');
    }

    clear(prefix) {
        console.debug("Clearing storage ...");
        this.clearTokens();
        let key = this.getKey(prefix, '_code_verifier');
        sessionStorage.removeItem(key);
    }

    clearTokens() {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
    }

    getKey(prefix, key) {

        if (prefix) {
            return prefix + key;
        }
        return key;
    }
 
}