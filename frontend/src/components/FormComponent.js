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
        <form method="post">
            <div className="form-control">
                <input type="email" placeholder="Email Address"/>
            </div>
            <div className="form-control">
                <input type="password" placeholder="Password" id="passbox" name="password" minLength={8} required/>
            </div>
            <div className="form-control">
                <input type="checkbox" onClick={togglePassword}/>Show Password
            </div>
            <button formAction="google.com">Login</button>
        </form>
        <a href="https://www.google.com/">Forgot Password?</a>
        <form action="https://www.google.com">
            <button type="submit">Create New Account</button>
        </form>

    </div>
    );
}

export default FormComponent;