import Joi from "joi-browser";
import React from "react";
import useForm from "./common/useForm";

function LoginForm() {
  const initialData = { username: "", password: "" };
  const schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
  };

  const doSubmit = () => {
    console.log("Form submitted!");
  };

  const { handleSubmit, renderButton, renderInput } = useForm(initialData, schema, doSubmit);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("username", "Username")}
        {renderInput(
          "password",
          "Password",
          "password"
        )}
        {renderButton("Login")}
      </form>
    </div>
  );
}

export default LoginForm;
