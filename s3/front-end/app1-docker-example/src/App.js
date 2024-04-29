import 'App.css';
import Display from "./components/Display.js";
import {OauthService} from './services/OauthService.js';

function App() {

  const oauth = new OauthService();

  //Manage authentification using external URL (login / password)
  const signedIn = oauth.isSignedIn();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  const error = urlParams.get('error');

  //http://portal.dev.local:8080/o/oauth2/authorize?client_id=id-b9b1a6b9-7a59-4bf9-6a63-bd067c9dfcd&response_type=code&redirect_uri=http%3A%2F%2Fportal.dev.local%3A8080&scope=liferay-json-web-services.apim.httpbin.mock.read
  if (error) {
    throw new Error('Error : ' + error);
  } else if (code) {

    console.debug("Exchanging for token ...")
    oauth.exhangeForToken(code);

  } else if (!signedIn) {
    const redirect = oauth.getAuthorizeUrl();
    console.debug("Redirecting to [" + redirect + "] ...")
    window.location.href = redirect;
  } 

  return (
    <div className="App1"> 

      {oauth.isSignedIn() 
      && (
        <header className="App1-header">
          <div>
            <Display />
          </div>
        </header>
      )}

    </div>
  );
}

export default App;
