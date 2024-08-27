import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../services/fakeGenreService";
import { deleteMovie, getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import Search from "./common/search";
import MoviesTable from "./moviesTable";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  useEffect(() => {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    setMovies(getMovies());
    setGenres(genres);
  }, []);

  const handleDelete = (movie) => {
    const updatedMovies = movies.filter((m) => m._id !== movie._id);
    setMovies(updatedMovies);
    deleteMovie(movie._id);
  };

  const handleLike = (movie) => {
    const updatedMovies = [...movies];
    const index = updatedMovies.indexOf(movie);
    updatedMovies[index] = { ...updatedMovies[index] };
    updatedMovies[index].liked = !updatedMovies[index].liked;
    setMovies(updatedMovies);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setCurrentPage(1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const getPagedData = () => {
    let filtered = movies;
  
    if (searchQuery) {
      filtered = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = movies.filter((m) => m.genre._id === selectedGenre._id);
    }
  
    const sorted = _.orderBy(filtered, [(movie) => {
      const value = _.get(movie, sortColumn.path);
      return typeof value === "string" ? value.toLowerCase() : value;
    }], [sortColumn.order]);
      
    const paginatedMovies = paginate(sorted, currentPage, pageSize);
  
    return { totalCount: filtered.length, data: paginatedMovies };
  };
  
  const { totalCount, data: paginatedMovies } = getPagedData();

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={handleGenreSelect}
        />
      </div>
      <div className="col">
        <Link
          to="/movies/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Movie
        </Link>
        <p>Showing {totalCount} movies in the database.</p>
        <Search value={searchQuery} onChange={handleSearch} />
        <MoviesTable
          movies={paginatedMovies}
          sortColumn={sortColumn}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Movies;
