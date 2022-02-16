import "./LoginRootComponent.css"
import LoginPageDesc from "./LoginPageDesc"
import LoginComponent from "./LoginComponent"

const LoginRootComponent=(props)=>{
    return (
        <div className="login-container">
            <LoginPageDesc/>
            <LoginComponent/>
        </div>
    );
}

export default LoginRootComponent;