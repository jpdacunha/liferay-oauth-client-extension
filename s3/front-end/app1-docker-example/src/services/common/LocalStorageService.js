export class LocalStorageService {

    getVerifier(prefix) {
        let key = this.getKey(prefix, '_code_verifier');
        return localStorage.getItem(key);
    }

    setVerifier(prefix, verifier) {
        let key = this.getKey(prefix, '_code_verifier');
        localStorage.setItem(key, verifier);
    }

    setTokens(tokenObj) {
        localStorage.setItem('access_token', tokenObj.access_token);
        localStorage.setItem('refresh_token', tokenObj.refresh_token);
    }

    getAccessToken() {
        return localStorage.getItem('access_token');
    }

    getRefreshToken() {
        return localStorage.getItem('refresh_token');
    }

    clear(prefix) {
        console.debug("Clearing storage ...");
        this.clearTokens();
        let key = this.getKey(prefix, '_code_verifier');
        localStorage.removeItem(key);
    }

    clearTokens() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }

    getKey(prefix, key) {

        if (prefix) {
            return prefix + key;
        }
        return key;
    }
 
}