const FormComponent=(props)=>{
    function togglePassword(){
        let pass_box = document.getElementById("passbox")
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
        <form method="POST">
            <div className="form-control">
                <input type="email" placeholder="Email Address"/>
            </div>
            <div className="form-control">
                <input type="password" placeholder="Password" id="passbox" name="password" minLength={0} required/>
            </div>
            <div>
                <input type="checkbox" onClick={togglePassword}/>Show Password
            </div>
            <div>
                <button formAction="google.com" id="login-btn" className="btn"><span>Login </span></button>
            </div>
        </form>
        <a href="https://www.google.com/">Forgot Password?</a>
        <form action="https://www.google.com">
            <button type="submit" className="btn" id="create-acc-btn"><span>Create New Account</span></button>
        </form>

    </div>
    );
}

export default FormComponent;