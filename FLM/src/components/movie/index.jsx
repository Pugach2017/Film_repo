import React from 'react';
import PropTypes from 'prop-types';
import Icons from '../svg/icons';
import Button from '../shared-ui/button';
import Icon from '../svg';
import Style from './style.css';

const Movie = ({
  url,
  originalTitleName,
  releaseDate,
  overview,
  average,
  onClickAdd,
  onClickInfo,
}) => (
  <div className={Style.movie}>
    <div className={Style.average}>{average}</div>
    <div className={Style.buttonBox}>
      <Button onClick={onClickAdd}>
        <Icon icon={Icons.Favorites} />
      </Button>
      <Button onClick={onClickInfo}>
        <Icon icon={Icons.INFORMATION} />
      </Button>
    </div>

    <img src={url} alt="Poster Img" />
    <h3> {originalTitleName} </h3>
    <p>Release date: {releaseDate}</p>
    <p>{overview}</p>
  </div>
);

Movie.propTypes = {
  url: PropTypes.string.isRequired,
  originalTitleName: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  average: PropTypes.number.isRequired,
  onClickAdd: PropTypes.func.isRequired,
  onClickInfo: PropTypes.func.isRequired,
};

export default Movie;
