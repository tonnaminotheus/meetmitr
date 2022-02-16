import "./FormComponent.css"

var axios = require('axios').default;
var hash = require('object-hash');

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

    const requestLogin=(event)=>{

        event.preventDefault()
        
        const data = {
            "userName": document.getElementById("email-input-box").value,
            "password": hash(document.getElementById("password-input-box").value)
        }
        
        // console.log(data.userName)
        // console.log(data.password)
        
        console.log(data)

        axios({
            method: 'post',
            url: 'http://ec2-54-166-46-110.compute-1.amazonaws.com:8080/api/v1/login',
            data: data
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
            
        });
    }
    
    return (
    <div className="login-form">
        <h2>Hi Mitr!</h2>
        <form>
            <div className="form-control">
                <input type="email" placeholder="Email Address" id="email-input-box" className="input-box" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
            </div>
            <div className="form-control">
                <input type="password" placeholder="Password" className="input-box" id="password-input-box" name="password" minLength={0} required/>
            </div>
            <div className="form-control">
                <input type="checkbox" onClick={togglePassword}/>Show Password
            </div>
            
            <button id="login-btn" className="btn" onClick={requestLogin}><span>Login </span></button>
        </form>

        <div className="bottom-box">
            <form action="https://www.google.com">
                <a href="https://www.google.com/" id="forget-passowrd-link">Forgot Password?</a>
                <button type="submit" className="btn" id="create-acc-btn"><span>Create New Account</span></button>
            </form>
        </div>
    </div>
    );
}

export default FormComponent;