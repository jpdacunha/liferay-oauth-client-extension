import 'App.css';
import Display from "./components/Display.js";
import AuthProvider from "./components/AuthProvider.js";

const APP_ID = 'app1';

function App() {
  return (
    
    <AuthProvider appId={APP_ID}>
      <div className="App1"> 
        <header className="App1-header">
          <div>
            <Display appId={APP_ID}/>
          </div>
        </header>
      
      </div>
    </AuthProvider>

  );
}

export default App;
