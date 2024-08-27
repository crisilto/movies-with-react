import Joi from "joi-browser";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import useForm from "./common/useForm";

function MovieForm() {
  const [genres, setGenres] = useState([]);
  const { id: movieId } = useParams(); 
  const navigate = useNavigate(); 

  const initialData = {
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  };

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate"),
  };

  const doSubmit = () => {
    saveMovie(data); 
    navigate("/movies"); 
  };

  const {
    data,
    setData,
    handleSubmit,
    renderButton,
    renderInput,
    renderSelect,
  } = useForm(initialData, schema, doSubmit);

  useEffect(() => {
    const genresData = getGenres();
    setGenres(genresData);

    if (movieId === "new") return; 

    const movie = getMovie(movieId);
    if (!movie) return navigate("/not-found"); 

    setData(mapToViewModel(movie));
  }, [movieId, navigate, setData]);

  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  return (
    <div>
      <h1>Movie Form</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("title", "Title")}
        {renderSelect("genreId", "Genre", genres)}
        {renderInput("numberInStock", "Number in Stock", "number")}
        {renderInput("dailyRentalRate", "Daily Rental Rate", "number")}
        {renderButton("Save")}
      </form>
    </div>
  );
}

export default MovieForm;