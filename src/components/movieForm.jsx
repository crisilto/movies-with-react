import Joi, { schema } from 'joi-browser';
import React, { useEffect, useState } from 'react';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from '../services/fakeMovieService';

function MovieForm({ match, history }) {

    const [data, setData] = useState({ title: "", genreId: "", numberInStock: "", dailyRentalRate: "" })
    const [genres, setGenres] = useState([]);
    const [errors, setErrors] = useState({});

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate")
    }

    useEffect(() => {
        const genres = getGenres();
        setGenres(genres);

        const movieId = match.params.id;
        if (movieId === "new") return;

        const movie = getMovie(movieId);
        if (!movie) return history.replace("/not-found");

        setData(mapToViewModel(movie));
    }, [match.params.id, history]);

    const mapToViewModel = (movie) => {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate();
        setErrors(errors || {});
        if (errors) return;

        doSubmit();
    };

    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(data, schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
    }

    const validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: schema[name] };
        const { error } = Joi.validate(obj, schema);

        return error ? error.details[0].message : null;
    }

    const handleChange = ({ currentTarget: input }) => {
        const errors = { ...errors };
        const errorMessage = validateProperty(input);

        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const newData = { ...data };
        newData[input.name] = input.value;
        setData(newData);
        setErrors(errors);
    };

    const doSubmit = () => {
        saveMovie(data);
        history.push("/movies");
    };

    return (
        <div>
            <h1>Movie From</h1>
            <form onSubmit={this.handleSubmit}>
                {renderInput("title", "Title", data, errors, handleChange)}
                {renderSelect("genreId", "Genre", genres, data, errors, handleChange)}
                {renderInput("numberInStock", "Number in Stock", data, errors, handleChange, "number")}
                {renderInput("dailyRentalRate", "Daily Rental Rate", data, errors, handleChange, "number")}
                <button className='btn btn-primary' disabled={validate()}>Save</button>
            </form>
        </div>
    );

}
function renderSelect(name, label, options, data, errors, onChange) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select
                name={name}
                id={name}
                value={data[name]}
                onChange={onChange}
                className="form-control"
            >
                <option value="" />
                {options.map(option => (
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
        </div>
    );
}

function renderInput(name, label, data, errors, onChange, type = "text") {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                id={name}
                value={data[name]}
                onChange={onChange}
                className="form-control"
            />
            {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
        </div>
    );
}

export default MovieForm;