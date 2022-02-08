import "./FormComponent.css"
const FormComponent=(props)=>{
    function togglePassword(){
        let pass_box = document.getElementById("password-input-box")
        console.log("click checkbox")
        if (pass_box.type === "text") {
            pass_box.type="password";
        }
        else if (pass_box.type === "password") {
            pass_box.type="text";
        }
    }
    return (
    <div className="login-form">
        <h2>Hi Mitr!</h2>
        <form method="POST">
            <div className="form-control">
                <input type="email" placeholder="Email Address" id="email-input-box" className="input-box"/>
            </div>
            <div className="form-control">
                <input type="password" placeholder="Password" className="input-box" id="password-input-box" name="password" minLength={0} required/>
            </div>
            <div className="form-control">
                <input type="checkbox" onClick={togglePassword}/>Show Password
            </div>
            <div>
                <button formAction="google.com" id="login-btn" className="btn"><span>Login </span></button>
            </div>
        </form>
        <div className="bottom-box">
            <form action="https://www.google.com">
                <a href="https://www.google.com/" style={{"margin-right":"5px"}}>Forgot Password?</a>
                <button type="submit" className="btn" id="create-acc-btn"><span>Create New Account</span></button>
            </form>
        </div>
    </div>
    );
}

export default FormComponent;