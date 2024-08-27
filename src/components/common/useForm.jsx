import Joi from "joi-browser";
import React, { useState } from 'react';

function useForm(initialData, schema, doSubmit) {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

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
    const propertySchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, propertySchema);

    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }) => {
    const errorsCopy = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errorsCopy[input.name] = errorMessage;
    else delete errorsCopy[input.name];

    const dataCopy = { ...data };
    dataCopy[input.name] = input.value;
    setData(dataCopy);
    setErrors(errorsCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorsCopy = validate();
    setErrors(errorsCopy || {})
    if (errorsCopy) return;

    doSubmit();
  };

  return {
    data,
    errors,
    handleChange,
    handleSubmit,
    renderButton: (label) => (
      <button className="btn btn-primary" disabled={validate()}>
        {label}
      </button>
    ),
    renderSelect: (name, label, options) => (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          name={name}
          value={data[name]}
          onChange={handleChange}
          className="form-control"
        >
          <option value="" />
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
        {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
      </div>
    ),
    renderInput: (name, label, type = "text") => (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          value={data[name]}
          onChange={handleChange}
          className="form-control"
        />
        {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
      </div>
    ),
    setData
  };
}

export default useForm;