import 'App.css';
import Display from "./components/Display.js";
import AuthProvider from "./components/AuthProvider.js";

function App() {
  return (
    
    <AuthProvider>
      <div className="App1"> 
        <header className="App1-header">
          <div>
            <Display />
          </div>
        </header>
      
      </div>
    </AuthProvider>

  );
}

export default App;
