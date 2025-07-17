import React from "react";
import LoginForm from "../Authen-Form/LoginForm";
import RegisterForm from "../Authen-Form/RegisterForm";

function AuthenTemplate({ isLogin }) {
  return (
    <div className="authen-template">
      <div className="authen-template_form">
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}

export default AuthenTemplate;
