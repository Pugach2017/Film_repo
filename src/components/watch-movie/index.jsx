import React from 'react';
import PropTypes from 'prop-types';
import { getReleaseDate, imageUrl } from '../../services/movie-list';
import Panel from '../shared-ui/panel';
import Button from '../shared-ui/button';
import Icon from '../svg';
import Icons from '../svg/icons';
import Style from './style.css';

const WatchMovie = ({ movie, onClickRemove, onClickInfo }) => (
  <Panel watchListItem>
    <img
      src={imageUrl(movie.poster_path)}
      className={Style.img}
      alt="Poster Img"
    />
    <div className={Style.info}>
      <h3>{movie.title}</h3>
      <p>Released: {getReleaseDate(movie.release_date)}</p>
      <p>Rating: {movie.vote_average}</p>
      <div className={Style.buttonBox}>
        <Button onClick={onClickRemove}>
          <Icon icon={Icons.OUT} />
        </Button>
        <Button onClick={onClickInfo}>
          <Icon icon={Icons.INFORMATION} />
        </Button>
      </div>
    </div>
  </Panel>
);

WatchMovie.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
  }).isRequired,
  onClickRemove: PropTypes.func.isRequired,
  onClickInfo: PropTypes.func.isRequired,
};

export default WatchMovie;
