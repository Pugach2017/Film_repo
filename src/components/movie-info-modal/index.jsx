import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { fetchMovieInfo } from '../../services/api';
import { bgImageUrl } from '../../services/movie-list';
import Button from '../shared-ui/button';
import Icon from '../svg';
import Icons from '../svg/icons';
import Loader from '../shared-ui/loader/loading';
import Style from './style.css';

class MovieInfoModal extends Component {
  state = {
    movie: {},
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    const { movieID } = this.props;

    fetchMovieInfo({
      id: movieID,
      onSuccess: this.handleFetchSuccess,
      onError: this.handleFetchError,
    });
  }

  handleFetchSuccess = movie => {
    this.setState({ movie, isLoading: false });
  };

  render() {
    const { movie, isLoading } = this.state;
    const { showModal, onClose } = this.props;

    return (
      <ReactModal
        className={Style.modal}
        overlayClassName={Style.overlay}
        isOpen={showModal}
        contentLabel="Movie info"
        onRequestClose={() => onClose()}
        shouldCloseOnOverlayClick
      >
        {isLoading && <Loader />}

        {movie.genres &&
          movie.production_companies && (
            <div className={Style.content}>
              <img src={bgImageUrl(movie.backdrop_path)} alt="Poster Img" />
              <h2>{movie.title}</h2>
              <p className={Style.tagline}>{movie.tagline}</p>
              <p className={Style.overview}>{movie.overview}</p>

              <h4 className={Style.title}>Genres</h4>
              <ul className={Style.genres}>
                {movie.genres.map(genre => (
                  <li key={genre.id} className={Style.genreItem}>
                    {genre.name}
                  </li>
                ))}
              </ul>
              <h4 className={Style.title}>Production Companies</h4>
              <ul className={Style.genres}>
                {movie.production_companies.map(company => (
                  <li key={company.id} className={Style.genreItem}>
                    {company.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

        <Button onClick={() => onClose()} btnModal>
          <Icon icon={Icons.OUT} />
        </Button>
      </ReactModal>
    );
  }
}

MovieInfoModal.propTypes = {
  movieID: PropTypes.number.isRequired,
  showModal: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MovieInfoModal;
