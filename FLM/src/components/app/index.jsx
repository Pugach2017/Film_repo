import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Watchlist from '../watchlist';
import CategorySelector from '../category-selector';
import TitleSearch from '../title-search';
import Loader from '../shared-ui/loader/load';
import ErrorNotification from '../shared-ui/error-notification';
import MovieList from '../movie-list';
import Panel from '../shared-ui/panel';
import MovieInfoModal from '../movie-info-modal';
import styles from './style.css';

import addToStorage from '../../redux/actions/localstorage';

import {
  getMovies,
  isMoviesLoading,
  getMoviesErorr,
} from '../../redux/selectors/movies';

import getWatchist from '../../redux/selectors/watchlist';

class App extends Component {
  state = {
    movieID: null,
    showModal: false,
  };

  componentDidUpdate(prevProps) {
    const { watchlist, addToStorage: saveToStorage } = this.props;
    const prevWatchlist = prevProps.watchlist;
    if (watchlist !== prevWatchlist) {
      saveToStorage(watchlist);
    }
  }

  handleOpenModal = movieID => {
    this.setState({ movieID, showModal: true });
  };

  handleCloseModal = () => this.setState({ movieID: null, showModal: false });

  render() {
    const { movies, loading, error } = this.props;
    const { movieID, showModal } = this.state;
    return (
      <div className={styles.wrapper}>
        {showModal && (
          <MovieInfoModal
            movieID={movieID}
            showModal={showModal}
            onClose={this.handleCloseModal}
          />
        )}

        <aside className={styles.aside}>
          <Watchlist onClickInfo={this.handleOpenModal} />
        </aside>

        <main className={styles.main}>
          <Panel searhPanel>
            <CategorySelector />
            <TitleSearch />
          </Panel>

          {error && <ErrorNotification message={error.message} />}

          {loading && <Loader />}

          {movies.length > 0 && (
            <MovieList movies={movies} onClickInfo={this.handleOpenModal} />
          )}
        </main>
      </div>
    );
  }
}
App.propTypes = {
  movies: PropTypes.arrayOf(Object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Error),
  addToStorage: PropTypes.func.isRequired,
  watchlist: PropTypes.arrayOf(Object).isRequired,
};

App.defaultProps = {
  error: null,
};

const mapStateToProps = state => ({
  movies: getMovies(state),
  loading: isMoviesLoading(state),
  error: getMoviesErorr(state),
  watchlist: getWatchist(state),
});

const mapDispatchToProps = { addToStorage };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
