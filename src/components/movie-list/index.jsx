import React from 'react';
import PropTypes from 'prop-types';
import Movie from '../movie';
import {
  getShortOverview,
  getReleaseDate,
  imageUrl,
} from '../../services/movie-list';

import Style from './style.css';

const MovieList = ({ movies, onClickAdd, onClickInfo }) => (
  <ul className={Style.ul}>
    {movies.map(movie => (
      <li key={movie.id} className={Style.li}>
        <Movie
          url={imageUrl(movie.poster_path)}
          releaseDate={getReleaseDate(movie.release_date)}
          overview={getShortOverview(movie.overview)}
          average={movie.vote_average}
          onClickAdd={() => onClickAdd(movie)}
          onClickInfo={() => onClickInfo(movie.id)}
        />
      </li>
    ))}
  </ul>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    }).isRequired,
  ).isRequired,
  onClickAdd: PropTypes.func.isRequired,
  onClickInfo: PropTypes.func.isRequired,
};

export default MovieList;
