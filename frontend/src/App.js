import logo from './logo.svg';
import './App.css';
import LoginPageDesc from "./components/LoginPageDesc"
import LoginComponent from "./components/LoginComponent"

function App() {
  return (
    <div className="App">
      <h1>Welcome to Meetmitr</h1>
      <div className="login-container">
        <LoginPageDesc/>
        <LoginComponent/>
      </div>
    </div>
  );
}

export default App;
