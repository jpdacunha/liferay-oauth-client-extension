import React from 'react';
import {OauthService} from '../services/OauthService.js';

const AuthProvider = ( props ) => {

    const appId = "app1";
    const oauth = new OauthService(appId);

    const loginAction = async () => {
  
      //Manage authentification using external URL (login / password)
      const signedIn = oauth.isSignedIn();
    
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const code = urlParams.get('code');
      const error = urlParams.get('error');
    
      if (error) {
        throw new Error('Error : ' + error);
      } else if (code) {
    
        console.debug("Exchanging for token ...")
        await oauth.exhangeForToken(code);
    
      } else if (!signedIn) {
    
        const redirect = oauth.getPKCEAuthorizeUrl();
        console.debug("Redirecting to [" + redirect + "] ...")
        window.location.href = redirect;
    
      } 

    };

    loginAction();

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