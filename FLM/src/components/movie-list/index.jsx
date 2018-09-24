import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import withRenderLog from '../../hoc/withRenderLog';

import Movie from '../movie';
import {
  getShortOverview,
  getReleaseDate,
  imageUrl,
} from '../../services/movie-list';

import { addToWatchlist } from '../../redux/actions/watchlist';

import Style from './style.css';

const MovieList = ({ movies, onClickInfo, addToWatchlist: addToWatch }) => (
  <ul className={Style.ul}>
    {movies.map(movie => (
      <li key={movie.id} className={Style.li}>
        <Movie
          url={imageUrl(movie.poster_path)}
          releaseDate={getReleaseDate(movie.release_date)}
          overview={getShortOverview(movie.overview)}
          average={movie.vote_average}
          onClickAdd={() => addToWatch(movie)}
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
  addToWatchlist: PropTypes.func.isRequired,
  onClickInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = { addToWatchlist };

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withRenderLog,
)(MovieList);
