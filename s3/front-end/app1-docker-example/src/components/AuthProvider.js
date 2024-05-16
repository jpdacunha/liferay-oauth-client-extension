import React, { useEffect } from 'react';
import {OauthService} from '../services/OauthService.js';

const AuthProvider = ( props ) => {

    const appId = props.appId;
    const oauth = new OauthService(appId);
   
    useEffect(() => {
      const loginAction = () => {
  
        //Manage authentification using external URL (login / password)
        const signedIn = oauth.isSignedIn();
      
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get('code');
        const error = urlParams.get('error');
        const hasAuthorizationToken = oauth.isToken();
      
        if (error) {
          throw new Error('Error : ' + error);
        } else if (code) {
      
          console.debug("Exchanging for token ...")
          oauth.exhangeForToken(code);
      
        } else if (!signedIn) {
      
          console.debug("Redirect to login 1 ...")
          oauth.redirectToLogin();
      
        } else if (signedIn && !hasAuthorizationToken) {
  
          console.debug("Redirect to login 2 ...")
          oauth.redirectToLogin();
  
        }
  
        // http://portal.dev.local:8080/o/oauth2/authorize?client_id=id-2ede2606-9967-e3af-db74-4d94c68ebd&response_type=code&code_challenge=HcvmXvwa3fq29-Mo0tkDo3x7Ycz_qNX992lbM8i663c&redirect_uri=http%3A%2F%2Fportal.dev.local%3A8080%2Fapp1
  
      };
      loginAction();
    });

    return (
        <div className='app1-auth-container'>
          {oauth.isSignedIn() 
                && (
            props.children
          )}
        </div>
    )

}

export default AuthProvider;