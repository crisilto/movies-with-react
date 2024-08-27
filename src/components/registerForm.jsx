import Joi from "joi-browser";
import React from "react";
import useForm from "./common/useForm";

function RegisterForm() {
  const initialData = { username: "", password: "", name: "" };

  const schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  const doSubmit = () => {
    console.log("Register submitted!");
  };

  const {handleSubmit, renderButton, renderInput } = useForm(
    initialData,
    schema,
    doSubmit
  );

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("username", "Username")}
        {renderInput("password", "Password", "password")}
        {renderInput("name", "Name")}
        {renderButton("Register")}
      </form>
    </div>
  );
}

export default RegisterForm;