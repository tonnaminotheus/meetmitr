import "./LoginPageDesc.css"
// import "../asset/"
// import meetmitr_name from "../asset/meetmitr_name.png"
import meetmitr_name from "../asset/meetmitr_name.png"

const LoginPageDesc=(props)=>{
    return(
    <div className="login-page-desc">
        <img src={"https://cdn.discordapp.com/attachments/937701050582958110/937709182105317387/unknown.png"} id="loginpagedesc-meetmitr-logo"></img>
        <p><span id="meetmitr-desc">A platform that aims to give opportunities for people to meet new friends who have similar interests and bond through various activities.</span></p>
    </div>
    );
}

export default LoginPageDesc;