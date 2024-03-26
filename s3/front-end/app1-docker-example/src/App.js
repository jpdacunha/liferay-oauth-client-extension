import 'App.css';
import Display from "./components/Display.js";
import { Portal } from 'services/common/Portal.js';

function App() {
  return (
    <div className="App1">
      <header className="App1-header">
            {Portal.ThemeDisplay.isSignedIn() 
            ? (
              <div>
                <Display />
              </div>
            ) 
          : (
              <p>
                You need to login to Liferay before using this app
              </p>
            )}
      </header>
    </div>
  );
}

export default App;
