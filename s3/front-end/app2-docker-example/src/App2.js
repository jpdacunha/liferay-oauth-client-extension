import Display from 'components/Display';
import './App.css';
import { Portal } from 'services/common/Portal.js';

function App2() {
  return (
    <div className="App2">
      <header className="App2-header">
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

export default App2;
