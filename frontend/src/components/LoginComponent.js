import "./LoginComponent.css"
import FormComponent from "./FormComponent"

import AuthenLoginModal from "./modal/AuthenLoginModal.js"

import { useState } from "react"

const LoginComponent=(props)=>{

    //authen modal
    const [isAuthenModalOpen, setAuthenModalOpen] = useState(false)
    const [userEmail, setUserEmail] = useState("")

    return (
    <div className="login-box">
        <FormComponent setAuthenModalOpen={setAuthenModalOpen} setUserEmail={setUserEmail}/>
        <AuthenLoginModal isAuthenModalOpen={isAuthenModalOpen} setAuthenModalOpen={setAuthenModalOpen} userEmail={userEmail}/>
    </div>
    );
}

export default LoginComponent;