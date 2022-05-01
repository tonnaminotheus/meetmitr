import "./LoginRootComponent.css";
import "../components/css_extensions/page_div_config.css";

import LoginPageDesc from "./LoginPageDesc";
import LoginComponent from "./LoginComponent";

const LoginRootComponent = (props) => {
  return (
    <div className="login-container">
      <LoginPageDesc />
      <LoginComponent />
    </div>
  );
};

export default LoginRootComponent;
