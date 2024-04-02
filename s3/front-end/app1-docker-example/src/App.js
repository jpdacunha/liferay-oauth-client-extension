import 'App.css';
import Display from "./components/Display.js";
import {OauthService} from './services/common/OauthService.js';

function App() {

  const oauth = new OauthService();

  //Manage authentification using external URL (login / password)
  const signedIn = oauth.isSignedIn();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');

  if (code) {

    console.log(">>>>>>>>>>>>>> CODE : " + code)

  } else if (!signedIn) {
    const redirect = oauth.getAuthorizeUrl();
    console.debug("Redirecting to [" + redirect + "]")
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
