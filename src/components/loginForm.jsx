import Joi from "joi-browser";
import React, { useState } from 'react';

function LoginForm() {
  const [data, setData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  }

  const handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
    setErrors(errors);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    doSubmit();
  };

  const doSubmit = () => {
    console.log("Form submitted!");
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("username", "Username", data, errors, handleChange)}
        {renderInput("password", "Password", data, errors, handleChange, "password")}
        <button className="btn btn-primary" disabled={validate()}>
          Login
        </button>
      </form>
    </div>
  );
}

function renderInput(name, label, data, errors, onChange, type = "text") {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={data[name]}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        className="form-control"
      />
      {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
    </div>
  );
}

export default LoginForm;